const listeners = new Map();

export function on(event, callback) {


    if (!listeners.has(event)) {

        listeners.set(event, []);

    }

    listeners.get(event).push(callback);

}

export function emit(event, payload = {}) {


    const callbacks = listeners.get(event);

    if (!callbacks) {

        return;

    }

    for (const callback of callbacks) {

        callback(payload);

    }

}