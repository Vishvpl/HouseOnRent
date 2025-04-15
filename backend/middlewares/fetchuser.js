const jwt=require('jsonwebtoken')
const fetchuser=(req,res,next)=>{
    const authtoken=req.header('auth-token')
    const data=jwt.verify(authtoken,'vishvpal')
    req.user=data.user.id;
    next();
}

module.exports=fetchuser;