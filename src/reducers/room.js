import {
  ROOM_CREATE,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_LOAD,
  ROOM_LOAD_SUCCESS,
  ROOM_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false
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
    default:
      return state;
  }
}

export function isRoomLoaded(globalState) {
  return globalState.room && globalState.room.loaded;
}