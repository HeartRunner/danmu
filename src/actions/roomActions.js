import {
  ROOM_CREATE,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_LOAD,
  ROOM_LOAD_SUCCESS,
  ROOM_LOAD_FAIL,
  SOCKET_CONNET,
  SOCKET_DISCONNECT,
  SOCKET_SEND,
  SOCKET_RECV,
  SOCKET_JOIN_ROOM,
  WORDS_REMOVE,
  SOCKET_ERROR,
  SOCKET_SOMEONE_DISCONNECTED,
  SOCKET_CHANGE_NAME
} from './actionTypes';

function joinRoom(roomData, dispatch){
  _connect(roomData.id, dispatch);
  if(roomData.title.length) document.title = roomData.title;
}
export function create(url, title,router) {
  return {
    types: [ROOM_CREATE, ROOM_CREATE_SUCCESS, ROOM_CREATE_FAIL],
    promise: (client) => client.post('/createRoom', {
      data: {
        url,
        title
      }
    }),
    onSuccess:(result, dispatch, getState)=>{
      router.transitionTo(`/${result.id}`);
      //joinRoom(result, dispatch);
    }
  };
}

export function getRoom(id) {
  return {
    types: [ROOM_LOAD, ROOM_LOAD_SUCCESS, ROOM_LOAD_FAIL],
    promise: (client) => client.get('/getRoom', {
      params: {
        id
      }
    })
  };
}

export function getActive(router){
  return {
    types: [ROOM_LOAD, ROOM_LOAD_SUCCESS, ROOM_LOAD_FAIL],
    promise: (client) => client.get('/getActive', {

    }),
    onSuccess:(result, dispatch)=>{
      router.transitionTo(`/${result.id}`);
      //joinRoom(result, dispatch);
    }
  };

}

/*

  CLIENT ONLY

 */


let wordsKey = 0;
function generateKey(){
  wordsKey++;
  return wordsKey;
}
const io = __CLIENT__?require('socket.io-client'):undefined;
let socket;

function _connect(id, dispatch){
  if(socket&&!socket.disconnected) return;
  if(socket&&socket.disconnected&&!socket.connected) socket.connect('http://'+window.location.hostname+':8087');
  else {
    socket = io('http://'+window.location.hostname+':8087');
  }
  socket.on('connect', function () {
    socket.send({
      type: SOCKET_JOIN_ROOM,
      room: id
    });

    socket.on('message', (message) => {
      console.log('socket.io', message);
      if(message.type===SOCKET_RECV){
        message.key = generateKey();
      }
      dispatch(
        message
      );
    });
    socket.on('disconnected', (err) => {
      return{
        type: SOCKET_ERROR
      }
    });
  });
}

export function connect(id) {
  return (dispatch)=> {
     return _connect(id, dispatch)
  }
}

export function send(message) {
  socket.send({
    type: SOCKET_SEND,
    message
  });
  return {
    type: SOCKET_SEND,
    message
  }
}

export function changeName(newName) {
  socket.send({
    type: SOCKET_CHANGE_NAME,
    newName
  });
  return {
    type: SOCKET_CHANGE_NAME,
    newName
  }
}

export function disconnect() {
  if(socket){
    socket.disconnect();
    //socket = null;
    console.log('disconnected');
  }
  return{
    type: SOCKET_DISCONNECT
  }
}

export function removeWord(id){
  return {
    type:WORDS_REMOVE,
    id
  }
}