import { getRoom } from "./room.store.js";

import { requestRoomCreation } from "./room.service.js";

export function createRoom() {

    const room = getRoom();

    if (room.active) {

        console.warn("Room already exists.");

        return;

    }

    requestRoomCreation();

}