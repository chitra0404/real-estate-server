const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
    
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    }
})

const User=mongoose.model("user",userSchema)
module.exports=User;