let socket = null;

let connected = false;

let reconnecting = false;

let reconnectAttempts = 0;

function set(ws) {

    socket = ws;

    connected = true;

    reconnecting = false;

    reconnectAttempts = 0;

}

function clear() {

    socket = null;

    connected = false;

}

function get() {

    return socket;

}

function isConnected() {

    return connected;

}

function isReconnecting() {

    return reconnecting;

}

function setReconnecting(value) {

    reconnecting = value;

}

function incrementReconnect() {

    reconnectAttempts++;

}

function reconnectCount() {

    return reconnectAttempts;

}

export default {

    set,

    clear,

    get,

    isConnected,

    isReconnecting,

    setReconnecting,

    incrementReconnect,

    reconnectCount

};