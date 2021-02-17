const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const app = require('../app')
const Patients = require("../model/Patients");
const auth = require("../middleware/auth");
const User = require("../model/User");
const DoctorToPatient = require("../model/DoctorToPatient");

router.get("/get_all", auth, async (req, res) => {
    try{
        const patients = await Patients.find();
        res.json(patients);
    }
    catch(err){
        res.send({ message: "Error in Fetching Patients" });
    }
});

router.get("/getallbydoctor", auth, async (req, res) => {
    try{
        const _pObj = await DoctorToPatient.find({doctor:req.user.id});
        var patientsIdArray=[];
        _pObj.forEach(element => {
            patientsIdArray.push(element.patient)
        });
        const patients = await Patients.find().where('_id').in(patientsIdArray);
        res.json(patients);
    }
    catch(err){
        res.send({ message: "Error in Fetching Patients" });
    }
});
router.get("/getallbycity/:city", auth, async (req, res) => {
    try{
        const _pObj = await DoctorToPatient.find({doctor:req.user.id});
        var patientsIdArray=[];
        _pObj.forEach(element => {
            patientsIdArray.push(element.patient)
        });
        const patients = await Patients.find().where('_id').in(patientsIdArray);
        result=[];
        patients.forEach(element =>{
            if(element.city.toLowerCase()===req.params.city.toLowerCase()){
                result.push(element);
            }
        });
        res.json(patients);
    }
    catch(err){
        console.log(err);
        res.send({ message: "Error in Fetching Patients" });
    }
});

router.get("/getByFname/:fname", auth, async (req, res) => {
    try{
        const _pObj = await DoctorToPatient.find({doctor:req.user.id});
        var patientsIdArray=[]
        _pObj.forEach(element => {
            patientsIdArray.push({_id:element.patient})
        });
        var result=[]
        var patients = await Patients.find().where('_id').in(patientsIdArray);
        patients.forEach(element =>{
            if(element.name.firstname.toLowerCase()===req.params.fname.toLowerCase()){
                result.push(element);
            }
        });
        res.json(result);
    }
    catch(err){
        res.send({ message: "Error in Fetching Patients" });
    }
});

router.get("/getByLname/:lname", auth, async (req, res) => {
    try{
        const _pObj = await DoctorToPatient.find({doctor:req.user.id});
        var patientsIdArray=[]
        _pObj.forEach(element => {
            patientsIdArray.push({_id:element.patient})
        });
        var result=[]
        var patients = await Patients.find().where('_id').in(patientsIdArray);
        patients.forEach(element =>{
            if(element.name.lastname.toLowerCase()===req.params.lname.toLowerCase()){
                result.push(element);
            }
        });
        res.json(result);
    }
    catch(err){
        res.send({ message: "Error in Fetching Patients" });
    }
});

router.get("/getbypid/:pid", auth, async (req, res) => {
    try{
        const patients = await Patients.find({pId:req.params.pid});
        res.json(patients);
    }
    catch(err){
        res.send({ message: "Error in Fetching Patients" });
    }
});

router.get("/getbyid/:id", auth, async (req, res) => {
    try{
        const patients = await Patients.findById(req.params.id);
        res.json(patients);
    }
    catch(err){
        res.send({ message: "Error in Fetching Patients" });
    }
});

router.post(
    "/add",auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            name:{
                firstname,
                lastname
            },
            gender,
            address,
            dob,
            city,
            district,
            maritalStatus,
            contactNumber,
            email
        } = req.body;

        try {
            patient = new Patients({
                name:{
                    firstname,
                    lastname
                },
                gender,
                address,
                dob,
                city,
                district,
                maritalStatus,
                contactNumber,
                email
            });

            const savedpatient = await patient.save();
            const docToPat = new DoctorToPatient({
                doctor: req.user.id,
                patient: savedpatient._id
            });
            const savedRelation = await docToPat.save();
            res.json(savedpatient);

        } catch (err) {
            res.status(500).send("Error in Saving");
        }
    }
);

router.post('/update', auth, async (req, res)=>{

    // Validate Request
    if(!req.body) {  
        return res.status(400).send({  message: "Please fill all required field"});
    }

    // Find user and update it with the request body
    Patients.findByIdAndUpdate(req.body._id,req.body, {new:true})
    .then(user=>{
        if(!user){
            return res.status(404).send({   message: "user not found with id " + req.params.id });
        }
        res.send(user)
    }).catch(err=>{
        if(err.kind === 'ObjectId') {  
            return res.status(404).send({  message: "user not found with id " + req.params.id});
        }
        return res.status(500).send({  message: "Error updating user with id " + req.params.id});
    });
});


module.exports = router;