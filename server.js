const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  port = 3000;

app.use('/', express.static(__dirname + '/dist'));

io.on('connection', function (socket) {
  console.log('client connected!');
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server is work at "localhost:${port}"`);
})
