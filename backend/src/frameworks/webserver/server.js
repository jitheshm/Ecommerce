const express = require('express')
var logger = require('morgan');
const db = require('../database/mongoose')
const { port } = require("../config")
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const passport = require('../middlewares/passport')
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express()
// const userBuildPath = path.join(__dirname, "../../../../frontend/user/dist");
// const adminBuildPath = path.join(__dirname, "../../../../frontend/admin/dist")
app.use(logger('dev'));
app.use(express.json());
var cors = require('cors')


app.use(cors()) // Use this after the variable declaration 
app.use(fileUpload());
app.use('/public', express.static('public'));

db.connect()
app.use(passport.initialize());

// app.use('/', express.static(userBuildPath));
// app.use('/adminpanel', express.static(adminBuildPath));

app.use('/user', userRouter)
app.use('/admin', adminRouter)

// app.get("/adminpanel*", function (req, res) {
//     res.sendFile(
//         path.join(__dirname, "../../../../frontend/admin/dist/index.html"),
//         function (err) {
//             if (err) {
//                 res.status(500).send(err);
//             }
//         }
//     );
// });

// app.get("/*", function (req, res) {
//     res.sendFile(
//         path.join(__dirname, "../../../../frontend/user/dist/index.html"),
//         function (err) {
//             if (err) {
//                 res.status(500).send(err);
//             }
//         }
//     );
// });






app.listen(port, () => {
    console.log(`server running in port ${port}`);
})