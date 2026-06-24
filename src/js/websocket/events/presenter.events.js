import { register } from "../event.router.js";

import { emit } from "../../eventbus.js";

import {

    setPresenter

} from "../../presenter/presenter.store.js";

register(

    "presenter-connected",

    payload => {

        setPresenter(payload);

        emit(

            "presenter:connected",

            payload

        );

    }

);