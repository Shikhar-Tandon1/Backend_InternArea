const express =require("express")
const router= express.Router();
const login= require("../Model/Login");

router.post("/",async (req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const loginInfo=new login({
        browser: req.body.browser,
        os: req.body.os, 
        device: req.body.device, 
        ip: req.body.ip
    })
    await loginInfo.save().then((data)=>{
        res.send(data)
    }).catch((error)=>{
        console.log(error,"not able to post the data")
    })
})

module.exports=router