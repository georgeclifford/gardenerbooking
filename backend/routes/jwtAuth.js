const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async(req,res) => {
    try {

        //1. destructure the body
        const { username, password, c_phno, c_fname, c_lname, c_house, c_street, c_dist, c_pin, confirmpass} = req.body;

        //check if password is same
        if(password !== confirmpass){
            return res.status(401).json("Password Does Not Match!");
        }

        //2. check if user exists
        const user = await pool.query("SELECT * FROM tbl_login WHERE username = $1", [username]);

        //res.json(user.rows);

        if (user.rows.length !==0){
            return res.status(401).json("User Already Exist!");
        }

        //3. Bcrypt user password
        const saltRound=10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptpassword = await bcrypt.hash(password, salt);

        //4. enter new user in database
        const newUser = await pool.query("INSERT INTO tbl_login (username, password, user_type, l_status) VALUES ($1, $2, 'customer', 'active') RETURNING *",
        [username, bcryptpassword]);

        const uid = newUser.rows[0].user_id;

        var dt = new Date();

        const newCust = await pool.query("INSERT INTO tbl_customer (c_phno, user_id, c_fname, c_lname, c_house, c_street, c_dist, c_pin, c_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [c_phno, uid, c_fname, c_lname, c_house, c_street, c_dist, c_pin, dt]);

        //5. generating jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});

//login route
router.post("/login", validInfo, async (req, res) => {
    try {

        //1. Destructure the body
        const {username, password} = req.body;

        //2. check if user doesnt exist (if not then we throw error)
        const user = await pool.query("SELECT * FROM tbl_login WHERE username = $1", [username]);
        if(user.rows.length === 0){
            return res.status(401).json("Incorrect Password or Email!");
        }

        //3. check if the incomming password is the same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        //console.log(validpassword);

        if(!validPassword){
            return res.status(401).json("Incorrect Password or Email!");
        }

        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});

router.get("/is-verify", authorization, async(req, res) => {
    try {

        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
})

module.exports = router;