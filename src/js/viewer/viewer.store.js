const state = {

    pending: new Map(),

    approved: new Map(),

    rejected: new Map()

};

export function getViewers() {

    return state;

}

export function addPending(viewer) {

    state.pending.set(
        viewer.viewerId,
        viewer
    );

}

export function approveViewer(viewerId) {

    const viewer = state.pending.get(viewerId);

    if (!viewer) {

        return;

    }

    state.pending.delete(viewerId);

    state.approved.set(
        viewerId,
        viewer
    );

}

export function rejectViewer(viewerId) {

    const viewer = state.pending.get(viewerId);

    if (!viewer) {

        return;

    }

    state.pending.delete(viewerId);

    state.rejected.set(
        viewerId,
        viewer
    );

}

export function removeViewer(viewerId) {

    state.pending.delete(viewerId);

    state.approved.delete(viewerId);

    state.rejected.delete(viewerId);

}