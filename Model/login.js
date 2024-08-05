const mongoose=require("mongoose")
const LoginShcema=new mongoose.Schema({
    browser: String,
    os: String,
    device: String,
    
    createAt:{
        type:Date,
        default:Date.now,
    },
})
module.exports=mongoose.model("Login",LoginShcema)
