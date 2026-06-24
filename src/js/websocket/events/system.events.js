import { register } from "../event.router.js";

import state from "../../state.js";

import { connectPresenter } from "../../presenter/presenter.service.js";

import { joinRoom } from "../../viewer/viewer.actions.js";

register("connected", () => {

    if (state.session.role === "presenter") {

        connectPresenter("Sangeeth");

    }

});

register("pong", () => {

});