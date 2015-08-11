let _rooms = {};
let _idSeed = 0;
/*
  {
    id,
    url,
    users:[
      {
        sessionId,
        username
      }
    ]
  }
 */
export function createRoom(url){
  if(url){
    const key = (++_idSeed).toString(36);
    const room = {
      id: key,
      url,
      users: {}
    };
    _rooms[key] = room;
    return room
  }
}

export function getRoom(id){
  return _rooms[id];
}

export function joinRoom(id, session){
  let room = _rooms[id];
  if(room){
    let orginUsers = room.users;
    room.users = {...orginUsers, [session]: session};
    return room.users;
  }
}

export function leaveRoom(id, session){
  let room = _rooms[id];
  if(room){
    if(room.users[session]) delete room.users[session];
    return room.users;
  }
}

export function changeName(id, session, newName){
  let room = _rooms[id];
  if(room){
    let orginUsers = room.users;
    room.users = {...orginUsers, session: newName};
    return room.users;
  }
}