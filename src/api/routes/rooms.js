import * as db from '../db.js';


export function createRoom(req) {
  let url = req.body.url;
  let title = req.body.title;
  if(url){
    if(!/^http:\/\/|https:\/\//.test(url)){
      url = 'http://' + url;
    }
    let room = db.createRoom(url.trim(), title.trim());
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

export function getActive(){
  return Promise.resolve(db.getActive());
}