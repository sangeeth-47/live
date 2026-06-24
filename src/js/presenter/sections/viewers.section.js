import { on } from "../../eventbus.js";

import { getViewers } from "../../viewer/viewer.store.js";

const section = {

    element: null,

    body: null,

    count: null

};

section.create = function () {

    const div = document.createElement("section");

    div.className = "viewers-section";

    const header = document.createElement("div");

    header.className = "viewers-header";

    const title = document.createElement("h2");

    title.textContent = "Connected Viewers";

    section.count = document.createElement("span");

    section.count.className = "viewers-count";

    section.count.textContent = "0";

    header.append(

        title,

        section.count

    );

    section.body = document.createElement("div");

    section.body.className = "viewers-list";

    div.append(

        header,

        section.body

    );

    section.element = div;

    section.render();

    on("viewer:pending", () => {

        section.render();

    });

    on("viewer:approved", () => {

        section.render();

    });

    on("viewer:rejected", () => {

        section.render();

    });

    on("viewer:disconnected", () => {

        section.render();

    });

    return div;

};

section.render = function () {

    if (!section.body || !section.count) {

        return;

    }

    section.body.replaceChildren();

    const viewers = getViewers();

    const connectedViewers = Array.from(viewers.approved.values());

    section.count.textContent = String(connectedViewers.length);

    if (connectedViewers.length === 0) {

        const empty = document.createElement("div");

        empty.className = "viewers-empty";

        empty.textContent = "No viewers connected yet";

        section.body.append(empty);

        return;

    }

    for (const viewer of connectedViewers) {

        section.body.append(section.createCard(viewer));

    }

};

section.createCard = function (viewer) {

    const card = document.createElement("article");

    card.className = "viewer-card";

    const name = document.createElement("h3");

    name.textContent = viewer.viewerName;

    const meta = document.createElement("p");

    meta.textContent = `Viewer ID: ${viewer.viewerId}`;

    const status = document.createElement("span");

    status.className = "viewer-card-status";

    status.textContent = "Connected";

    card.append(

        name,

        meta,

        status

    );

    return card;

};

export default section;