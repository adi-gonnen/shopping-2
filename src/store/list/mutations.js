
export function getItems (state, payload) {
    state.items = payload;
}

export function setListId (state, payload) {
    state.listId = payload;
}

export function setCategories (state, payload) {
    state.categories = payload;
}

export function setLoading(state, payload) {
    state.loading = payload;
}

export function setError(state, payload) {
    state.error = payload;
}

export function setFullCategories(state, payload) {
    state.fullCategories = payload;
}


