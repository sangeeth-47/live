let currentView = null;

export function mount(view, container, data = {}) {

    if (currentView?.unmount) {

        currentView.unmount();

    }

    container.replaceChildren();

    currentView = view;

    currentView.mount(container, data);

}

export function current() {

    return currentView;

}