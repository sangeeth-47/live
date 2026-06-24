const state = {

    room: null,

    connected: false,

    localParticipant: null,

    screenPublication: null,

    screenAudioPublication: null,

    token: null,

    url: null

};

export function getLiveKit() {

    return state;

}

export function setConnection(room) {

    state.room = room;

    state.connected = true;

    state.localParticipant = room.localParticipant;

}

export function setCredentials(url, token) {

    state.url = url;

    state.token = token;

}

export function setScreenPublication(publication) {

    state.screenPublication = publication;

}

export function setScreenAudioPublication(publication) {

    state.screenAudioPublication = publication;

}

export function clearConnection() {

    state.room = null;

    state.connected = false;

    state.localParticipant = null;

    state.screenPublication = null;

    state.screenAudioPublication = null;

    state.token = null;

    state.url = null;

}