const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
var passport = require('passport');
var cookieParser = require('cookie-parser');
// var session = require('express-session');
const port = 3000;
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/users');
const userRouter = require('./routes/users');
const empRouter = require('./routes/employees');
const url = 'mongodb://localhost:27017/aait';
const connect = mongoose.connect(url);
//for enabling cors

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//app.use(cors);
app.use('/users',userRouter);
app.use('/employees',empRouter);

connect.then((db)=>{
    console.log('connected correctly to the server');
    
}).catch((err)=>{
    console.log(err)
});

const server = http.createServer(app);
server.listen(port,hostname);