import state from "./state.js";

import { mount } from "./view.manager.js";

const routes = new Map();

export function register(name, view) {

    routes.set(name, view);

}

export function show(name, data = {}) {

    const view = routes.get(name);

    if (!view) {

        console.error(`Unknown view: ${name}`);

        return;

    }

    state.ui.currentView = name;

    mount(

        view,

        document.getElementById("app"),

        data

    );

}