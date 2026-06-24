import { on } from "../../eventbus.js";

import { getViewers } from "../../viewer/viewer.store.js";

import { approveViewer, rejectViewer } from "../../viewer/viewer.actions.js";

const section = {

    element: null,

    body: null

};

section.create = function () {

    const panel = document.createElement("aside");

    panel.className = "pending-section";

    const title = document.createElement("h2");

    title.textContent = "Pending Viewers";

    section.body = document.createElement("div");

    section.body.className = "pending-list";

    panel.append(

        title,

        section.body

    );

    section.element = panel;

    section.render();

    on(

        "viewer:pending",

        () => {

            section.render();

        }

    );

    on(

        "viewer:approved",

        () => {

            section.render();

        }

    );

    on(

        "viewer:rejected",

        () => {

            section.render();

        }

    );

    on(

        "viewer:disconnected",

        () => {

            section.render();

        }

    );

    return panel;

};

section.render = function () {

    section.body.replaceChildren();

    const viewers =

        getViewers();

    if (

        viewers.pending.size === 0

    ) {

        const empty =

            document.createElement("div");

        empty.className =

            "pending-empty";

        empty.textContent =

            "No pending viewers";

        section.body.append(

            empty

        );

        return;

    }

    for (

        const viewer of viewers.pending.values()

    ) {

        section.body.append(

            section.createCard(

                viewer

            )

        );

    }

};

section.createCard = function(viewer) {

    const card = document.createElement("div");

    card.className = "pending-card";

    const name = document.createElement("h3");

    name.textContent = viewer.viewerName;

    const actions = document.createElement("div");

    actions.className = "pending-actions";

    const approve = document.createElement("button");

    approve.textContent = "Approve";

    approve.addEventListener(

        "click",

        () => {
            console.log("Approve clicked", viewer.viewerId);
            approveViewer(

                viewer.viewerId

            );

        }

    );

    const reject = document.createElement("button");

    reject.textContent = "Reject";

    reject.addEventListener(

        "click",

        () => {
            console.log("Reject clicked", viewer.viewerId);
            rejectViewer(

                viewer.viewerId

            );

        }

    );

    actions.append(

        approve,

        reject

    );

    card.append(

        name,

        actions

    );

    return card;

};

export default section;