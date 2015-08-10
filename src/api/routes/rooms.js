import * as db from '../db.js';


export function createRoom(req) {
  let url = req.body.url;
  if(url){
    let room = db.createRoom(url);
    console.log('create room', room);
    return Promise.resolve(room);
  }
  else{
    return Promise.reject('Wrong Url');
  }
}

export function getRoom(req) {
  let id = req.query.id;
  let room = db.getRoom(id);
  if(room){
    return Promise.resolve(room);
  }
  else{
    return Promise.reject('Not Found');
  }
}
