import { on } from "../../eventbus.js";

import { getPresenter } from "../presenter.store.js";

const section = {

    root: null,

    connection: null,

    presenter: null

};

section.create = function () {

    const header = document.createElement("header");

    header.className = "header-section";

    const left = document.createElement("div");
    left.className = "header-left";

    const logo = document.createElement("h1");
    logo.className = "header-logo";
    logo.textContent = "ScreenShare";

    left.append(logo);

    const right = document.createElement("div");
    right.className = "header-right";

    section.connection = document.createElement("div");
    section.connection.className = "connection-status";
    section.connection.textContent = "Connecting...";

    section.presenter = document.createElement("div");
    section.presenter.className = "presenter-name";
    section.presenter.textContent = "";

    right.append(

        section.connection,

        section.presenter

    );

    header.append(

        left,

        right

    );

    section.root = header;

    on(

        "presenter:connected",

        section.update

    );

    return header;

};

section.update = function () {

    const presenter =

        getPresenter();

    section.connection.textContent =

        "● Connected";

    section.presenter.textContent =

        presenter.name;

};

section.destroy = function () {

};

export default section;