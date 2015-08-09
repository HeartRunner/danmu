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
} from '../actions/actionTypes';

const initialState = {
  loaded: false,
  words: {}
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case ROOM_CREATE:
      return {
        ...state,
        loadingCreate: true,
        createErr: ''
      };
    case ROOM_CREATE_SUCCESS:
      return{
        ...state,
        loadingCreate: false,
        roomData: action.result,
        createErr: '',
        loaded: true
      };
    case ROOM_CREATE_FAIL:
      return{
        ...state,
        loadingCreate: false,
        createErr: action.error
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
        loadErr: action.error
      };
    case SOCKET_RECV:
      console.log('SOCKET_RECV', action.message);
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
    default:
      return state;
  }
}

export function isRoomLoaded(globalState) {
  return globalState.room && globalState.room.loaded;
}