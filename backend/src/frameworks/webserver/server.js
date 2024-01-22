const express = require('express')
const dotenv = require('dotenv');
var logger = require('morgan');
dotenv.config();
const app = express()
app.use(logger('dev'));




app.get('/', function (req, res) {
  res.send('Hello World')
})





const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`server running in port ${port}`);
})