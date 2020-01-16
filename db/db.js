const mysql=require("mysql");
const dotenv=require("dotenv");

dotenv.config();

const pool=mysql.createPool({
    host:"45.84.189.67",
    user:"gokayum1_adm",
    port:"8080",
    password:"461978_gs",
    database:"gokayum1_smartticket"
});

console.log("db");
exports.pool=pool;
