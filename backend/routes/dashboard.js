const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");

router.get("/", authorization, async(req, res) => {
    try {

        //req.user has the payload
        // res.json(req.user.id);

        const login = await pool.query("SELECT * FROM tbl_login WHERE user_id = $1", [req.user.id]);

        if(login.rows[0].user_type === "customer")
        {

            const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id", [req.user.id]);
            
            res.json(user.rows[0]);
        }

        else if(login.rows[0].user_type === "admin"){

            res.json(login.rows[0]);
        }

        else if(login.rows[0].user_type === "staff"){

            const user = await pool.query("SELECT * FROM tbl_staff s, tbl_login l WHERE s.user_id = $1 AND l.user_id = $1 AND s.user_id = l.user_id", [req.user.id]);
            
            res.json(user.rows[0]);
        }
        

        // console.log(user.rows[0]);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/update", authorization, async(req, res) => {
    try {

        const {user_id,user_type,fname,lname,phno,house,street,pin,dist} = req.body;

        if(user_type === "customer"){

            const updatecust = await pool.query("UPDATE tbl_customer SET c_phno=$1, c_fname=$2, c_lname=$3, c_house=$4, c_street=$5, c_dist=$6, c_pin=$7 WHERE user_id=$8 RETURNING *",
            [phno, fname, lname, house, street, dist, pin, user_id]);

            if(updatecust.rows.length === 0){
                return res.status(401).json("Updation Failed!");
            }

            const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id", [req.user.id]);

            res.json(user.rows[0]);
        }

        else if(user_type === "staff"){

            const updatestaff = await pool.query("UPDATE tbl_staff SET s_phno=$1, s_fname=$2, s_lname=$3, s_house=$4, s_street=$5, s_dist=$6, s_pin=$7 WHERE user_id=$8 RETURNING *",
            [phno, fname, lname, house, street, dist, pin, user_id]);

            if(updatestaff.rows.length === 0){
                return res.status(401).json("Updation Failed!");
            }

            const user = await pool.query("SELECT * FROM tbl_staff s, tbl_login l WHERE s.user_id = $1 AND l.user_id = $1 AND s.user_id = l.user_id", [req.user.id]);

            res.json(user.rows[0]);

        }

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/changepassword", authorization, async(req, res) => {
    try {

        const {user_id,password,newpassword,confirmpassword} = req.body;

        const log = await pool.query("SELECT * FROM tbl_login WHERE user_id = $1", [user_id]);

        //3. check if the incomming password is the same as the database password
        const validPassword = await bcrypt.compare(password, log.rows[0].password);

        //console.log(validpassword);

        if(!validPassword){
            return res.status(401).json("Incorrect Password!");
        }

        if(newpassword !== confirmpassword){
            return res.status(401).json("Password Does Not Match!");
        }

        const saltRound=10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptpassword = await bcrypt.hash(newpassword, salt);

        const updatepassword = await pool.query("UPDATE tbl_login SET password=$1 WHERE user_id=$2 RETURNING *",
        [bcryptpassword, user_id]);

        if(updatepassword.rows.length === 0){
            return res.status(401).json("Couldn't Change Password!");
        }

        res.json(true);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/deactivate", authorization, async(req, res) => {
    try {

        const {user_id,password} = req.body;

        const log = await pool.query("SELECT * FROM tbl_login WHERE user_id = $1", [user_id]);

        //3. check if the incomming password is the same as the database password
        const validPassword = await bcrypt.compare(password, log.rows[0].password);

        //console.log(validpassword);

        if(!validPassword){
            return res.status(401).json("Incorrect Password!");
        }

        const updatestatus = await pool.query("UPDATE tbl_login SET l_status='inactive' WHERE user_id=$1 RETURNING *",
        [user_id]);

        const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id AND l.user_type='active'", [req.user.id]);

        if(user.rows.length !== 0){
            return res.status(401).json("Couldn't Deactivate Account!");
        }
        
        res.json(true);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/newcard", authorization, async(req, res) => {
    try {

        const {cust_id,card_no,card_name,bank_name,card_type,exp_date} = req.body;

        const newCard = await pool.query("INSERT INTO tbl_card (cust_id, card_no, card_name, bank_name, card_type, exp_date, card_status) VALUES ($1, $2, $3, $4, $5, $6, 'active') RETURNING *",
        [cust_id, card_no, card_name, bank_name, card_type, exp_date]);

        if(newCard.rows.length === 0){
            return res.status(401).json("Couldn't Add Card!");
        }

        res.json(true);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/carddetails", authorization, async(req, res) => {
    try {

        const {cust_id} = req.body;

        const cards = await pool.query("SELECT * FROM tbl_card WHERE cust_id = $1", [cust_id]);

        res.json(cards.rows[0]);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/addstaff", authorization, async(req, res) => {
    try {

        const {fname,lname,username,phno,house,street,pin,dist,password,confirmpassword} = req.body;

        if(password !== confirmpassword){
            return res.status(401).json("Password Does Not Match!");
        }

        const logCheck = await pool.query("SELECT * FROM tbl_login WHERE username = $1", [username]);

        //res.json(user.rows);

        if (logCheck.rows.length !==0){
            return res.status(401).json("User Already Exist!");
        }

        const saltRound=10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptpassword = await bcrypt.hash(password, salt);

        const newStaffLog = await pool.query("INSERT INTO tbl_login (username, password, user_type, l_status) VALUES ($1, $2, 'staff', 'active') RETURNING *",
        [username, bcryptpassword]);

        const uid = newStaffLog.rows[0].user_id;

        var dt = new Date();

        const newStaff = await pool.query("INSERT INTO tbl_staff (s_phno, user_id, s_fname, s_lname, s_house, s_street, s_dist, s_pin, s_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [phno, uid, fname, lname, house, street, dist, pin, dt]);

        if(newStaff.rows.length === 0){
            return res.status(401).json("Couldn't Add Staff!");
        }

        res.json(true);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/newcategory", authorization, async(req, res) => {
    try {

        const {cat_name,cat_desc,cat_price} = req.body;

        const newCategory = await pool.query("INSERT INTO tbl_category (cat_name, cat_desc, cat_price, cat_status) VALUES ($1, $2, $3, 'active') RETURNING *",
        [cat_name, cat_desc, cat_price]);

        if(newCategory.rows.length === 0){
            return res.status(401).json("Couldn't Add Category!");
        }

        res.json(true);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

module.exports = router;
