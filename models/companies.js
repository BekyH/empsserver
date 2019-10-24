const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
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
    category:{
        type:String,
        required:true
    }
});
const companies = mongoose.model('Company',companySchema);
module.exports = companies;