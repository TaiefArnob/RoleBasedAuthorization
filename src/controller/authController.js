import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv'
dotenv.config()


const register=async(req,res)=>{
   try{
    const {username,email,password,role}=req.body;

    const hashedPassword=await bcrypt.hash(password,10)
 
    const newUser=new User({username,email,password:hashedPassword,role})
 
    await newUser.save();
    res.status(201).json
    ({message:`User registered with username ${username}`})
   }catch(error){
    res.status(500).json
    ({message:'Something went wrong'})
   }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
    const user=await User.findOne({email})

    if(!user){
        return res.status(404).json({message:`User not found`})
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:'Invalid credentials'})
    }

    //Generating the JWT token...
    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'})

    res.status(200).json({token});

    }catch(error){
        res.status(500).json
    ({message:'Something went wrong'})
    }
}

export {register,login}