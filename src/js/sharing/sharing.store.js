const sharing = {

    active: false,

    stream: null,

    videoTrack: null,

    audioTrack: null

};

export function getSharing() {

    return sharing;

}

export function startSharing(stream) {

    sharing.active = true;

    sharing.stream = stream;

    sharing.videoTrack =

        stream.getVideoTracks()[0] || null;

    sharing.audioTrack =

        stream.getAudioTracks()[0] || null;

}

export function stopSharing() {

    sharing.active = false;

    sharing.stream = null;

    sharing.videoTrack = null;

    sharing.audioTrack = null;

}