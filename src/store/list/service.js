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

function getCategories(parentId) {
    return axios.get(`${api}/categories?parentId=${parentId}`)
    .then(res => {
        return res.data
    })
}

function setCategories() {
    return {
        fruit: {icon: 'fas fa-apple-alt', name: 'פירות וירקות', color: 'green'},
        cosmetics: {icon: 'fas fa-shower', name: 'טיפוח', color: ''},
        culinary: {icon: 'fas fa-concierge-bell', name: 'מוצרים לבישול', color: ''},
        drink: {icon: 'fas fa-glass-martini', name: 'משקאות', color: ''},
        milk: {icon: 'fas fa-cheese', name: 'גבינות ומצרי חלב', color: ''},
        frozen: {icon: '', name: 'קפואים', color: ''},
        milk: {icon: '', name: '', color: ''},
        milk: {icon: '', name: '', color: ''},
        milk: {icon: '', name: '', color: ''},
        milk: {icon: '', name: '', color: ''},
    }
}

export default {
    getItems,
    addItem,
    deleteItem,
    editItem,
    editList,
    addList,
    deleteList,
    getCategories
}
/*
    <i class="fas fa-shopping-cart"></i> שונות
    <i class="far fa-snowflake"></i> קפואים
    <i class="fas fa-toilet-paper"></i> מוצרי נייר לבית
    <i class="fas fa-paint-roller"></i> תחזוקת הבית וניקיון
    <i class="fas fa-hamburger"></i> בשר עוף ודגים
    <i class="fas fa-pepper-hot"></i> תבלינים
    <i class="fas fa-ice-cream"></i> ממתקים וחטיפים
    <i class="fas fa-seedling"></i> ללא גלוטן
    <i class="fas fa-fish"></i> נקניקים ודגים מעושנים 
    <i class="fas fa-bread-slice"></i> מאפים עוגיות וקורנפלקס



    <!-- extra -->
    <i class="fas fa-baby-carriage"></i> מוצרי תינוקות
    <i class="fas fa-paw"></i> מוצרים לבעלי חיים
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
    <i class="fas fa-bed"></i> טקסטיל לבית 
    
    מיון: <i class="fas fa-sort-amount-down"></i>
חץ למעלה:  <i class="fas fa-sort-up"></i>
חץ למטה: <i class="fas fa-sort-down"></i>
פח: <i class="fas fa-trash-alt"></i>

    */