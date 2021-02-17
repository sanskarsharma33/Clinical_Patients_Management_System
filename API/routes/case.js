const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const app = require('../app')
const Patients = require("../model/Patients");
const auth = require("../middleware/auth");
const User = require("../model/User");
const DoctorToPatient = require("../model/DoctorToPatient");
const Cases = require("../model/Cases");
const { route } = require("./user");


//Retrive Cases
router.get("/getall", auth, async (req, res) => {
    try{
        var temp = await Cases.aggregate([
        {
            $lookup:
            {
                from:'patients',
                localField:"pId",
                foreignField:"pId",
                as:"resulting"
            }
        }]);
        temp = temp.filter(item => !(item.resulting.length == 0));
        var result = [];
        result = temp.filter(ele => ele.dId == req.user.id);
        res.json(result);
    }
    catch(err){
        res.send({ message: "Error in Fetching Patients" });
    }
});

router.get("/getcasebyid/:id", auth, async (req, res) => {
    try{
        var result = await Cases.findById(req.params.id);
        res.json(result);
    }
    catch(err){
        res.send({ message: "Error in Fetching Cases" });
    }
});

//Add Cases
router.post('/addcase', auth, async (req, res)=>{

    // Validate Request
    if(!req.body) {  
        return res.status(400).send({  message: "Please fill all required field"});
    }

    try{
        const Case = new Cases(req.body);
        Case.caseDate = new Date();
        Case.dId = req.user.id;
        const savedcase= await Case.save();
    }catch(err){
        res.status(500).send("Error in Saving");
    }
});


//Edit Cases
router.put('/editcase', auth, async (req, res)=>{
    // Validate Request
    if(!req.body) {  
        return res.status(400).send({  message: "Please fill all required field"});
    }

    // Find user and update it with the request body
    try{
        await Cases.findByIdAndUpdate(req.body._id,req.body, {new:true})
    }catch(err){
        res.status(500).send("Error in Saving");
    }
});

//Delete Case
router.delete('/deletecase/:id', auth, async(req,res)=>{
    // Validate Request
    if(!req.body) {  
        return res.status(400).send({  message: "Please fill all required field"});
    }

    // Find user and update it with the request body
    try{
        await Cases.findByIdAndDelete(req.params.id);
    }catch(err){
        res.status(500).send("Error in Delete");
    }
});

module.exports = router;