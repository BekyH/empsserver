var express = require('express');
const cors = require('./cors');

const bodyparser = require('body-parser');
const Users = require('../models/users');
var userRouter = express.Router();
userRouter.use(bodyparser.json());
userRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { 
  res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{
    Users.find({})
    .then((users)=>{
      res.statusCode = 200;
      res.setHeader('Content-type','application/json');
      res.json(users);

    },(err)=>next(err))
    .catch((err)=>next(err))
  
})
.post(cors.corsWithOptions,(req,res,next)=>{
    Users.create(req.body)
    .then((user)=>{
      console.log('user created',user);
      res.statusCode = 200;
      res.setHeader('Content-type','application/json');
      res.json(user);

    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete((req,res,next)=>{
  Users.remove({})
  .then((user)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(user);
  },(err)=>next(err))
  .catch((err)=>next(err))
})
  

module.exports = userRouter;
