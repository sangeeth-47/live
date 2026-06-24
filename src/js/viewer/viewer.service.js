import { send } from "../websocket/sender.js";

export function connectViewer(roomId, name) {

    return send("viewer-connect", {

        roomId,

        name

    });

}

export function approveViewer(viewerId) {
    console.log("viewer.service approve", viewerId);
    return send("approve-viewer", {

        viewerId

    });

}

export function rejectViewer(viewerId) {
    console.log("viewer.service reject", viewerId);
    return send("reject-viewer", {

        viewerId

    });

}