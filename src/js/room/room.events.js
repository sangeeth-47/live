import { register } from "../websocket/event.router.js";

import { emit } from "../eventbus.js";

import { setRoom } from "./room.store.js";

register(

    "room-created",

    payload => {

        setRoom(payload);

        emit(

            "room:created",

            payload

        );

    }

);

register(

    "error",

    payload => {

        if (payload.code !== "ROOM_ALREADY_EXISTS") {

            return;

        }

        emit(

            "room:error",

            payload

        );

    }

);