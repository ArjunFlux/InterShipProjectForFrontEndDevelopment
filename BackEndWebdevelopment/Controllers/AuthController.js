const UserModel = require("../Models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const signup = async (req,res)=>{
    try{
        const {name ,email,password} = req.body;
        const user = await UserModel.findOne({email}); 
        if(user){
            return res.status(409)
                .json({message:"User already exit,you can login",success:false})
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message:"Sign Up Successfully",
                success : true,
            })
    }catch(err){
        res.status(500)
            .json({
                message:"Internal Server error  ",
                success : false,
            })
    }
}
const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email}); 
        const errorMesg = "Authentication Failed \n Email or password Incorrect";
        if(!user){
            return res.status(403)
                .json({message:errorMesg,success:false})
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message:errorMesg,success:false})
        }
        const jwtTok = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'12h'},
        )
        res.status(200)
            .json({
                message:"Login Successfully",
                success : true,
                jwtTok,
                email,
                name : user.name
            })
    }catch(err){
        res.status(500)
            .json({
                message:"Internal Server error  ",
                success : false,
            })
    }
}
module.exports = {
    signup,
    login,
}
