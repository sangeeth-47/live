import { send } from "./sender.js";

let timer = null;

export function start() {

    stop();

    timer = setInterval(() => {

        send("ping");

    }, 30000);

}

export function stop() {

    if (!timer) {

        return;

    }

    clearInterval(timer);

    timer = null;

}