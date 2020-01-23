const express =require("express");
const app=express();
const morgan=require("morgan");
const mysql=require("mysql");
const bodyParser=require("body-parser");

//const userRouter=require("./routes/router/users");
const denemeRouter=require("./deneme");
const signuprouter=require("./routes/router/signup");
const loginrouter=require("./routes/router/login");
const tryrouter=require("./routes/router/try");
const getbusticketrouter=require("./routes/router/getbustickets");
const getmyticketsrouter=require("./routes/router/getmytickets");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});



//app.use("/users",userRouter);
app.use("/",denemeRouter);
app.use("/signup",signuprouter);
app.use("/login",loginrouter);
app.use("/try",tryrouter);
app.use("/getbustickets",getbusticketrouter);
app.use("/getmytickets",getmyticketsrouter);

console.log("app");
module.exports=app;