const express = require('express');
const cors  = require('./cors');
const bodyParser = require('body-parser');
const companies = require('../models/companies');

const companyRouter = express.Router();
companyRouter.use(bodyParser.json());
companyRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { 
    res.sendStatus(200); })
.get((req,res,next)=>{
        companies.find({})
        .then((comps)=>{
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(comps);
        },(err)=>next(err))
        .catch((err)=>next(err))
})
.post((req,res,next)=>{
    companies.create(req.body)
    .then((comp)=>{
        console.log('company added',comp);
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(comp);

    },(err)=>next(err))
    .catch((err)=>next(err))
});
companyRouter.route('/:compId')
.put((req,res,next)=>{
    companies.findByIdAndUpdate(req.params.compId,{
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
    companies.findByIdAndRemove(req.params.compId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err=>next(err)))
    .catch((err)=>next(err))
});
module.exports  = companyRouter;
