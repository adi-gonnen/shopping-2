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
      dispatch("setError", "add");
    }
    dispatch("getItems", parentId);
    commit("setLoading", false);
    return res;
  });
}

export function deleteItem({ state, commit, dispatch }, id) {
  commit("setLoading", true);
  const parentId = state.listId;
  return listService.deleteItem({ id, parentId }).then(res => {
    if (res.status === 400) {
      dispatch("setError", "delete");
    }
    commit("setLoading", false);
  });
}

export function editItem({ state, commit, dispatch }, item) {
  commit("setLoading", true);
  const parentId = state.listId;
  return listService.editItem(item).then(res => {
    if (res.status === 400) {
      dispatch("setError", "edit");
    }
    dispatch("getItems", parentId);
    commit("setLoading", false);
  });
}

export async function editList({ commit, dispatch }, list) {
  commit("setLoading", true);
  listService.editList(list)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "edit");
    });
  commit("setLoading", false);
}

export async function addList({ commit, dispatch }, list) {
  commit("setLoading", true);
  return listService.addList(list).then(res => {
    if (res.status === 400) {
      dispatch("setError", "add");
    }
    commit("setLoading", false);
    return res.data;
  });
}

export function deleteList({ commit, dispatch }, listId) {
  commit("setLoading", true);
  return listService.deleteList(listId).then(res => {
    if (res.status === 400) {
      dispatch("setError", "delete");
    }
    commit("setLoading", false);
  });
}

export function setError({ commit }, error) {
  commit("setError", error);
  setTimeout(() => commit("setError", null), 10000);
}

export function setLoading({ commit }, value) {
  commit("setLoading", value);
}
