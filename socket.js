const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('User connected');

  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => { console.log('Listening at 3000');
});
