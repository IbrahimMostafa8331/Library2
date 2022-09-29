const express=require('express');
const joi=require('joi');
const bcrypt=require('bcryptjs');
const _=require('lodash');
const jwt=require('jsonwebtoken');
const {User}=require('../models/user');
const router=express.Router();

router.post('/',async(req,res)=>{
    const validationResult=validate(req.body);
    if(validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message);
    }
    let user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Invalid Email or Password');
    }
    const validPassword= await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).send('Invalid Email or Password');
    }
    const token =jwt.sign( _.pick(user,["_id","name","isAdmin"]),"jwtSecretKey" );
    res.send(token);
});


function validate(body){
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(5).max(10).required()
    });
    return schema.validate(body);
}

module.exports=router;
