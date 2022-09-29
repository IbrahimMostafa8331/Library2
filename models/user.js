const mongoose=require('mongoose');
const Joi = require('joi');

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:Boolean
});
const User=mongoose.model('User',userSchema);
function validateUser(user){
    const schema=Joi.object( {
        name:Joi.string().min(3).max(20).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(10).required()
    });
    return schema.validate(user);
}
module.exports.User=User;
module.exports.validateUser=validateUser;