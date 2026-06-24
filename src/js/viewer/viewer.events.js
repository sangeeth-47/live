import { register } from "../websocket/event.router.js";

import { emit, on } from "../eventbus.js";

import {

    addPending,

    approveViewer,

    rejectViewer,

    removeViewer

} from "./viewer.store.js";

register(

    "viewer-request",

    payload => {

        addPending(payload);

        emit(

            "viewer:pending",

            payload

        );

    }

);

register(

    "viewer-approved",

    payload => {
        console.log("viewer-approved handler", payload);
        approveViewer(

            payload.viewerId

        );
        console.log("store updated");
        emit(

            "viewer:approved",

            payload

        );
        console.log("event emitted");
    }

);

register(

    "viewer-rejected",

    payload => {

        console.log("viewer-rejected handler", payload);

        rejectViewer(

            payload.viewerId

        );

        emit(

            "viewer:rejected",

            payload

        );

    }

);

register(

    "viewer-waiting",

    payload => {

        emit(

            "viewer:waiting",

            payload

        );

    }

);

on(

    "livekit:participant-disconnected",

    payload => {

        removeViewer(

            payload.identity

        );

        emit(

            "viewer:disconnected",

            payload

        );

    }

);