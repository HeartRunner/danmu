import {
  ROOM_CREATE,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_LOAD,
  ROOM_LOAD_SUCCESS,
  ROOM_LOAD_FAIL,
  SOCKET_CONNET,
  SOCKET_CONNECT_SUCCESS,
  SOCKET_CONNECT_FAIL,
  SOCKET_DISCONNECT,
  SOCKET_SEND,
  SOCKET_RECV,
  SOCKET_JOIN_ROOM,
  SOCKET_JOIN_ROOM_SUCCESS,
  SOCKET_JOIN_ROOM_FAIL,
  SOCKET_CHANGE_NAME_SUCCESS,
  SOCKET_ERROR,
  WORDS_REMOVE,
  SOCKET_SOMEONE_DISCONNECTED
} from '../actions/actionTypes';

const initialState = {
  loaded: false,
  words: {},
  connected: false
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case SOCKET_RECV:
      let words = state.words;
      let newMessage = {};
      newMessage[action.key] = action.message;
      return {
        ...state,
        words: Object.assign({}, words, newMessage)
      };
    case WORDS_REMOVE:
      let words = Object.assign({}, state.words);
      delete words[action.id];
      return {
        ...state,
        words
      };

    case ROOM_CREATE:
      return {
        ...state,
        loadingCreate: true,
        createError: ''
      };
    case ROOM_CREATE_SUCCESS:
      return{
        ...state,
        loadingCreate: false,
        roomData: action.result,
        createError: '',
        loaded: true
      };
    case ROOM_CREATE_FAIL:
      return{
        ...state,
        loadingCreate: false,
        createError: action.error
      };
    case ROOM_LOAD:
      return {
        ...state,
        loadErr: ''
      };
    case ROOM_LOAD_SUCCESS:
      return{
        ...state,
        roomData: action.result,
        loadErr: '',
        loaded: true
      };
    case ROOM_LOAD_FAIL:
      return{
        ...state,
        loadErr: action.error,
        loaded: true
      };
    case SOCKET_CONNECT_SUCCESS:
      return {
        ...state,
        connected: true
      };
    case SOCKET_JOIN_ROOM_SUCCESS:
    case SOCKET_CHANGE_NAME_SUCCESS:
    case SOCKET_SOMEONE_DISCONNECTED:
      return {
        ...state,
        users: action.users
      };


    case SOCKET_DISCONNECT:
      return {
        ...state,
        users: {},
        connected: false
      }

     case SOCKET_ERROR:
      return {
        ...state,
        connected: false
      }

    default:
      return state;
  }
}

export function isRoomLoaded(globalState) {
  return globalState.room && globalState.room.loaded;
}