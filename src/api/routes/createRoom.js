let _rooms = [];
let roomCount = 0;

export function createRoom(req) {
    let url = req.body.url;
    if(url){
        roomCount++;
        _rooms.push(url);
        const data = {
            id: roomCount,
            url
        };
        console.log('create room', roomCount, _rooms);
        return Promise.resolve(data);
    }
    else{
        return Promise.reject('Wrong Url');
    }
}

export function getRoom(req) {
    let id = req.query.id;
    if(id){
        let data = {
            id,
            url: _rooms[id-1]
        };
        console.log('get room', id);
        return Promise.resolve(data);
    }
    else{
        return Promise.reject('Wrong Url');
    }
}
