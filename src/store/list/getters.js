export function currentList(state, getters, rootState) {
  const id = state.listId;
  return rootState.user.lists.find(list => {
    return id === list.id;
  });
}

export function categoryList(state, getters, rootState) {
  const items = state.items;
  return items && items.some(item => {
    return item.category;
  });
}
