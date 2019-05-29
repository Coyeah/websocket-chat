const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  port = 3000;

app.use('/', express.static(__dirname + '/dist'));

io.on('connection', function (socket) {
  console.log('client connected!');

  socket.on('user-login', function (username) {
    console.log(`${username} is login`);
    io.emit('login', {
      username,
      status: 1,
      msg: `${username}登入聊天室`
    });
  });
  socket.on('user-send', function (data) {
    io.emit('message', data);
  });

  socket.on('disconnect', function () {
    console.log('client disconnected');
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server is work at localhost:${port}`);
})
