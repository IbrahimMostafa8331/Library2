const mongoose=require('mongoose');

const AuthorSchema=new mongoose.Schema({
    name:String,
    birthdate:Date,
    country:String
});

const Author=mongoose.model('Author',AuthorSchema);


module.exports=Author;