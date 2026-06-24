import { register } from "../router.js";

const loadingView = {

    mount(container) {

        container.innerHTML = `

            <div class="loading-screen">

                <div class="loading-spinner"></div>

                <h1>ScreenShare</h1>

                <p>Initializing...</p>

            </div>

        `;

    },

    unmount() {

        console.log(

            "Loading View Unmounted"

        );

    }

};

register(

    "loading",

    loadingView

);