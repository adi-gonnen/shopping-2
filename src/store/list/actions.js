
import listService from './service'

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

export function deleteItems({ state, dispatch },items) {
    const parentId = state.listId;
    if (items.length > 0) {
        items.forEach((id => {
          return listService.deleteItem({id, parentId})
          .then(res => {
            console.log('res delete', res) 
          })
        }))
        dispatch('getItems', parentId);
      }
}

export function editItem({state, dispatch}, item) {
    const parentId = state.listId;
    return listService.editItem(item)
    .then(res => {
        dispatch('getItems', parentId);
    })
}

