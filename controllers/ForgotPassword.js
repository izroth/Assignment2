const users = require('../models/users');
const nodemailer = require('nodemailer');   

const ForgotPassword = async (req, res) => {
    try{
        const {email} = req.body;
        //check if user exists with that email
        const findusers = users.findOne({email: email});
        if(!findusers){
            return res.status(400).json({error: "User does not exist"});
        }
        //generate otp
        const otp = Math.floor(Math.random() * 1000000);
        //update otp in db
        const updateotp = users.updateOne({email: email}, {otp: otp});
        if(!updateotp){
            return res.status(400).json({error: "OTP not updated"});
        }
        //send otp to email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your email',
                pass: 'your password'
                }
            });
        const mailOptions = {
            from: 'your email',
            to: email,
            subject: 'Sending Email using Node.js',
            text: `Your OTP is ${otp}`
            };
        const sendmail = transporter.sendMail(mailOptions);
        // if(!sendmail){
        //     return res.status(400).json({error: "OTP not sent"});
        // }
        res.status(200).json({message: "OTP sent successfully"});

        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}
module.exports = ForgotPassword;


