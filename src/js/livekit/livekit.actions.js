import { emit } from "../eventbus.js";

import {
    connectRoom,
    disconnectRoom,
    publishScreen,
    publishScreenAudio,
    unpublishScreenTracks
} from "./livekit.service.js";

export async function joinLiveKit() {

    try {

        const room = await connectRoom();

        emit("livekit:connected", room);

    }
    catch (error) {

        console.error(error);

    }

}

export async function publishScreenShare(videoTrack) {

    try {

        await publishScreen(videoTrack);

        emit("livekit:screen-published");

    }
    catch (error) {

        console.error(error);

    }

}

export async function publishScreenAudioShare(audioTrack) {

    try {

        await publishScreenAudio(audioTrack);

    }
    catch (error) {

        console.error(error);

    }

}

export async function unpublishScreenShare() {

    try {

        await unpublishScreenTracks();

    }
    catch (error) {

        console.error(error);

    }

}

export async function leaveLiveKit() {

    await disconnectRoom();

    emit("livekit:disconnected");

}