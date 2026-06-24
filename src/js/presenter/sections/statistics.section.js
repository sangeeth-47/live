const section = {};

section.create = function () {

    const div = document.createElement("section");

    div.className = "statistics-section";

    div.innerHTML = `

        <h2>Statistics</h2>

        <ul>

            <li>Resolution : -</li>

            <li>FPS : -</li>

            <li>Latency : -</li>

            <li>Viewers : 0</li>

        </ul>

    `;

    return div;

};

export default section;