
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
    state.defaultList = payload;
    state.listId = payload;
}

export function getItems (state, payload) {
    state.items = payload;
}

export function getListId (state, payload) {
    state.listId = payload;
}

// export function markItems(state, payload) {
//     state.markedItems = payload;
// }


