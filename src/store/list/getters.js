export function currentList(state, getters, rootState) {
  const id = state.listId;
  const found = rootState.user.lists.find(list => {
    return id === list.id;
  });
  return found;
}
