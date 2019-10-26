const express = require('express');
const cors  = require('./cors');
const bodyParser = require('body-parser');
const employees = require('../models/employees');

const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());
employeeRouter.route('/')
// .options(cors.corsWithOptions, (req, res) => { 
//     res.sendStatus(200); })
.get((req,res,next)=>{
        employees.find({})
        .then((emps)=>{
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(emps);
        },(err)=>next(err))
        .catch((err)=>next(err))
})
.post((req,res,next)=>{
    employees.create(req.body)
    .then((emp)=>{
        console.log('employee added',emp);
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(emp);

    },(err)=>next(err))
    .catch((err)=>next(err))
});
employeeRouter.route('/:empId')
.put((req,res,next)=>{
    companies.findByIdAndUpdate(req.params.empId,{
        $set:req.body
    },{new:true})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(er))
})
.delete((req,res,next)=>{
    companies.findByIdAndRemove(req.params.empId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err=>next(err)))
    .catch((err)=>next(err))
});
module.exports  = employeeRouter;
