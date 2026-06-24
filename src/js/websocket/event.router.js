const routes = new Map();

export function register(event, handler) {

    if (!routes.has(event)) {

        routes.set(event, []);

    }

    routes.get(event).push(handler);

}

export function dispatch(message) {

    const handlers = routes.get(message.event);

    if (!handlers || handlers.length === 0) {

        console.warn(`Unhandled event: ${message.event}`);

        return;

    }

    for (const handler of handlers) {

        try {

            handler(message.payload, message);

        }

        catch (error) {

            console.error(error);

        }

    }

}