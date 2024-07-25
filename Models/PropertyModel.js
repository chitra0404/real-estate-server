const mongoose=require('mongoose')

const PropertySchema=mongoose.Schema({
    name:{
        type:String,
    },
    property_type:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    property_status:{
        type:String,
        default:"Not Sold"
    }
})

const Property=mongoose.model("property",PropertySchema);
module.exports=Property;