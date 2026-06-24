import { createElement } from "../utils/dom.js";

export default function Badge(text, type = "default") {

    return createElement("span", {

        className: `badge badge-${type}`,

        text

    });

}