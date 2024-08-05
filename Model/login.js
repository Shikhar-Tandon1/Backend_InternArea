const mongoose=require("mongoose")
const LoginShcema=new mongoose.Schema({
    browser: String,
    os: String,
    device: String,
    ip: Number,
    
})
module.exports=mongoose.model("login",LoginShcema)
