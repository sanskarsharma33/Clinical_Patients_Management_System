const mongoose = require("mongoose");
autoIncrement = require('mongoose-auto-increment');

const PatientSchema = mongoose.Schema({
    pId:Number,
    name:{
        firstname:String,
        lastname:String
    },
    gender:String,
    address:String,
    dob:Date,
    city:String,
    district:String,
    maritalStatus:String,
    contactNumber:Number,
    email:String,
});

autoIncrement.initialize(mongoose.connection);
PatientSchema.plugin(autoIncrement.plugin, {
    model: 'Patient',
    field: 'pId',
    startAt: 0,
    incrementBy: 1
});

// export model patient with PatientSchema
module.exports = mongoose.model("Patients", PatientSchema);