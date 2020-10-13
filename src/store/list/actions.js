import listService from "./service";

export async function getItems({ state, commit }, parentId = state.listId) {
  const items = (await listService.getItems(parentId)) || [];
  commit("getItems", items);
  commit("getListId", parentId);
}

export async function addNewItem({ state, commit, dispatch }, item) {
  commit("setLoading", true);
  const parentId = state.listId;
  const newItem = { ...item, parentId };
  return await listService.addItem(newItem).then(res => {
    if (res.status === 400) {
      commit("setError", "add");
      setTimeout(() => commit("setError", null), 10000 )
    }
    dispatch("getItems", parentId);
    commit("setLoading", false);
    return res;
  });
}

export function deleteItem({ state, commit }, id) {
  commit("setLoading", true);
  const parentId = state.listId;
  return listService.deleteItem({ id, parentId }).then(res => {
    if (res.status === 400) {
      commit("setError", "delete");
      setTimeout(() => commit("setError", null), 10000 )
    }
  });
}

export function editItem({ state, commit, dispatch }, item) {
  commit("setLoading", true);
  const parentId = state.listId;
  return listService.editItem(item).then(res => {
    if (res.status === 400) {
      commit("setError", "edit");
      setTimeout(() => commit("setError", null), 10000 )
    }
    dispatch("getItems", parentId);
    commit("setLoading", false);
  });
}

export function setLoading({ commit }, value) {
  commit("setLoading", value);
}
