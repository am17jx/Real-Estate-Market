const catchAsync = require('../utils/catchAsync');
const jwt =require('jsonwebtoken');
const User = require('../model/usermodel')
const bcrypt = require('bcryptjs');
const userSchema =require('./userValidation')
require('dotenv').config();

 const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'90d'
    })
}

exports.signup = catchAsync(async(req,res,next)=>{
   

    const {name,email,password}=req.body ;
    await userSchema.validate(req.body, { abortEarly: false });

   
    if(!email || !password){
        const error = new Error('Email and password are required');
        error.statusCode = 400;
       error.status = 'fail';
       throw error;   
    }

    const checkemail = await User.findOne({ where: { email } })
    if(checkemail){
        const error = new Error('email is already exists');
        error.statusCode = 400;
       error.status = 'fail';
       throw error; 
    }

    const sign_result=await User.create({name,email,password})
    const token = signToken(sign_result.id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            sign_result
        }
      })
})

exports.login = catchAsync(async(req,res,next)=>{

    const {email,password} =req.body

    if(!email || !password){
        const error = new Error('Email and password are required');
        error.statusCode = 400;
       error.status = 'fail';
       throw error;   
    }

    const user = await User.findOne({ where: { email } })
    if(!user){
        const error = new Error('email is not exists please signup or correct your email ');
        error.statusCode = 400;
       error.status = 'fail';
       throw error;  
    }


    

    const matchpassword  = await bcrypt.compare(password,user.password);
    if (!matchpassword) {
        const error = new Error('Incorrect email or password');
        error.statusCode = 401;
        error.status = 'fail';
        throw error;
      }
    
    const token = signToken(user.id);

    res.status(200).json({
             status: 'success',
             token,
             data: {
                user
             }
           })





    
})

exports.protect = catchAsync(async(req,res,next)=>{

const token =req.header('Authorization')?.split(' ')[1];
if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
try{
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user=await User.findOne({where:{id:decode.id}});
    req.user=user;
    // req.user=decode;
    
    next();
}catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
}

    
})

exports.checkRole = catchAsync(async(req,res,next)=>{
    const user = await User.findOne({where:{id :req.user.id}});
    if(user.role ==='user'){
        const error = new Error('Sorry your just poor user please go away and be kind');
        error.statusCode = 401;
        error.status = 'fail';
        throw error;}
        next();


})