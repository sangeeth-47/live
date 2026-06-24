import {

    connectViewer,

    approveViewer as approve,

    rejectViewer as reject

} from "./viewer.service.js";

export function joinRoom(roomId, name) {

    return connectViewer(

        roomId,

        name

    );

}

export function approveViewer(viewerId) {

    return approve(

        viewerId

    );

}

export function rejectViewer(viewerId) {

    return reject(

        viewerId

    );

}