
const express = require('express');
var router = express.Router();
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {

    cors: {

        origin:  "*",
        methods: [ "GET" , "POST" ]
    }
})
const path = require('path');






io.on('connection', (socket) => {
  sid=socket.id;
  io.to(socket.id).emit("sid",socket.id);

  console.log(socket.id+" :user connected");
  socket.on('disconnect', () => {
    console.log(socket.id+'user disconnected');
  }

);

  

  


 socket.on('chat message', (msg,p) => {
  
  io.emit('chat message',p+":" + msg);
  
 });





 

 
 
});

var device = require('express-device');
app.use(device.capture());




app.get('/st2.css', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/st2.css'));
})


app.get('/st.css', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/st.css'));
})
app.get('/particle.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/particle.js'));
})


app.get('/index', function (req, res) {
  if(req.device.type.toUpperCase()=="PHONE")

  res.sendFile(path.join(__dirname, '/index.html'));
  else 
  res.sendFile(path.join(__dirname, '/index2.html'));
})



server.listen(process.env.PORT || 3000, () => { console.log("connect") });
//server.listen(5000, () => { console.log("connect") })
