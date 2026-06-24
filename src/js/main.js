import "./app.js";

import state from "./state.js";

import { show } from "./router.js";

import { connect } from "./websocket/index.js";

const roomId =

    window.location.pathname.replace(/^\/+/, "");

if (roomId === "") {

    state.session.role = "presenter";

}
else {

    state.session.role = "viewer";

    state.session.roomId = roomId;

}

console.table({

    role: state.session.role,

    room: state.session.roomId

});

show(

    state.session.role

);

connect();