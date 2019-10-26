const express = require('express');
const cors  = require('./cors');
const bodyParser = require('body-parser');
const companies = require('../models/companies');

const companyRouter = express.Router();
companyRouter.use(bodyParser.json());
companyRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { 
    res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
        companies.find({})
        .then((comps)=>{
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(comps);
        },(err)=>next(err))
        .catch((err)=>next(err))
})
.post(cors.corsWithOptions,(req,res,next)=>{
    companies.create(req.body)
    .then((comp)=>{
        console.log('company added',comp);
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(comp);

    },(err)=>next(err))
    .catch((err)=>next(err))
});
module.exports  = companyRouter;
