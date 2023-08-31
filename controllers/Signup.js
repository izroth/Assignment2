const users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Signup = async (req, res) => {
    try{
         const {username, email, password} = req.body;

            const alreadyexits= users.findOne({email: email});
            if(alreadyexits){
                return res.status(400).json({error: "Email already exists"});
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
          
            const user = await users.create({
                username: username,
                email: email,
                password: hash,
            });
            if(!user){
                return res.status(400).json({error: "User not created"});
            }
           
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
          
            res.cookie("token", token, {
                httpOnly: true,
            });
            res.status(200).json({message: "User created successfully"});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}
module.exports = Signup;
