const express = require('express')
var logger = require('morgan');
const db=require('../database/mongoose')
const {port}=require("../config")
const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin')
const app = express()
app.use(logger('dev'));
app.use(express.json());
db.connect()


app.use('/user',userRouter)
app.use('/admin',adminRouter)






app.listen(port,()=>{
    console.log(`server running in port ${port}`);
})