import { send } from "../websocket/sender.js";

export function requestRoomCreation() {

    return send(

        "create-room",

        {}

    );

}