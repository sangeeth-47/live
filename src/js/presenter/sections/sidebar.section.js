import { on } from "../../eventbus.js";

import { createRoom } from "../../room/room.actions.js";

import { getRoom } from "../../room/room.store.js";

import { startScreenSharing } from "../../sharing/sharing.actions.js";

import { stopScreenSharing } from "../../sharing/sharing.actions.js";

const section = {

    element: null,

    roomId: null,

    joinUrl: null,

    createButton: null,

    startShareButton: null,

    stopShareButton: null

};

async function copyToClipboard(text) {

    if (navigator.clipboard?.writeText) {

        await navigator.clipboard.writeText(text);

        return;

    }

    const textarea = document.createElement("textarea");

    textarea.value = text;

    textarea.setAttribute("readonly", "true");

    textarea.style.position = "absolute";

    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);

}

section.create = function () {
    
    const sidebar = document.createElement("aside");

    sidebar.className = "sidebar-section";

    const title = document.createElement("h2");
    title.textContent = "Room";

    const roomIdLabel = document.createElement("label");
    roomIdLabel.textContent = "Room ID";

    section.roomId = document.createElement("div");
    section.roomId.className = "room-value";
    section.roomId.textContent = "-";

    const joinUrlLabel = document.createElement("label");
    joinUrlLabel.textContent = "Join URL";

    section.joinUrl = document.createElement("div");
    section.joinUrl.className = "room-value room-value--url";

    const joinUrlText = document.createElement("span");
    joinUrlText.className = "room-value__text";
    joinUrlText.textContent = "-";

    section.joinUrlCopy = document.createElement("button");
    section.joinUrlCopy.type = "button";
    section.joinUrlCopy.className = "room-value__copy";
    section.joinUrlCopy.textContent = "Copy";
    section.joinUrlCopy.disabled = true;

    section.joinUrl.append(

        joinUrlText,

        section.joinUrlCopy

    );

    section.createButton = document.createElement("button");
    section.createButton.textContent = "Create Room";

    section.startShareButton = document.createElement("button");
    section.startShareButton.textContent = "Start Sharing";
    section.startShareButton.disabled = true;

    section.stopShareButton = document.createElement("button");
    section.stopShareButton.textContent = "Stop Sharing";
    section.stopShareButton.disabled = true;

    section.createButton.addEventListener("click", () => {

        section.createButton.disabled = true;

        createRoom();

    })

    section.joinUrlCopy.addEventListener("click", async () => {

        const url = section.joinUrl.dataset.url;

        if (!url) {

            return;

        }

        try {

            await copyToClipboard(url);

            section.joinUrl.dataset.copied = "true";

            section.joinUrlCopy.textContent = "Copied";

            window.setTimeout(() => {

                section.joinUrl.dataset.copied = "false";

                section.joinUrlCopy.textContent = "Copy";

            }, 1200);

        }
        catch (error) {

            console.error(error);

        }

    });
    
    section.startShareButton.addEventListener("click", async () => {

    try {

        await startScreenSharing();

    }

    catch (error) {

        console.error(error);

    }

});

    sidebar.append(

        title,

        roomIdLabel,
        section.roomId,

        joinUrlLabel,
        section.joinUrl,

        section.createButton,

        section.startShareButton,

        section.stopShareButton

    );

    section.element = sidebar;


    on("room:created", (payload) => {

        section.update();

    });

    on("room:error", (payload) => {

        console.log("room:error received", payload);

    });

    on("sharing:started", () => {

        section.updateSharing();

    });

    on("sharing:stopped", () => {

        section.resetSharing();

    });


    section.stopShareButton.addEventListener(

    "click",

    () => {

        stopScreenSharing();

    }

);
    return sidebar;

};

section.update = function () {

    const room = getRoom();

    section.roomId.textContent = room.id;
    section.joinUrl.dataset.url = room.joinUrl;
    section.joinUrl.querySelector(".room-value__text").textContent = room.joinUrl;
    section.joinUrlCopy.disabled = false;

    section.createButton.disabled = true;
    section.startShareButton.disabled = false;

};

section.destroy = function () {

};

section.updateSharing = function () {

    section.startShareButton.disabled = true;

    section.stopShareButton.disabled = false;

};

section.resetSharing = function () {

    section.startShareButton.disabled = false;

    section.stopShareButton.disabled = true;

};

export default section;