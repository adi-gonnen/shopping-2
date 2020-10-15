

export function setAuth (state, payload) {
    state.auth = payload;
}

export function setProfile (state, payload) {
    state.profile = payload;
}

export function getLists (state, payload) {
    state.lists = payload;
}

export function setDefaultList (state, payload) {
    state.defaultListId = payload;
    state.listId = payload;
}


