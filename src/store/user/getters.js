export function defaultList(state) {
  if (state.lists) {
    const defaultId = +state.defaultList;
    const found = state.lists.find(list => {
      return defaultId === +list.id;
    });
    return found;
  }
}
