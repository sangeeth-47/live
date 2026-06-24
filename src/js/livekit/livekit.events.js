import {

    register

} from "../websocket/event.router.js";

import {

    emit

} from "../eventbus.js";

import {

    setCredentials

} from "./livekit.store.js";

import {

    joinLiveKit

} from "./livekit.actions.js";

register(
    "livekit-ready",
    async payload => {

        setCredentials(
            payload.url,
            payload.token
        );
        console.log("livekit-ready handler", payload);
        emit(
            
            "livekit:ready",
            payload
        );

        try {

            await joinLiveKit();

            emit(
                "livekit:connected"
            );

        }
        catch (error) {

            console.error(error);

        }

    }
);