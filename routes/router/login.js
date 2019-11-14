const express=require("express");
const mysql=require("./../../db/db").pool;
const hashP=require("./../../control/password/hash");
const router = express.Router();
const bodyParser=require("body-parser");

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.body.email;
        var userSifre=req.body.sifre;

        var sql="SELECT user_password FROM user WHERE user_email=?";
        conn.query(sql,email,function(err,rows){
            if(err){
                res.send(err);
            }
            else{
                var pass=rows[0];
                console.log(email+" "+pass);
                //var hashedSifre=hashP(userSifre);
                if(userSifre==pass){ //fix it -> usersifre->hashedsifre
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(500);
                }
            }
        })
    })

});

console.log("login");
module.exports=router;
