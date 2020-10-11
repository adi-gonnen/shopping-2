import axios from 'axios'
axios.defaults.withCredentials = true
// const list_URL = (process.env.NODE_ENV !== 'development')? '/list': '//localhost:3000/list';
const api = `https://ztl2svc.appspot.com/api`
// const api = 'http://10.0.0.12:8080/api'

function login(id_token) {
    return axios.post(`${api}/login`, { id_token })
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('login error: ' + error);
        })
}

function loadProfile() {
    return axios.get(`${api}/profile`)
        .then(res => {
            return res.data
        })
}


function loadLists() {
    return axios.get(`${api}/lists`, { params: { parentId: null } })
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('list failed: ' + error);
            return error.response
        })
}

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

function logout() {
    const loginResponse = axios.post(`${api}/logout`);
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    console.log("Logged out");
    return loginResponse;
}

export default {
    login,
    loadProfile,
    loadLists,
    getItems,
    addItem,
    deleteItem,
    logout
}