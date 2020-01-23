const express=require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var fromId=req.query.fromId;
        var toId=req.query.toId;
        var date=req.query.date;
        var sql="select date_format(departure_time,'%H:%i') as departure_time, travel_fare, travel_time"+
                " from bustravel where departure_date=? and route_from_id=? and route_to_id=?";
        var data=[date+" 00:00:00",fromId,toId];
        conn.query(sql,data,function(err,rows){
            console.log(data);
            if(err){
                res.status(404).send({error: err})
                //res.json(err);
            }
            
            else{
                res.send(JSON.parse(JSON.stringify({ticketData: rows})));
                console.log(JSON.parse(JSON.stringify(rows)));
            }
        })
        conn.release();
    })
})


console.log("biletleri getir");

module.exports=router;