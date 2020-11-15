export function currentList(state, getters, rootState) {
  const id = state.listId;
  return rootState.user.lists.find(list => {
    return id === list.id;
  });
}
