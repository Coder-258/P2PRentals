const UserModel= require('../Schemas/UserSchema');
const {validationResult}=require('express-validator');

// the below function checks if there is any error in the ccredentials of the req.



 module.exports.SignUp= async (req,res)=>{
    // firstly this function checks if there is any error or not
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.error("Validation error",errors.array());
        return res.status(400).json({errors:errors.array()});
    }
    const {firstName,lastName,email,password}=req.body;
    const userAlreadyExist=await UserModel.findOne({email});
    if(userAlreadyExist){
        return res.status(400).json({message:"User already exists"})
    }
    // after verifying no error . a user is created and saved in the database along with the hashed password
    const hashedPassword=await UserModel.hashPassword(password);
       const user = await UserModel.create({
            fullName:{
                firstName,
                lastName
            },
            email:email,
            password:hashedPassword
       })
       await user.save();
       const token=await user.generateAuthToken();
       res.status(201).json({token,user})
 }