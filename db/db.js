const mysql=require("mysql");
const dotenv=require("dotenv");

dotenv.config();

const pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    port:"3306",
    password:"",
    database:"smartticket"
});

console.log("db");
exports.pool=pool;