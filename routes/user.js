const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');
// const User=require('../models/user').User;
// const validateUser=require('../models/user').validateUser;
const {User,validateUser}=require('../models/user');
const authorization = require('../middleware/authorization');

const router=express.Router();


router.post('/',async(req,res)=>{
    const validationResult=validateUser(req.body);
    if(validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message);
    }
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).send('User Already Exists');
    }
    let salt=await bcrypt.genSalt(10);
    let hash=await bcrypt.hash(req.body.password,salt);
    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hash
    });
    const result=await user.save();
    const token =jwt.sign( _.pick(user,["_id","name","isAdmin"]),"jwtSecretKey" );
    res.header('x-token',token).send(_.pick(result,['_id','name','email']));
    // res.send({_id:result._id,name:result.name,email:result.email});
});

//endpoint to get the current logged in user
router.get('/me',authorization,async(req,res)=>{
    const currentUser=await User.findById(req.user._id).select('-password');
    res.send(currentUser);
});

module.exports=router;



