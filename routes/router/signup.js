const express = require("express");
const mysql=require("./../../db/db").pool;
const hashP=require("./../../control/password/hash");
const emailCheck=require("./../../control/email/check");
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");
const crypto=require("crypto");

var salt=createSalt(16);

router.post("/",(req,res)=>{
    const dt=dateTime.create();
    const formatted=dt.format("y/m/d");
    mysql.getConnection(function(err,conn){
        var ad=req.body.ad;
        var email=req.body.email;
        var sifre=hashP(req.body.sifre,salt);
        var telefon=req.body.telefon;
        var dogumtarihi=req.body.dogumtarihi;
        
        var sql="INSERT INTO users (user_name, user_email, user_password, user_salt, user_phone, user_date_of_birth) values (?)";
                var values=[[ad],[email],[sifre],[salt],[telefon],[dogumtarihi]];
                conn.query(sql,[values],function(err,rows){
                if(err){
                    res.send(err);
                    console.log("insert error");
                }
                else{
                    console.log("insert completed");
                    res.json(rows);
                    }
                });
        conn.release();
    })
});

function createSalt(len){
    return crypto
        .randomBytes(Math.ceil((len*3)/4))
        .toString("base64")
        .slice(0,len)
        .replace(/\+/g, '0')
        .replace(/\//g, '0');
}

console.log("signUp");

module.exports=router;
