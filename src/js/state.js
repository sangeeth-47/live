const state = {

    session: {

        role: null,

        roomId: null

    },

    websocket: {

        connected: false,

        socket: null

    },

    livekit: {

        room: null,

        connected: false

    },

    presenter: {

        id: null,

        name: null

    },

    viewer: {

        id: null,

        name: null

    },

    stream: {

        mediaStream: null,

        videoTrack: null

    },

    statistics: {

        viewers: 0,

        fps: 0,

        latency: 0,

        resolution: ""

    },

    ui: {

        currentView: "loading",

        fullscreen: false,

        theme: "system"

    }

};

export default state;