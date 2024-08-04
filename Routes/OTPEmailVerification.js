const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

let otpStore = {};  


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

app.post('/request-otp', (req, res) => {
    const { email, language } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore[email] = otp;

    transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    }, (error) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, otp });  // Send OTP back for demo purposes
    });
});
