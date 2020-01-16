const express=require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");

router.post("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var user_id=req.body.user_id;
        var user_name=req.body.user_name;
        
        var sql="INSERT INTO users(user_id,name) values(?)";
                var values=[[user_id],[user_name]];
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

console.log("try");

module.exports=router;