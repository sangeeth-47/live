import {

    startSharing,

    stopSharing,

    getSharing

} from "./sharing.store.js";

export async function captureScreen() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                frameRate: {
                    ideal: 60,
                    max: 60
                }
            },
            audio: true
        });

        startSharing(stream);
        return stream;
    } catch (err) {
        console.error("Screen capture failed:", err);
        console.error("Name:", err.name);
        console.error("Message:", err.message);
        console.error("Stack:", err.stack);

        alert(
            `Screen capture failed\n\n` +
            `Name: ${err.name}\n` +
            `Message: ${err.message}`
        );

        throw err;
    }
}

export function stopCapture() {

    const sharing =

        getSharing();

    if (!sharing.stream) {

        return;

    }

    sharing.stream

        .getTracks()

        .forEach(track =>

            track.stop()

        );

    stopSharing();

}