import { createElement } from "../utils/dom.js";

export default function Button(label, handler) {

    const button = createElement("button", {

        className: "btn",

        text: label

    });

    button.addEventListener(

        "click",

        handler

    );

    return button;

}