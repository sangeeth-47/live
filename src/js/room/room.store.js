const room = {

    id: null,

    joinUrl: null,

    created: null,

    expiresAt: null,

    active: false

};

export function getRoom() {

    return room;

}

export function setRoom(payload) {

    room.id = payload.roomId;

    room.joinUrl = payload.joinUrl;

    room.created = payload.created;

    room.expiresAt = payload.expiresAt;

    room.active = true;

}

export function clearRoom() {

    room.id = null;

    room.joinUrl = null;

    room.created = null;

    room.expiresAt = null;

    room.active = false;

}