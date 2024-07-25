const User=require("../Models/Usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

module.exports.getUser=async(req,res)=>{
    try{
        const user=await User.find({})
        res.status(200).json({message:user})
    }
    catch(err){
        res.status(500).send({message:err})
    }
}


module.exports.Register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const emailexist=await User.findOne({email:req.body.email})
        if(emailexist){
            res.status(400).json({status:"400",message:"user already exist"})
        
        return;
        }
    
  
    const hashedpassword=await bcrypt.hash(password,10);
    const token = jwt.sign(
        { email },
        process.env.SECRET
      );
    
    const user=new User({name,email,password:hashedpassword,token})
    await user.save();
    res.status(200) .header("auth-token").json({token:token});
    }
    catch(err){
        console.error('Error signing up user', err);
        return res.status(400).json({ Message: "Internal server error" })
    }
}
module.exports.Login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(409).json({message:"authentication failed"});
    }
        const passwordmatch=await bcrypt.compare(password,user.password);
        if(!passwordmatch){
            return res.status(409).json({message:"invalid password"}); }
            if (user && passwordmatch) {
                const token=jwt.sign({ userId:user._id},process.env.SECRET,{expiresIn:'24hr'})
                res.json({
                 
                  
                  email: user.email,
                 token:token
                })}
            else{
                return res.status(400).json({ message: 'invalid password' });
            }
    
}