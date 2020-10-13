
export function getItems (state, payload) {
    state.items = payload;
}

export function getListId (state, payload) {
    state.listId = payload;
}

export function setLoading(state, payload) {
    state.loading = payload;
}

export function setError(state, payload) {
    state.error = payload;
}


