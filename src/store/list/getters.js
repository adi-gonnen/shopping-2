
export function defaultList (state) {
    const defaultId = +state.defaultList;
    const found = state.lists.find((list) => {
        return defaultId === +list.id
    })
    return found;
}

