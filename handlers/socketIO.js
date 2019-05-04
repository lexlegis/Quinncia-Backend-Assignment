const http = require('http');
const socketIO = require('socket.io');

let io;

function configure(httpServer) {
  // const httpServer = http.Server(server);
  io = socketIO(httpServer);
  io.on('connection', function(socket){
    console.log('an user connected', socket.id);
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
}

function emitMessage(channel, data) {
  io.emit(channel, data);
}

module.exports = {
  configure: configure,
  emitMessage: emitMessage

}