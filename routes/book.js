const express=require('express');
const admin = require('../middleware/admin');
const authorization=require('../middleware/authorization');
const Book=require('../models/book');
const { route } = require('./user');


const router=express.Router();


router.get('/',authorization,async(req,res)=>{
    const books=await Book.find();
    return res.send(books);
});

router.get('/:id',authorization,async(req,res)=>{
    const book=await Book.findById(req.params.id);
    if(!book){
        return res.status(404).send('Can not find Book');
    }
    return res.send(book);
});

router.post('/',authorization,async(req,res)=>{
    const newBook=new Book({
        title:req.body.title,
        authorName:req.body.authorName,
        authorId:req.body.authorId
    });

    const result=await newBook.save();
    return res.send(result);
});

router.delete('/:id',[authorization,admin],async(req,res)=>{
    const result=await Book.deleteOne({_id:req.params.id});
    res.send(result);
});



module.exports=router;
