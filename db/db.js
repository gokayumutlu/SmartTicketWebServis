const mysql=require("mysql");
const dotenv=require("dotenv");

dotenv.config();

const pool=mysql.createPool({
    host:process.env.HOST,
    user:"",
    port:"",
    password:"",
    database:""
});

console.log("db");
exports.pool=pool;