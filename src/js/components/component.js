export default class Component {

    constructor() {

        this.element = null;

    }

    render() {

        throw new Error("render() must be implemented.");

    }

    mount(container) {

        this.element = this.render();

        container.append(this.element);

    }

    remove() {

        this.element?.remove();

    }

}