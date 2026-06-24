import { emit } from "../eventbus.js";

import {
    captureScreen,
    stopCapture
} from "./sharing.service.js";

import {
    getSharing
} from "./sharing.store.js";

import {
    publishScreenShare,
    publishScreenAudioShare,
    unpublishScreenShare
} from "../livekit/livekit.actions.js";

let isStoppingScreenShare = false;

export async function startScreenSharing() {

    try {

        await captureScreen();

        const sharing = getSharing();

        await publishScreenShare(sharing.videoTrack);

        if (sharing.audioTrack) {

            await publishScreenAudioShare(sharing.audioTrack);

        }

        emit("sharing:started", sharing);

        sharing.videoTrack.onended = () => {

            stopScreenSharing();

        };

    }
    catch (error) {

        if (error.name === "NotAllowedError") {

            return;

        }

        console.error(error);

    }

}

export async function stopScreenSharing() {

    if (isStoppingScreenShare) {

        return;

    }

    isStoppingScreenShare = true;

    try {

        await unpublishScreenShare();

    }
    catch (error) {

        console.error(error);

    }

    stopCapture();

    emit("sharing:stopped");

    isStoppingScreenShare = false;

}