import config from "../config.js";

import connectionManager
from "./connection.manager.js";

import { dispatch }
from "./event.router.js";

import { valid }
from "./protocol.js";

import * as heartbeat
from "./heartbeat.js";

import "./register.events.js";

let reconnectTimer = null;

export function connect() {

    if (

        connectionManager.isConnected()

    ) {

        return;

    }

    const socket =

        new WebSocket(

            config.websocket.url

        );

    socket.onopen = () => {

        console.log(

            "WebSocket Connected"

        );

        connectionManager.set(socket);

        heartbeat.start();

    };

    socket.onmessage = event => {

        let message;

        try {

            message = JSON.parse(

                event.data

            );

        }

        catch {

            return;

        }

        if (

            !valid(message)

        ) {

            console.warn(

                "Invalid protocol"

            );

            return;

        }
        dispatch(message);

    };

    socket.onerror = error => {

        console.error(error);

    };

    socket.onclose = event => {

        console.log(

            `Disconnected (${event.code})`

        );

        heartbeat.stop();

        connectionManager.clear();

        reconnect();

    };

}

function reconnect() {

    if (

        connectionManager.isReconnecting()

    ) {

        return;

    }

    connectionManager.setReconnecting(true);

    reconnectTimer = setTimeout(() => {

        connectionManager.incrementReconnect();

        connect();

    }, config.reconnect.interval);

}