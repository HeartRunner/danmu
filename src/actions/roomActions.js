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
  WORDS_REMOVE
} from './actionTypes';


export function create(url, router) {
  return {
    types: [ROOM_CREATE, ROOM_CREATE_SUCCESS, ROOM_CREATE_FAIL],
    promise: (client) => client.post('/createRoom', {
      data: {
        url
      }
    }),
    onSuccess:(result)=>{
      router.transitionTo(`/${result.id}`)
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

function _connectIO(id) {
  return (dispatch)=> {
    if(!socket) socket = io('http://'+window.location.host+':8087');
    socket.on('connect', function () {
      socket.send({
        type: SOCKET_JOIN_ROOM,
        room: id
      });

      socket.on('message', function (message) {
        console.log('socket.io', message);
        if(message.type===SOCKET_RECV){
          message.key = generateKey();
        }
        dispatch(
          message
        );
      });
    });
  }
}

export function connect(id) {
  return _connectIO(id);
}

export function send(id, message) {
  socket.send({
    type: SOCKET_SEND,
    message
  });
  return {
    type: SOCKET_SEND,
    message
  }
}

export function disconnect() {
  if(socket){
    socket.disconnect();
    socket = null;
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