import listService from "./service";
import { red } from "color-name";

export async function login({ commit, dispatch }, id_token) {
  dispatch('list/setLoading', true, { root: true })
  await listService.login(id_token);
  await dispatch("loadLists");
  dispatch('list/setLoading', false, { root: true })
}

export function logout({ commit }) {
  return listService.logout().then(res => {
    commit("setAuth", false);
  });
}

export async function loadLists({ state, commit, rootState, dispatch }) {
  const lists = await listService.loadLists();
  if (lists.status === 401) {
    commit("setAuth", false);
    return false;
  } else {
    commit("getLists", lists);
    await dispatch("loadProfile");
    commit("setAuth", true);
    const id = rootState.list.listId || state.defaultListId;
    await dispatch("list/getItems", id, { root: true });
  }
}

export async function loadProfile({ commit, state }) {
  return listService.loadProfile().then(profile => {
    commit("setProfile", profile);
    if (state.lists && state.lists[0]) {
      const defaultList = profile.defaultList || state.lists[0].id;
      commit("setDefaultList", defaultList);
    }
  });
}

export async function addUser({ state }, user) {
  return listService.addUser(user).then(res => {
    return res;
  });
}

export async function deleteUser({ state }, url) {
  return listService.deleteUser(url).then(res => {
    return res;
  });
}

export async function setDefault({ state }, data) {
  const profile = JSON.parse(JSON.stringify(state.profile));
  const defaultValue = data.value ? data.id : null;
  profile.defaultList = defaultValue;
  return listService.setProfile(profile).then(res => {
    return res;
  });
}
