import listService from "./service";

export async function getItems({ state, commit, dispatch }, parentId = state.listId) {
  const items = (await listService.getItems(parentId)) || [];
  const categories = await listService.getCategories(parentId);
  if (!state.fullCategories) {
    const fullCategories = listService.setCategories();
    commit("setFullCategories", fullCategories);
  }
  commit("getItems", items);
  commit("setListId", parentId);
  commit("setLoading", false);
  commit("setCategories", categories);
  dispatch("checkActiveCaterory")
}

export async function addNewItem({ state, commit, dispatch }, item) {
  commit("setLoading", true);
  const parentId = state.listId;
  const newItem = { ...item, parentId };
  const req = await listService
    .addItem(newItem)
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

export function deleteItem({ state, dispatch }, id) {
  const parentId = state.listId;
  const req = listService.deleteItem({ id, parentId })
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
  const req = listService
    .editItem(item)
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
  const req = await listService
    .editList(list)
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
  const req = await listService
    .addList(list)
    .then(res => {
      return res.data;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "add");
    });
  commit("setLoading", false);
  return req;
}

export async function deleteList({state, rootState, commit, dispatch}, listId) {
  commit("setLoading", true);
  const req = await listService
    .deleteList(listId)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "delete");
    });
  if (state.listId === listId) {
    const list = rootState.user.defaultListId || rootState.user.lists[0].id;
    commit("setListId", list);
  }
  commit("setLoading", false);
  return req;
}

export function checkActiveCaterory({state, commit}) {
  const categories = state.categories;
  const fullCategories = JSON.parse(JSON.stringify(state.fullCategories));
  fullCategories.forEach(item => {
    categories.some(category => {
      if (item.icon === category.icon) {
        item.id = category.id;
        item.active = true;
        return 
      }
    })
  })
  commit('setFullCategories', fullCategories)
}

export async function addCategoryToItem({state, dispatch}, category) {
  const req = await listService.addCategoryToItem(category)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "add");
    });
    return req;
}

export async function changeCategoryValue({state, dispatch}, data) {
  const parentId = state.listId
  const {val, icon} = data;
  let category = state.fullCategories.find(item => {
    return item.icon === icon;
  })
  category.parentId = parentId
  if (val) {
    const req = await listService.addCategory(category)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "add");
    });
    return req;
  } else {
    const req = await listService.removeCategory(`${parentId}/${category.id}`)
    .then(res => {
      return res;
    })
    .catch(function(error) {
      console.log(error);
      dispatch("setError", "add");
    });
    return req;
  }
}

export function setError({ commit }, error) {
  commit("setError", error);
  setTimeout(() => commit("setError", null), 3000);
}

export function setLoading({ commit }, value) {
  commit("setLoading", value);
}
