const express=require('express');
const { date } = require('joi');
const Author=require('../models/author');
const authorization=require('../middleware/authorization');

const router=express.Router();


router.get('/',authorization,async (req,res)=>{
    const authors=await Author.find();
    if(authors.length===0){
        return res.status(404).send('No Authors Found');
    }
    return res.send(authors);
});

router.get('/:id',authorization,async(req,res)=>{
    const author=await Author.findById(req.params.id);
    if(!author){
        return res.status(404).send('No Authors Found');
    }
    return res.send(author);
});

router.post('/',authorization,async(req,res)=>{
    const newAuthor=new Author({
        name:req.body.name,
        birthdate:Date.now(),
        country:req.body.country
    });
    const result= await newAuthor.save();
    return res.send(result);
});


module.exports =router;