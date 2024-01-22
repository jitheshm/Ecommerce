const express = require('express')
var logger = require('morgan');
const db=require('../database/mongoose')
const {port}=require("../config")

const app = express()
app.use(logger('dev'));
db.connect()



app.get('/', function (req, res) {
  res.send('Hello World')
})






app.listen(port,()=>{
    console.log(`server running in port ${port}`);
})