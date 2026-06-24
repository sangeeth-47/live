const layout = {};

layout.create = function () {

    const root = document.createElement("div");

    root.className = "viewer-layout";

    root.innerHTML = `

        <main class="viewer-main">

            <div id="viewer-content"></div>

        </main>

    `;

    return root;

};

export default layout;