const express=require("express");
const mysql=require("../../db/db").pool;
const router=express.Router();

function checkEmail(email,callback){
    mysql.getConnection(function(err,conn){
        conn.query("SELECT user_email FROM user",function(err,rows){
            if(err){
                console.log("Email check query error");
                callback(0);
            }
            if(rows.length>0){
                for(var i=0;i<rows.length;i++){
                    if(email==rows[i].email){
                        console.log(rows[i].email);
                        console.log("Check same email error");
                        callback(0);
                        break;
                    }
                }
            }
            else{
                callback(1);
            }
        })
    })
}

// return 1 olumlu email yok kayıt olunabilir
//return 0 olumsuz email var kayıt olunamaz

console.log("emailcheck");

module.exports=checkEmail;