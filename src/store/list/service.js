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
    return [
        {icon: 'fas fa-apple-alt', name: 'פירות וירקות', color: 'green', active: false},
        {icon: 'fas fa-shower', name: 'טיפוח', color: 'lightcoral', active: false},
        {icon: 'fas fa-concierge-bell', name: 'מוצרים לבישול', color: 'red', active: false},
        {icon: 'fas fa-glass-martini', name: 'משקאות', color: 'red', active: false},
        {icon: 'fas fa-cheese', name: 'גבינות ומצרי חלב', color: 'yellow', active: false},
        {icon: 'far fa-snowflake', name: 'קפואים', color: 'lightblue', active: false},
        {icon: 'fas fa-toilet-paper', name: 'מוצרי נייר לבית', color: '', active: false},
        {icon: 'fas fa-paint-roller', name: 'תחזוקת הבית וניקיון', color: '', active: false},
        {icon: 'fas fa-hamburger', name: 'בשר ועוף', color: '', active: false},
        {icon: 'fas fa-pepper-hot', name: 'תבלינים', color: '', active: false},
        {icon: 'fas fa-ice-cream', name: 'ממתקים וחטיפים', color: '', active: false},
        {icon: 'fas fa-seedling', name: 'ללא גלוטן', color: '', active: false},
        {icon: 'fas fa-fish', name: 'נקניקים ודגים מעושנים', color: '', active: false},
        {icon: 'fas fa-bread-slice', name: 'מאפים עוגיות וקורנפלקס', color: 'brown', active: false},
        {icon: 'fas fa-shopping-cart', name: 'שונות', color: '', active: false},
        {icon: 'fas fa-baby-carriage', name: 'מוצרי תינוקות', color: '', active: false},
        {icon: 'fas fa-paw', name: 'מוצרים לבעלי חיים', color: '', active: false},
        {icon: 'fas fa-chair', name: 'ריהוט', color: '', active: false},
        {icon: 'fas fa-coffee', name: 'כלים לבית', color: '', active: false},
        {icon: 'fas fa-dice', name: 'משחקים', color: '', active: false},
        {icon: 'fas fa-car-side', name: 'מוצרים לרכב', color: '', active: false},
        {icon: 'fas fa-hanukiah', name: 'חגים ומועדים', color: '', active: false},
        {icon: 'fas fa-pencil-alt', name: 'מכשירי כתיבה', color: '', active: false},
        {icon: 'fas fa-plug', name: 'מכשירי חשמל', color: '', active: false},
        {icon: 'fas fa-syringe', name: 'תרופות ותוספי מזון', color: '', active: false},
        {icon: 'fas fa-tshirt', name: 'ביגוד', color: '', active: false},
        {icon: 'fas fa-desktop', name: 'מחשבים וטלפוניה', color: '', active: false},
        {icon: 'fas fa-bed', name: 'טקסטיל לבית', color: '', active: false},
    ]
}

export default {
    getItems,
    addItem,
    deleteItem,
    editItem,
    editList,
    addList,
    deleteList,
    getCategories,
    setCategories
}
/*
    
    מיון: <i class="fas fa-sort-amount-down"></i>
חץ למעלה:  <i class="fas fa-sort-up"></i>
חץ למטה: <i class="fas fa-sort-down"></i>
פח: <i class="fas fa-trash-alt"></i>

    */