import axios from 'axios'
import configuration from '../../../quasar.conf'
axios.defaults.withCredentials = true
// const list_URL = (process.env.NODE_ENV !== 'development')? '/list': '//localhost:3000/list';

const api = configuration().api


function getItems(parentId) {
    return axios.get(`${api}/items?parentId=${parentId}`)
        .then(res => {
            return res.data;
        })
}

function addItem(item) {
    return axios.post(`${api}/item`, item)
        .then(res => {
            return res.data
        })
        .catch(err => console.log('Problem talking to server', err))
}

function deleteItem(data) {
    return axios.delete(`${api}/item/${data.parentId}/${data.id}`)
        .then(res => {
            return res.data
        })
}

function editItem(item) {
    return axios.put(`${api}/item`, item)
    .then(res => {
        return res.data
    })
}

function editList(list) {
    return axios.put(`${api}/list`, list)
    .then(res => {
      return res;
    });
  }
  
  function addList(list) {
    return axios.post(`${api}/list`, list)
    .then(res => {
      return res;
    });
  }

function deleteList(listId) {
    return axios.delete(`${api}/list/null/${listId}`)       //null is for parentId
    .then(res => {
        return res.data
    })
}


export default {
    getItems,
    addItem,
    deleteItem,
    editItem,
    editList,
    addList,
    deleteList
}