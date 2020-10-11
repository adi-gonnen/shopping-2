
import listService from './service'

export function login({ dispatch, commit }, id_token) {
    return listService.login(id_token)
        .then((res) => {
            if (res.id) {
                commit('setAuth', true)
            }
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
        await dispatch('getItems', state.defaultList);
    }
}

export async function loadProfile({ commit, state }) {
    return listService.loadProfile()
        .then(profile => {
            const defaultList = profile.defaultList || state.lists[0] && state.lists[0].id
            commit('setDefaultList', defaultList);
        })
}

export async function getItems({ commit }, parentId) {
    const items = await listService.getItems(parentId) || [];
    commit('getItems', items);
    commit('getListId', parentId);
}

export async function addNewItem({ state, dispatch }, item) {
    const parentId = state.listId;
    const newItem = {...item, parentId };
    return await listService.addItem(newItem)
        .then(res => {
            dispatch('getItems', parentId);
            return res
        })
}

// export function setMarkedItems({commit}, items) {
//     commit('markItems', items)
// }

export function deleteItems({ state, dispatch },items) {
    const parentId = state.listId;
    if (items.length > 0) {
        items.forEach((id => {
          return listService.deleteItem({id, parentId})
          .then(list => {
            // 
          })
        }))
        dispatch('getItems', parentId);
      }
}

