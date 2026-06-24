export function create(

    event,

    payload = {}

) {

    return JSON.stringify({

        version: 1,

        event,

        payload

    });

}