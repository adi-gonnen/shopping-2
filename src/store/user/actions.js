import listService from "./service";
import { red } from "color-name";

export function login({ commit, dispatch }, id_token) {
  return listService.login(id_token).then(res => {
    if (res.id) {
      dispatch("loadLists");
    }
  });
}

export function logout({ commit }) {
  return listService.logout().then(res => {
    commit("setAuth", false);
  });
}

export async function loadLists({ state, commit, dispatch }) {
  const lists = await listService.loadLists();
  if (lists.status === 401) {
    commit("setAuth", false);
    return false;
  } else {
    commit("getLists", lists);
    await dispatch("loadProfile");
    commit("setAuth", true);
    await dispatch("list/getItems", state.defaultListId, { root: true });
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

export async function editList({ state }, list) {
  return listService.editList(list).then(res => {
    return res;
  });
}

export async function addList({ state }, list) {
  return listService.addList(list).then(res => {
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
