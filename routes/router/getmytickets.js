const express=require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.query.email;
        var sql="select route_from_name, route_to_name, date_format(departure_date, '%d-%m-%Y') as departure_date, date_format(departure_time,'%H:%i') as departure_time"+
        " from purchase, bustravel,users"+
        " where purchase.btravel_id=bustravel.btravel_id and purchase.user_id=users.user_id and users.user_email=?";
        conn.query(sql,email,function(err,rows){
            console.log(email);
            if(err){
                res.status(404).send({error: err})
                //res.json(err);
            }
            
            else{
                //res.send(JSON.parse(JSON.stringify({ticketData:rows})));
                res.status(200).send(rows);
                console.log(JSON.parse(JSON.stringify(rows)));
            }
        })
        conn.release();
    })
})


console.log("biletlerimi getir");

module.exports=router;