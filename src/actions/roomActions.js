import {
  ROOM_CREATE,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_LOAD,
  ROOM_LOAD_SUCCESS,
  ROOM_LOAD_FAIL
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
      console.log('fired');
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

