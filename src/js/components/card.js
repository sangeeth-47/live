import Component from "./component.js";

import { createElement } from "../utils/dom.js";

export default class Card extends Component {

    constructor(title = "") {

        super();

        this.title = title;

    }

    render() {

        const card = createElement("div", {

            className: "card"

        });

        if (this.title) {

            card.append(

                createElement("h2", {

                    text: this.title

                })

            );

        }

        return card;

    }

}