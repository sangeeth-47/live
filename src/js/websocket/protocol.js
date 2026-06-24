export const VERSION = 1;

export function valid(message) {

    if (

        message.version !== VERSION

    ) {

        return false;

    }

    if (

        typeof message.event !== "string"

    ) {

        return false;

    }

    return true;

}