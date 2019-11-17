const express=require("express");
const mysql=require("./../../db/db").pool;
const hashP=require("./../../control/password/hash");
const router = express.Router();
const bodyParser=require("body-parser");

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.body.email;
        var userSifre=req.body.sifre;

        var sql="SELECT user_password FROM appusers WHERE user_email=?";
        conn.query(sql,email,function(err,rows){
            if(err){
                console.log(err);
                return res.status(500).send(err);
                //res.send(err);
            }
            else{
                if(rows[0].length==0){
                    console.log("no result");
                }
                else{
                    var pass=rows[0].user_password;
                    console.log(email+" "+pass);
                    //var hashedSifre=hashP(userSifre);
                    if(userSifre==pass){ //fix it -> usersifre->hashedsifre
                        res.sendStatus(200);
                    }
                    else{
                    console.log("password mismatch");
                    res.sendStatus(500);
                    }
                }
                
            }
        })
        conn.release();
    })


});

console.log("login");
module.exports=router;
