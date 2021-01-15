export function defaultList(state) {
  if (state.lists) {
    const defaultId = +state.defaultListId;
    return state.lists.find(list => {
      return defaultId === +list.id;
    });
  }
}
