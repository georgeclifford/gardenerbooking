const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const bcrypt = require("bcrypt");
const multer  = require('multer');
const upload = multer();

// DETAILS FETCHING

// Fetching Customer/Staff/Admin panel details
router.get("/", authorization, async(req, res) => {
    try {

        //req.user has the payload
        // res.json(req.user.id);

        const login = await pool.query("SELECT * FROM tbl_login WHERE user_id = $1", [req.user.id]);

        if(login.rows[0].user_type === "customer")
        {

            const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id", [req.user.id]);
            
            return res.json(user.rows[0]);
        }

        else if(login.rows[0].user_type === "admin"){

            return res.json(login.rows[0]);
        }

        else if(login.rows[0].user_type === "staff"){

            const user = await pool.query("SELECT * FROM tbl_staff s, tbl_login l WHERE s.user_id = $1 AND l.user_id = $1 AND s.user_id = l.user_id", [req.user.id]);
            
            return res.json(user.rows[0]);
        }

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Customer details fetching
router.get("/custdetails", authorization, async(req, res) => {
    try {

        const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = l.user_id ORDER BY l.user_id");

        return res.json(user.rows);
        

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

//Staff details fetching
router.get("/staffdetails", authorization, async(req, res) => {
    try {

        const user = await pool.query("SELECT * FROM tbl_staff s, tbl_login l WHERE s.user_id = l.user_id ORDER BY l.user_id");

        return res.json(user.rows);
        

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Card details fetching
router.get("/carddetails", authorization, async(req, res) => {
    try {

        let user_id='';

        user_id = req.header("user_id");

        const cust = await pool.query("SELECT cust_id FROM tbl_customer WHERE user_id = $1 ", [user_id]);

        const cards = await pool.query("SELECT * FROM tbl_card WHERE cust_id = $1 ORDER BY card_id", [cust.rows[0].cust_id]);

        return res.json(cards.rows);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Category details fetching
router.get("/categorydetails", authorization, async(req, res) => {
    try {

        const cat = await pool.query("SELECT * FROM tbl_category ORDER BY cat_id");

        return res.json(cat.rows);
        

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Category details fetching for display
router.get("/categorydisplay", async(req, res) => {
    try {

        const cat = await pool.query("SELECT * FROM tbl_category WHERE cat_status='active' ORDER BY cat_name");

        return res.json(cat.rows);
        

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Selected Category details fetching for display
router.get("/selectedcategory", async(req, res) => {
    try {

        let c_id='';

        c_id = req.header("c_id");

        console.log(c_id);

        const cat = await pool.query("SELECT * FROM tbl_category WHERE cat_id=$1", [c_id] );

        return res.json(cat.rows[0]);
        

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Specialization details fetching
router.get("/specdetails", authorization, async(req, res) => {
    try {

        let user_id='';

        user_id = req.header("user_id");

        const staff = await pool.query("SELECT staff_id FROM tbl_staff WHERE user_id = $1 ", [user_id]);

        staff_id = staff.rows[0].staff_id;

        const spec = await pool.query("SELECT * FROM tbl_specchild s, tbl_category c WHERE s.sm_id IN ( SELECT sm_id FROM tbl_specmaster WHERE staff_id = $1) AND s.cat_id=c.cat_id ORDER BY s.sc_id", [staff_id]);


        return res.json(spec.rows);
        

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});


// NEW ADDITIONS

// New staff addition
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

        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// New card addition
router.post("/newcard", authorization, async(req, res) => {
    try {

        const {cust_id,card_no,card_name,bank_name,card_type,exp_date} = req.body;

        const newCard = await pool.query("INSERT INTO tbl_card (cust_id, card_no, card_name, bank_name, card_type, exp_date, card_status) VALUES ($1, $2, $3, $4, $5, $6, 'active') RETURNING *",
        [cust_id, card_no, card_name, bank_name, card_type, exp_date]);

        if(newCard.rows.length === 0){
            return res.status(401).json("Couldn't Add Card!");
        }

        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// New category addition
router.post("/newcategory", authorization, async(req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        //res.json("not uploaded");
        return res.status(401).json("Couldn't Add Category!");
    }
    else {

        let imgFile = req.files.cat_image;
        let uploadPath = "./images/"+imgFile.name;

        const {cat_name,cat_desc,cat_price} = req.body;
        
        imgFile.mv(uploadPath, async function(err){
            if(err){
                return console.log(err);
            }
            else{
                let add = await pool.query("INSERT INTO tbl_category(cat_name, cat_desc, cat_price, cat_status, cat_image)VALUES ($1, $2, $3, 'active', $4) RETURNING *",
                [cat_name, cat_desc, cat_price, imgFile.name]);
                if(add){
                    res.json(true);
                }
            }
        })
    }
});

// New specialization addition
router.post("/newspec", authorization, async(req, res) => {
    try {

        const {cat_id} = req.body;

        let sm_id='';

        let staff_id='';

        let user_id='';

        user_id = req.header("user_id");

        const staff = await pool.query("SELECT staff_id FROM tbl_staff WHERE user_id = $1 ", [user_id]);

        staff_id = staff.rows[0].staff_id;

        const SpecMast = await pool.query("SELECT * FROM tbl_specmaster WHERE staff_id = $1", [staff_id]);

        if(SpecMast.rows.length === 0)
        {

            const newSpecMast = await pool.query("INSERT INTO tbl_specmaster (staff_id) VALUES ($1) RETURNING *",
            [staff_id]);

            if(newSpecMast.rows.length === 0){
                return res.status(401).json("Action Failed!");
            }

            sm_id = newSpecMast.rows[0].sm_id;

            const SpecChild = await pool.query("SELECT * FROM tbl_specchild WHERE sm_id = $1 AND cat_id = $2", [sm_id, cat_id]);

            if(SpecChild.rows.length === 0){
                    
                const newSpecChild = await pool.query("INSERT INTO tbl_specchild (sm_id, cat_id, sc_status) VALUES ($1, $2, 'active') RETURNING *",
                [sm_id, cat_id]);

                if(newSpecChild.rows.length === 0){
                    return res.status(401).json("Action Failed!");
                }
                
                return res.json(true);
            }

            else {

                return res.status(401).json("Category Already Added!");

            }
            
        }

        sm_id = SpecMast.rows[0].sm_id;

            const SpecChild = await pool.query("SELECT * FROM tbl_specchild WHERE sm_id = $1 AND cat_id = $2", [sm_id, cat_id]);

            if(SpecChild.rows.length === 0){
                    
                const newSpecChild = await pool.query("INSERT INTO tbl_specchild (sm_id, cat_id, sc_status) VALUES ($1, $2, 'active') RETURNING *",
                [sm_id, cat_id]);

                if(newSpecChild.rows.length === 0){
                    return res.status(401).json("Action Failed!");
                }
                
                return res.json(true);
            }

            else {

                return res.status(401).json("Specialization Already Added!");

            }

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// New booking
router.post("/newbooking", authorization, async(req, res) => {
    try {

        let user_id='';

        user_id = req.header("user_id");

        var dt = new Date();

        const {cat_id,bc_time,bc_date,name,house,street,dist,pin,card_id} = req.body;

        console.log(cat_id, bc_time);

        const cust = await pool.query("SELECT cust_id FROM tbl_customer WHERE user_id = $1 ", [user_id]);

        const cust_id = cust.rows[0].cust_id;

        const newBookMaster = await pool.query("INSERT INTO tbl_bookingmaster (cust_id, tot_amt, bm_date, bm_status) VALUES ($1, '0', $2, 'alloc_pending') RETURNING *",
        [cust_id, dt]);

        if(newBookMaster.rows.length === 0){
            return res.status(401).json("Booking Failed!");
        }

        const bmaster_id = newBookMaster.rows[0].bmaster_id;

        const newBookChild = await pool.query("INSERT INTO tbl_bookingchild (bmaster_id, cat_id, bc_name, bc_house, bc_street, bc_dist, bc_pin, bc_time, bc_date, bc_hours) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '0') RETURNING *",
        [bmaster_id, cat_id, name, house, street, dist, pin, bc_time, bc_date]);

        if(newBookChild.rows.length === 0){
            return res.status(401).json("Booking Failed!");
        }

        const newPayment = await pool.query("INSERT INTO tbl_payment (bmaster_id, card_id, pay_type, pay_status, pay_date) VALUES ($1, $2, 'advance', 'paid', $3) RETURNING *",
        [bmaster_id, card_id, dt]);

        if(newPayment.rows.length === 0){
            return res.status(401).json("Booking Failed!");
        }

        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});


// EDITS/UPDATES

// Customer/Staff updation
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

            return res.json(true);
        }

        else if(user_type === "staff"){

            const updatestaff = await pool.query("UPDATE tbl_staff SET s_phno=$1, s_fname=$2, s_lname=$3, s_house=$4, s_street=$5, s_dist=$6, s_pin=$7 WHERE user_id=$8 RETURNING *",
            [phno, fname, lname, house, street, dist, pin, user_id]);

            if(updatestaff.rows.length === 0){
                return res.status(401).json("Updation Failed!");
            }

            const user = await pool.query("SELECT * FROM tbl_staff s, tbl_login l WHERE s.user_id = $1 AND l.user_id = $1 AND s.user_id = l.user_id", [req.user.id]);

            return res.json(true);

        }

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Staff editting for admin
router.post("/staffedit", authorization, async(req, res) => {
    try {

        const {user_id,fname,lname,phno,house,street,pin,dist} = req.body;

            const updatestaff = await pool.query("UPDATE tbl_staff SET s_phno=$1, s_fname=$2, s_lname=$3, s_house=$4, s_street=$5, s_dist=$6, s_pin=$7 WHERE user_id=$8 RETURNING *",
            [phno, fname, lname, house, street, dist, pin, user_id]);

            if(updatestaff.rows.length === 0){
                return res.status(401).json("Updation Failed!");
            }

            return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Category editting
router.post("/editcategory", authorization, async(req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        //res.json("not uploaded");
        // return res.status(401).json("Couldn't Edit Category!");

        const {cat_id,cat_name,cat_desc,cat_price} = req.body;

        const editCategory = await pool.query("UPDATE tbl_category SET cat_name=$2, cat_desc=$3, cat_price=$4 WHERE cat_id=$1 RETURNING *",
        [cat_id, cat_name, cat_desc, cat_price]);

        if(editCategory){
            res.json(true);
        }
    }
    else {

        let imgFile = req.files.cat_image;
        let uploadPath = "./images/"+imgFile.name;

        const {cat_id,cat_name,cat_desc,cat_price} = req.body;
        
        imgFile.mv(uploadPath, async function(err){
            if(err){
                return console.log(err);
            }
            else{
                const editCategory = await pool.query("UPDATE tbl_category SET cat_name=$2, cat_desc=$3, cat_price=$4, cat_image=$5 WHERE cat_id=$1 RETURNING *",
                [cat_id, cat_name, cat_desc, cat_price, imgFile.name]);

                if(editCategory){
                    res.json(true);
                }
            }
        })
    }
});


// PASSWORD CHANGING

// User password changing
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
        return res.status(500).json("Server Error!");
        
    }
});

// Staff password changing for admin
router.post("/changestaffpassword", authorization, async(req, res) => {
    try {

        const {user_id,newpassword,confirmpassword} = req.body;

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
        return res.status(500).json("Server Error!");
        
    }
});


// DEACTIVATIONS

// Customer account deactivate
router.post("/deactivate", authorization, async(req, res) => {
    try {

        const {user_id,password} = req.body;

        const log = await pool.query("SELECT * FROM tbl_login WHERE user_id = $1", [user_id]);

        //3. check if the incomming password is the same as the database password
        const validPassword = await bcrypt.compare(password, log.rows[0].password);

        if(!validPassword){
            return res.status(401).json("Incorrect Password!");
        }

        const updatestatus = await pool.query("UPDATE tbl_login SET l_status='inactive' WHERE user_id=$1 RETURNING *",
        [user_id]);

        const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id AND l.user_type='active'", [req.user.id]);

        if(user.rows.length !== 0){
            return res.status(401).json("Couldn't Deactivate Account!");
        }
        
        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// User deactivate for admin panel
router.post("/deactivateuser", authorization, async(req, res) => {
    try {

        const {user_id} = req.body;

        const log = await pool.query("SELECT * FROM tbl_login WHERE user_id = $1", [user_id]);        

        if(log.rows[0].l_status === 'active'){

            const updatelog = await pool.query("UPDATE tbl_login SET l_status='inactive' WHERE user_id=$1 RETURNING *",
            [user_id]);    
        }

        else if(log.rows[0].l_status === "inactive"){

            const updatelog = await pool.query("UPDATE tbl_login SET l_status='active' WHERE user_id=$1 RETURNING *",
            [user_id]);
        }
        
        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Specialization deactivate
router.post("/deactivatespec", authorization, async(req, res) => {
    try {

        const {sc_id} = req.body;

        const spec = await pool.query("SELECT * FROM tbl_specchild WHERE sc_id = $1", [sc_id]);        

        if(spec.rows[0].sc_status === 'active'){

            const updatespec = await pool.query("UPDATE tbl_specchild SET sc_status='inactive' WHERE sc_id=$1 RETURNING *",
            [sc_id]);    
        }

        else if(spec.rows[0].sc_status === "inactive"){

            const updatespec = await pool.query("UPDATE tbl_specchild SET sc_status='active' WHERE sc_id=$1 RETURNING *",
            [sc_id]);    
        }
        
        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// card deactivate
router.post("/deactivatecard", authorization, async(req, res) => {
    try {

        const {card_id} = req.body;

        const card = await pool.query("SELECT * FROM tbl_card WHERE card_id = $1", [card_id]);        

        if(card.rows[0].card_status === 'active'){

            const updatecard = await pool.query("UPDATE tbl_card SET card_status='inactive' WHERE card_id=$1 RETURNING *",
            [card_id]);    
        }

        else if(card.rows[0].card_status === "inactive"){

            const updatecard = await pool.query("UPDATE tbl_card SET card_status='active' WHERE card_id=$1 RETURNING *",
            [card_id]);    
        }
        
        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

// Category Deactivate
router.post("/deactivatecategory", authorization, async(req, res) => {
    try {

        const {cat_id} = req.body;

        const category = await pool.query("SELECT * FROM tbl_category WHERE cat_id = $1", [cat_id]);        

        if(category.rows[0].cat_status === 'active'){

            const updatecategory = await pool.query("UPDATE tbl_category SET cat_status='inactive' WHERE cat_id=$1 RETURNING *",
            [cat_id]);    
        }

        else if(category.rows[0].cat_status === "inactive"){

            const updatecategory = await pool.query("UPDATE tbl_category SET cat_status='active' WHERE cat_id=$1 RETURNING *",
            [cat_id]);
        }
        
        return res.json(true);

    } catch (err) {

        console.error(err.message);
        return res.status(500).json("Server Error!");
        
    }
});

module.exports = router;
