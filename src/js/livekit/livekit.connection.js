import {
    Room,
    RoomEvent,
    Track,
    LocalVideoTrack
} from "./livekit.bundle.js";

import { emit } from "../eventbus.js";

import {
    getLiveKit,
    setScreenPublication,
    setScreenAudioPublication
} from "./livekit.store.js";

let room = null;

export function createRoom() {

    if (!room) {

        room = new Room({

            adaptiveStream: false,

            dynacast: false,

            stopLocalTrackOnUnpublish: false

        });

    }

    return room;

}

export function getRoom() {

    return room;

}

export async function connect(url, token) {

    room = createRoom();

    await room.connect(url, token);

    room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {

        emit("livekit:track-subscribed", {

            track,

            publication,

            participant

        });

    });

    room.on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {

        emit("livekit:track-unsubscribed", {

            track,

            publication,

            participant

        });

    });

    room.on(RoomEvent.ParticipantConnected, participant => {

        console.log("Participant Connected:", participant.identity);

    });

    room.on(RoomEvent.ParticipantDisconnected, participant => {

        console.log("Participant Disconnected:", participant.identity);

        emit("livekit:participant-disconnected", {

            identity: participant.identity,

            participant

        });

    });

    setTimeout(() => {
    attachExistingTracks();
    }, 300);

    return room;

}

export async function publishScreenTrack(videoTrack) {
    if (!room) {
        throw new Error("LiveKit room is not connected.");
    }

    const localTrack = new LocalVideoTrack(videoTrack);

    const publication = await room.localParticipant.publishTrack(localTrack, {
        source: Track.Source.ScreenShare,
        simulcast: false,
        videoEncoding: {
            maxBitrate: 50000000,
            maxFramerate: 60
        }
    });

    setScreenPublication(publication);

    return localTrack;
}

export async function publishAudioTrack(audioTrack) {
    if (!room) {
        throw new Error("LiveKit room is not connected.");
    }

    if (!audioTrack) {
        return;
    }

    const publication = await room.localParticipant.publishTrack(audioTrack, {
        source: Track.Source.ScreenShare
    });

    setScreenAudioPublication(publication);
}

export async function unpublishScreenTracks() {

    const state = getLiveKit();

    if (!state.localParticipant) {

        return;

    }

    const publications = [

        state.screenPublication,

        state.screenAudioPublication

    ].filter(Boolean);

    for (const publication of publications) {

        await state.localParticipant.unpublishTrack(publication.track, false);

    }

    setScreenPublication(null);

    setScreenAudioPublication(null);

}

function attachExistingTracks() {

    for (const participant of room.remoteParticipants.values()) {

        for (const publication of participant.trackPublications.values()) {

            if (!publication.track) {

                continue;

            }

            emit("livekit:track-subscribed", {

                track: publication.track,

                publication,

                participant

            });

        }

    }

}

export async function disconnect() {

    if (!room) {

        return;

    }

    room.disconnect();

    room = null;

}

export {

    RoomEvent

};