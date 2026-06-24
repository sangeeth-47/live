import { send } from "../websocket/sender.js";

export function connectPresenter(name) {

    send(

        "presenter-connect",

        {

            name

        }

    );

}