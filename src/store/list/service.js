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

 {/* <i class="fas fa-apple-alt"></i> פירות וירקות
    <i class="fas fa-shower"></i> טיפוח 
    <i class="fas fa-concierge-bell"></i> מוצרים לבישול
    <i class="fas fa-cheese"></i> גבינות ומצרי חלב
    <i class="fas fa-glass-martini"></i> משקאות
    <i class="fas fa-shopping-cart"></i> שונות
    <i class="far fa-snowflake"></i> קפואים
    <i class="fas fa-toilet-paper"></i> מוצרי נייר לבית
    <i class="fas fa-paint-roller"></i> תחזוקת הבית וניקיון
    <i class="fas fa-hamburger"></i> בשר עוף ודגים
    <i class="fas fa-pepper-hot"></i> תבלינים
    <i class="fas fa-ice-cream"></i> ממתקים וחטיפים
    <i class="fas fa-seedling"></i> ללא גלוטן



    <!-- extra -->
    <i class="fas fa-baby-carriage"></i> מוצרי תינוקות
    <i class="fas fa-cat"></i> מוצרים לבעלי חיים
    <i class="fas fa-chair"></i> ריהוט
    <i class="fas fa-coffee"></i> כלים לבית
    <i class="fas fa-dice"></i> משחקים
    <i class="fas fa-car-side"></i> מוצרים לרכב
    <i class="fas fa-hanukiah"></i> חגים ומועדים
    <i class="fas fa-pencil-alt"></i> מכשירי כתיבה
    <i class="fas fa-pepper-hot"></i> מכשירי חשמל
    <i class="fas fa-syringe"></i> תרופות ותוספי מזון
    <i class="fas fa-tshirt"></i> ביגוד
    <i class="fas fa-desktop"></i> ציוד מחשבים
    <i class="fas fa-bed"></i> טקסטיל לבית */}