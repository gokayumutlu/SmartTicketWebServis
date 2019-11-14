const express = require("express");
const mysql=require("./db/db").pool;
const router = express.Router();

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        if(err){
            return res.send(err);
        }
        conn.query("select * from user",function(err,rows){
            if(err){
                res.send(err);
            }
            else{
                res.json(rows);
            }
        });
        conn.release();
    });
});

console.log("denneme");

module.exports=router;