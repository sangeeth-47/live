import { register } from "../router.js";

import LayoutManager from "./layout.manager.js";

import { on } from "../eventbus.js";

const presenterView = {

    mount(container) {

        const layout =

            new LayoutManager(container);

        layout.create();

    },

    unmount() {

    }

};

register(

    "presenter",

    presenterView

);

export default presenterView;