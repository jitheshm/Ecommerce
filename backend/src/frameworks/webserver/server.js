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

const userBuildPath = path.join(__dirname, '../../../user/dist');
const adminBuildPath = path.join(__dirname, '../../../admin/dist')

app.use(logger('dev'));
app.use(express.json());
const cors = require('cors');
const socketHandler = require('./socketHandler/socketHandler');
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static('public'));
app.use('/', express.static(userBuildPath));
app.use('/adminpanel', express.static(adminBuildPath));

db.connect();
app.use(passport.initialize());

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get("/adminpanel/*", function (req, res) {
  console.log("admin");
  res.sendFile(
    path.join(__dirname, "../../../admin/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/*", function (req, res) {
  console.log("user");
  res.sendFile(
    path.join(__dirname, "../../../user/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
}); // Attach Socket.IO to the HTTP server

// Socket.IO logic
io.on('connection', socket => {
  socketHandler(socket, io)
});

server.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
