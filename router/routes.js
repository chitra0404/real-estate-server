const express=require('express');
const { getUser, Register, Login } = require('../Controllers/UserController');
const { createProperty, getProperty, deleteproperty, updateProperty } = require('../Controllers/PropertyController');
const router=express.Router();



router.get("/user",getUser);
router.post("/user",Register);
router.post("/login",Login)
router.post("/create",createProperty);
router.get("/getprop",getProperty)
router.delete("/:id",deleteproperty)
router.put("/:id",updateProperty)


module.exports=router;
