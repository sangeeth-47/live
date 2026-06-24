import connectionManager from "./connection.manager.js";

import { create } from "./message.js";

export function send(event, payload = {}) {

    const socket = connectionManager.get();

    if (!socket) {

        console.error("No WebSocket instance.");

        return false;

    }

    if (socket.readyState !== WebSocket.OPEN) {

        console.error("WebSocket is not OPEN.");

        return false;

    }

    const message = create(event, payload);

    socket.send(message);

    return true;

}