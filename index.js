//require
const express=require('express');
const mongoose=require('mongoose');

//const cors=require('cors');
const bookRouter= require('./routes/book');
const authorRouter=require('./routes/author');
const userRouter=require('./routes/user');
const authRouter=require('./routes/auth');


//main objetcs
const server=express();

//add needed (middleware) functions to request pipeline 
//server.use(cors());
server.use(express.json());
// server.use(authorization);
server.use('/api/books',bookRouter);
server.use('/api/authors',authorRouter);
server.use('/api/users',userRouter);
server.use('/api/auth',authRouter);
//Live database
mongoose.connect('mongodb+srv://nodeheroku8331:Emcemc22%40@cluster0.zf55g9i.mongodb.net/library?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Connected to mongoDB');
    })
    .catch((err)=>{
        console.log(err);
    });

//mongoDB Connection
// mongoose.connect('mongodb://localhost:27017/Library')
//     .then(()=>{
//         console.log('Connected to mongoDB');
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

server.get("/",(req,res)=>{
    res.send("Welcome to Library App");
});


//Start the Server
const port=process.env.PORT||3000;
server.listen(port,()=>{
    console.log('server listening to port '+port);
});

