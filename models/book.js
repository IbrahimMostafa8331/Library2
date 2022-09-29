
const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    title:String,
    authorName:String,
    authorId:mongoose.Types.ObjectId,
    publishDate:Date
});

const Book=mongoose.model('Book',bookSchema);

module.exports=Book;