
import listService from './service'

export function login({ commit, dispatch }, id_token) {
    return listService.login(id_token)
        .then((res) => {
            if (res.id) {
                dispatch('loadLists')
            }
        })
}

export function logout({ commit }) {
    return listService.logout()
        .then((res) => {
            commit('setAuth', false)
        })
}

export async function loadLists({ state, commit, dispatch }) {
    const lists = await listService.loadLists();
    if (lists.status === 401) {
        commit('setAuth', false)
        return false;
    } else {
        commit('getLists', lists);
        await dispatch('loadProfile');
        commit('setAuth', true);
        await dispatch('list/getItems', state.defaultList, {root:true});
    }
}

export async function loadProfile({ commit, state }) {
    return listService.loadProfile()
        .then(profile => {
            commit('setProfile', profile.auth)
            const defaultList = profile.defaultList || state.lists[0] && state.lists[0].id
            commit('setDefaultList', defaultList);
        })
}
