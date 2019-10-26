const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true

    },
    address:{
        type:String,
        required:true
    }
});
const employees = mongoose.model('Employee',employeeSchema);
module.exports = employees;