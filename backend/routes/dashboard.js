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

        // console.log(user.rows[0]);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/update", authorization, async(req, res) => {
    try {

        const {user_id,c_fname,c_lname,c_phno,c_house,c_street,c_pin,c_dist} = req.body;

        const updatecust = await pool.query("UPDATE tbl_customer SET c_phno=$1, c_fname=$2, c_lname=$3, c_house=$4, c_street=$5, c_dist=$6, c_pin=$7 WHERE user_id=$8 RETURNING *",
        [c_phno, c_fname, c_lname, c_house, c_street, c_dist, c_pin, user_id]);

        if(updatecust.rows.length === 0){
            return res.status(401).json("Updation Failed!");
        }

        const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id", [req.user.id]);

        res.json(user.rows[0]);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/change", authorization, async(req, res) => {
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

module.exports = router;
