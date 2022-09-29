function admin(req,res,next){
    //401 Unauthorized
    //403 Foribidden 
    if(!req.user.isAdmin){
        return res.status(403).send('Access Denied : this endpoint for admins only');
    }
    next();
}

module.exports=admin;