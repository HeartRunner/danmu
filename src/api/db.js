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
export function createRoom(url, title){
  if(url){
    const key = (++_idSeed).toString(36);
    const room = {
      id: key,
      url,
      title,
      users: {},
      active: false
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
    room.active = true;
    return room.users;
  }
}

export function leaveRoom(id, session){
  let room = _rooms[id];
  if(room){
    if(room.users[session]) delete room.users[session];
    if(!Object.keys(room.users).length) room.active = false;
    return room.users;
  }
}

export function changeName(id, session, newName){
  let room = _rooms[id];
  if(room){
    let orginUsers = room.users;
    room.users = {...orginUsers, [session]: newName};
    return room.users;
  }
}

export function getActive(){
  let activeRoomKey = Object.keys(_rooms).filter((key) => _rooms[key].active);
  if(activeRoomKey.length){
    let index = Math.max(Math.round(Math.random() * activeRoomKey.length)-1, 0);
    return _rooms[activeRoomKey[index]];
  }
  return _rooms[1];
}