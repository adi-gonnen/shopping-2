import axios from 'axios'
axios.defaults.withCredentials = true
// const list_URL = (process.env.NODE_ENV !== 'development')? '/list': '//localhost:3000/list';
const api = `https://ztl2svc.appspot.com/api`
// const api = 'http://10.0.0.12:8080/api'


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


export default {
    getItems,
    addItem,
    deleteItem,
    editItem
}