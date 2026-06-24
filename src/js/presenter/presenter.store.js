const presenter = {

    id: null,

    name: null,

    connected: false

};

export function getPresenter() {

    return presenter;

}

export function setPresenter(data) {

    presenter.id = data.presenterId;

    presenter.name = data.presenterName;

    presenter.connected = true;

}

export function clearPresenter() {

    presenter.id = null;

    presenter.name = null;

    presenter.connected = false;

}