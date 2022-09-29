const jwt=require('jsonwebtoken');

function authorization(req,res,next){
    const token=req.header('x-token');
    if(!token){
        return res.status(401).send('Access Denied-No token Provided');
    }
    try{
        const payload=jwt.verify(token,"jwtSecretKey");
        req.user=payload;
        next();
    }catch(ex){
        res.status(400).send('Invalid Token');
    }
}
module.exports=authorization;