const mongoose = require("mongoose");
const Patients = require("./Patients");

const DoctorToPatientSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
});

// export model user with UserSchema
module.exports = mongoose.model("DoctorToPatient", DoctorToPatientSchema);