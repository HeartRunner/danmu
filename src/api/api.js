import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
import * as actions from './routes/index';
import PrettyError from 'pretty-error';
import socketio from 'socket.io';
import * as db from './db';

const pretty = new PrettyError();
const app = express();
/*

  SOCKET.IO SHIT

 */
let io = socketio(8087);
io.on('connection', function (socket) {
  socket.emit('message', {
    type: 'SOCKET_CONNECT_SUCCESS'
  });
  socket.on('message', (data)=>{
    console.log('socket', data);
    switch(data.type){
      case 'SOCKET_JOIN_ROOM':  //join a room
        if(socket.room) socket.leave(socket.room);
        //TODO EMIT ROOM INFO
        let users = db.joinRoom(data.room, socket.id);
        if(users){
          socket.join(data.room);
          socket.room = data.room;
          io.sockets.in(socket.room).emit('message', {
            type: 'SOCKET_JOIN_ROOM_SUCCESS',
            users
          });
        }
        else {
          socket.emit('message', {
            type: 'SOCKET_JOIN_ROOM_FAIL'
          });
        }
        break;

      case 'SOCKET_SEND': //user send
        io.sockets.in(socket.room).emit('message',{
          type: 'SOCKET_RECV',
          message: data.message
        });
        break;

      case 'SOCKET_CHANGE_NAME':
        let users = db.changeName(socket.room, socket.id, data.newName);
        if(users){
          io.sockets.in(socket.room).emit('message', {
            type: 'SOCKET_CHANGE_NAME_SUCCESS',
            users
          });
        }
        else {
          socket.emit('message', {
            type: 'SOCKET_CHANGE_NAME_FAIL'
          });
        }
    }
  });
  socket.on('disconnect',  () => {
    console.log('fucking disconnect', socket.room);
    if(socket.room){
      let users = db.leaveRoom(socket.room, socket.id);
      io.sockets.in(socket.room).emit('message',{
        type: 'SOCKET_SOMEONE_DISCONNECTED',
        users
      });
      socket.leave(socket.room);
      socket.room = null;

    }
  });
  socket.on('error', (err)=>{
    console.log(err);
  });
});

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

export default function api() {
  return new Promise((resolve) => {
    app.use((req, res) => {
      let matcher = req.url.split('/');
      let action = matcher && actions[matcher[1].split('?')[0]];
      if (action) {
        action(req, matcher.slice(2))
          .then((result) => {
            res.json(result);
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect);
            } else {
              console.error('API ERROR:', req.url, pretty.render(reason));
              res.status(reason.status || 500).json(reason);
            }
          });
      } else {
        res.status(404).end('NOT FOUND');
      }
    });
    app.listen(config.apiPort);
    resolve();
  });
}
