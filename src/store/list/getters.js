export function currentList(state, getters, rootState) {
  const id = state.listId;
  return rootState.user.lists?.find((list) => {
    return id === list.id;
  });
}

export function categoryList(state) {
  // return true if at list one item has category
  const items = state.items;
  return items?.some((item) => {
    return item.category;
  });
}
