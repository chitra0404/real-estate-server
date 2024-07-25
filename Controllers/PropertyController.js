const Property=require('../Models/PropertyModel');


module.exports.createProperty=async(req,res)=>{
    // try{
    const {name,property_type,location,price,description,property_status}=req.body;
    // if(location&&name){
    //     res.status(409).send({message:"already property exists"})
    //     return;

    // }
    const property=new Property({name,property_type,location,price,description,property_status})
await property.save();
res.status(200).json({message:property})
    // }
    // catch(err){
    //     res.status(500).send({message:err})
    // }

}

module.exports.getProperty=async(req,res)=>{
    try{
    const property=await Property.find({})
    res.status(200).json({message:property})
    }
    catch(err){
        res.status(400).send(err);
    }
}

module.exports.deleteproperty=async (req, res) => {
    const propertyId = req.params.id;
 
    try {
        const deletedProperty = await Property.findByIdAndDelete(propertyId);
 
        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
 
        res.json({ message: "Property deleted", deletedProperty });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.updateProperty = async (req, res) => {
    try {
        const propertyId = req.params.id; 
        const updates = req.body; 

        
        const property = await Property.findByIdAndUpdate(propertyId, updates, { new: true });

        if (!property) {
            return res.status(404).send({ message: "Property not found" });
        }

        res.status(200).json({ message: property });
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).send({ message: "Internal server error" });
    }
}
