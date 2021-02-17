const mongoose = require("mongoose");
autoIncrement = require('mongoose-auto-increment');

const CasesSchema = mongoose.Schema({
    caseId:Number,
    pId:Number,
    dId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'   
    },
    caseDate:Date,
    majorDiease:String,
    note:String,
});

autoIncrement.initialize(mongoose.connection);
CasesSchema.plugin(autoIncrement.plugin, {
    model: 'Cases',
    field: 'caseId',
    startAt: 0,
    incrementBy: 1
});

// export model patient with PatientSchema
module.exports = mongoose.model("Cases", CasesSchema);