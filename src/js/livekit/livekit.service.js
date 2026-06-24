import {

    connect,

    disconnect,

    getRoom,

    publishScreenTrack,

    publishAudioTrack,

    unpublishScreenTracks as unpublishScreenTracksImpl

} from "./livekit.connection.js";

import {

    getLiveKit,

    setConnection,

    clearConnection

} from "./livekit.store.js";


export async function connectRoom() {

    const state = getLiveKit();

    const room = await connect(

        state.url,

        state.token

    );

    setConnection(room);

    return room;

}

export async function publishScreen(videoTrack) {

    return publishScreenTrack(

        videoTrack

    );

}

export async function publishScreenAudio(audioTrack) {

    return publishAudioTrack(

        audioTrack

    );

}

export async function unpublishScreenTracks() {

    return unpublishScreenTracksImpl();

}

export async function disconnectRoom() {

    await disconnect();

    clearConnection();

}

export function room() {

    return getRoom();

}