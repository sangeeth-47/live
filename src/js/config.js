const config = {

    appName: "ScreenShare",

    websocket: {

        url:

            `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws`

    },

    livekit: {

        url: "https://liveapi.sangeeth47.in"

    },

    reconnect: {

        interval: 3000,

        maxAttempts: Infinity

    },

    ui: {

        theme: "system"

    }

};

export default config;