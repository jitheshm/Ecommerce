const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const logger = require('morgan');
const db = require('../database/mongoose');
const { port } = require("../config");
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const passport = require('../middlewares/passport');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(logger('dev'));
app.use(express.json());
const cors = require('cors');
const socketHandler = require('./socketHandler/socketHandler');
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static('public'));

db.connect();
app.use(passport.initialize());

app.use('/user', userRouter);
app.use('/admin', adminRouter);

const server = http.createServer(app); // Create HTTP server
const io = socketIo(server,{
    cors: {
      origin: '*',
    }
  }); // Attach Socket.IO to the HTTP server

// Socket.IO logic
io.on('connection', socket=>{
  socketHandler(socket,io)
});

server.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
