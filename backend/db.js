const Pool=require("pg").Pool;

const pool=new Pool({
    user: "postgres",
    password: "1peter224",
    host: "localhost",
    port: 5432,
    database: "gardenerbooking"
});

module.exports = pool;