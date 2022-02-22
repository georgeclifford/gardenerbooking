const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req, res) => {
    try {

        //req.user has the payload
        // res.json(req.user.id);

        const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id", [req.user.id]);
        
        res.json(user.rows[0]);

        // console.log(user.rows[0]);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

router.post("/update", authorization, async(req, res) => {
    try {

        //req.user has the payload
        // res.json(req.user.id);

        const {user_id,c_fname,c_lname,c_phno,c_house,c_street,c_pin,c_dist} = req.body;

        const updatecust = await pool.query("UPDATE tbl_customer SET c_phno=$1, c_fname=$2, c_lname=$3, c_house=$4, c_street=$5, c_dist=$6, c_pin=$7 WHERE user_id=$8 RETURNING *",
        [c_phno, c_fname, c_lname, c_house, c_street, c_dist, c_pin, user_id]);

        const user = await pool.query("SELECT * FROM tbl_customer c, tbl_login l WHERE c.user_id = $1 AND l.user_id = $1 AND c.user_id = l.user_id", [user_id]);

        res.json(user.rows[0]);

    } catch (err) {

        console.error(err.message);
        res.status(500).json("Server Error!");
        
    }
});

module.exports = router;
