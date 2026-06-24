import { register } from "../router.js";

import { on } from "../eventbus.js";

import Layout from "./viewer.layout.js";

import state from "../state.js";

import { ViewerState } from "./viewer.state.js";

import { joinRoom } from "./viewer.actions.js";

import { Track } from "./livekit.bundle.js";

let pendingVideoTrack = null;

let pendingAudioTrack = null;

const viewerView = {

    root: null,

    content: null,

    stage: ViewerState.JOIN,

    mount(container) {

        this.root = Layout.create();

        container.replaceChildren(this.root);

        this.content = this.root.querySelector("#viewer-content");

        on("viewer:waiting", () => {

            this.showWaiting();

        });

        on("viewer:approved", () => {

            this.showApprovedWaiting();

        });

        on("viewer:rejected", () => {

            this.showRejected();

        });

        on("livekit:ready", () => {

            this.showConnecting();

        });

        on("livekit:connected", () => {

            if (pendingVideoTrack) {

                this.showWatching();

            }
            else {

                this.showShareWaiting();

            }

        });

        on("livekit:track-subscribed", ({ track, publication }) => {

            if (publication.source === Track.Source.ScreenShare) {

                pendingVideoTrack = track;

                if (this.content.querySelector("#viewer-video")) {

                    this.attachVideo();

                }
                else {

                    this.showWatching();

                }

            }
            else if (publication.source === Track.Source.ScreenShareAudio) {

                pendingAudioTrack = track;

                this.attachAudio();

            }

        });

        on("livekit:track-unsubscribed", ({ publication }) => {

            if (publication.source === Track.Source.ScreenShare) {

                pendingVideoTrack = null;

                const video = document.querySelector("#viewer-video");

                if (video) {

                    video.srcObject = null;

                }

                this.showShareWaiting();

            }
            else if (publication.source === Track.Source.ScreenShareAudio) {

                pendingAudioTrack = null;

                const audio = document.querySelector("#viewer-audio");

                if (audio) {

                    audio.srcObject = null;

                }

            }

        });

        this.showJoin();

    },

    unmount() {

    },

    setStage(stage) {

        this.stage = stage;

    },

    attachVideo() {

        if (!pendingVideoTrack) {

            return;

        }

        const video = document.querySelector("#viewer-video");

        if (!video) {

            return;

        }

        pendingVideoTrack.attach(video);

    },

    attachAudio() {

        if (!pendingAudioTrack) {

            return;

        }

        const audio = document.querySelector("#viewer-audio");

        if (!audio) {

            return;
        }

        pendingAudioTrack.attach(audio);

    },

    showJoin() {

        this.setStage(ViewerState.JOIN);

        this.content.innerHTML = `

            <section class="viewer-card viewer-card--join">

                <div class="viewer-badge">Join session</div>

                <h1>Watch the presenter live</h1>

                <p>

                    Enter your name to request access to the session.

                </p>

                <div class="viewer-form">

                    <input
                        id="viewer-name"
                        type="text"
                        maxlength="40"
                        placeholder="Your name"
                        autocomplete="name"
                    >

                    <button id="viewer-join">

                        Join Session

                    </button>

                </div>

            </section>

        `;

        const input = this.content.querySelector("#viewer-name");

        const button = this.content.querySelector("#viewer-join");

        input.value = localStorage.getItem("viewerName") || "";

        const submit = () => {

            const name = input.value.trim();

            if (!name) {

                input.focus();

                return;

            }

            localStorage.setItem("viewerName", name);

            joinRoom(state.session.roomId, name);

        };

        button.addEventListener("click", submit);

        input.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                submit();

            }

        });

    },

    showWaiting() {

        this.setStage(ViewerState.WAITING);

        this.content.innerHTML = `

            <section class="viewer-card viewer-card--status">

                <div class="viewer-badge viewer-badge--muted">Waiting</div>

                <div class="viewer-status">

                    <div class="loading-spinner" aria-hidden="true"></div>

                    <h1>Waiting for approval</h1>

                    <p>

                        The presenter will approve your request shortly.

                    </p>

                </div>

            </section>

        `;

    },

    showApprovedWaiting() {

        this.setStage(ViewerState.APPROVED);

        this.content.innerHTML = `

            <section class="viewer-card viewer-card--status">

                <div class="viewer-badge viewer-badge--success">Approved</div>

                <div class="viewer-status">

                    <div class="loading-spinner" aria-hidden="true"></div>

                    <h1>Joining the session</h1>

                    <p>

                        Your access is approved. Waiting for the presenter to share the screen.

                    </p>

                </div>

            </section>

        `;

    },

    showConnecting() {

        this.setStage(ViewerState.CONNECTING);

        this.content.innerHTML = `

            <section class="viewer-card viewer-card--status">

                <div class="viewer-badge viewer-badge--muted">Connecting</div>

                <div class="viewer-status">

                    <div class="loading-spinner" aria-hidden="true"></div>

                    <h1>Connecting to the session</h1>

                    <p>

                        Establishing a secure live connection before the stream begins.

                    </p>

                </div>

            </section>

        `;

    },

    showShareWaiting() {

        this.setStage(ViewerState.WAITING_FOR_SCREEN);

        this.content.innerHTML = `

            <section class="viewer-card viewer-card--status">

                <div class="viewer-badge viewer-badge--live">Ready</div>

                <div class="viewer-status">

                    <div class="viewer-pulse" aria-hidden="true"></div>

                    <h1>Waiting for presenter to share the screen</h1>

                    <p>

                        You are approved and connected. The viewer will open as soon as the presenter starts sharing.

                    </p>

                </div>

            </section>

        `;

    },

    showWatching() {

        this.setStage(ViewerState.WATCHING);

        this.content.innerHTML = `

            <section class="viewer-player">

                <div class="viewer-toolbar">

                    <div class="viewer-badge viewer-badge--live">Live screen share</div>

                    <button id="fullscreen-btn">

                        Full Screen

                    </button>

                </div>

                <div class="viewer-player-shell">

                    <video
                        id="viewer-video"
                        autoplay
                        playsinline
                    ></video>

                    <audio
                        id="viewer-audio"
                        autoplay
                    ></audio>

                </div>

            </section>

        `;

        const video = document.querySelector("#viewer-video");

        const button = document.querySelector("#fullscreen-btn");

        const toggleFullscreen = async () => {

            if (!document.fullscreenElement) {

                await video.requestFullscreen();

            }
            else {

                await document.exitFullscreen();

            }

        };

        button.addEventListener("click", toggleFullscreen);

        video.addEventListener("dblclick", toggleFullscreen);

        document.addEventListener("fullscreenchange", () => {

            button.textContent = document.fullscreenElement

                ? "Exit Full Screen"

                : "Full Screen";

        });

        this.attachVideo();

        this.attachAudio();

    },

    showRejected() {

        this.setStage(ViewerState.REJECTED);

        this.content.innerHTML = `

            <section class="viewer-card viewer-card--status">

                <div class="viewer-badge viewer-badge--danger">Rejected</div>

                <div class="viewer-status">

                    <h1>Request rejected</h1>

                    <p>

                        You may close this page.

                    </p>

                </div>

            </section>

        `;

    }

};

register("viewer", viewerView);

export default viewerView;
