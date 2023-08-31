const users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await users.findOne({email: email});
        if(!user){
            return res.status(400).json({error: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error: "Invalid Credentials"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.status(200).json({message: "Logged in successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}
module.exports = Login;