import listService from "./service";

export async function getItems({ state, commit }, parentId = state.listId) {
  const items = await listService.getItems(parentId) || [];
  commit("getItems", items);
  commit("getListId", parentId);
}

export async function addNewItem({ state, commit, dispatch }, item) {
  commit("setLoading", true);
  const parentId = state.listId;
  const newItem = { ...item, parentId };
  const req = await listService.addItem(newItem)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "add");
    });
  commit("setLoading", false);
  return req;
}

export async function deleteItem({ state, commit, dispatch }, id) {
  const parentId = state.listId;
  const req = await listService.deleteItem({ id, parentId })
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "delete");
    });
  return req;
}

export function editItem({ state, commit, dispatch }, item) {
  commit("setLoading", true);
  const req = listService.editItem(item)
    .then(res => {
      dispatch("getItems", state.listId);
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "edit");
    });
  commit("setLoading", false);
  return req;
}

export async function editList({ commit, dispatch }, list) {
  commit("setLoading", true);
  const req = await listService.editList(list)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "edit");
    });
  commit("setLoading", false);
  return req;
}

export async function addList({ commit, dispatch }, list) {
  commit("setLoading", true);
  const req = await listService.addList(list)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "add");
    });
  commit("setLoading", false);
  return req;
}

export async function deleteList({ commit, dispatch }, listId) {
  commit("setLoading", true);
  const req = await listService.deleteList(listId)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "delete");
    });
  commit("setLoading", false);
  return req;
}

export function setError({ commit }, error) {
  commit("setError", error);
  setTimeout(() => commit("setError", null), 10000);
}

export function setLoading({ commit }, value) {
  commit("setLoading", value);
}
