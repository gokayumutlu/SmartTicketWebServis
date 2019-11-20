const crypto=require("crypto");

function hashPassword(pass,salt){
    var result=crypto.scryptSync(pass,salt,16);
    console.log(pass+"-"+salt+"-"+result.toString("hex"));
    return result.toString("hex");
    
}

console.log("hash");
module.exports=hashPassword;
