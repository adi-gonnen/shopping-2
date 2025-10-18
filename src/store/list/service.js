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
    })
    .catch((error) => console.log("error @@", error))
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

function addCategory(category) {
    return axios.post(`${api}/category`, category)
    .then(res => {
        return res.data
    })
}

function updateCategory(category) {
    return axios.put(`${api}/category`, category)
    .then(res => {
        return res.data
    })
}

function removeCategory(params) {
    return axios.delete(`${api}/category/${params}`)
    .then(res => {
        return res.data
    })
}

function setCategories() {
    return [
        {icon: 'fas fa-apple-alt', name: 'פירות וירקות', color: 'green', active: false},
        {icon: 'fas fa-shower', name: 'טיפוח', color: 'fuchsia', active: false},
        {icon: 'fas fa-concierge-bell', name: 'מוצרים לבישול', color: 'lightcoral', active: false},
        {icon: 'fas fa-glass-martini', name: 'משקאות', color: 'blueviolet', active: false},
        {icon: 'fas fa-cheese', name: 'גבינות ומצרי חלב', color: 'yellow', active: false},
        {icon: 'far fa-snowflake', name: 'קפואים', color: 'lightblue', active: false},
        {icon: 'fas fa-toilet-paper', name: 'מוצרי נייר לבית', color: 'floralwhite', active: false},
        {icon: 'fas fa-paint-roller', name: 'תחזוקת הבית וניקיון', color: 'blue', active: false},
        {icon: 'fas fa-hamburger', name: 'בשר ועוף', color: 'coral', active: false},
        {icon: 'fas fa-pepper-hot', name: 'תבלינים', color: 'red', active: false},
        {icon: 'fas fa-ice-cream', name: 'ממתקים וחטיפים', color: 'deeppink', active: false},
        {icon: 'fas fa-seedling', name: 'ללא גלוטן', color: 'darkseagreen', active: false},
        {icon: 'fas fa-fish', name: 'נקניקים ודגים מעושנים', color: 'lightpink', active: false},
        {icon: 'fas fa-bread-slice', name: 'מאפים עוגיות וקורנפלקס', color: 'brown', active: false},
        {icon: 'fas fa-shopping-cart', name: 'שונות', color: 'black', active: false},
        {icon: 'fas fa-baby-carriage', name: 'מוצרי תינוקות', color: 'darkred', active: false},
        {icon: 'fas fa-paw', name: 'מוצרים לבעלי חיים', color: 'dodgerblue', active: false},
        {icon: 'fas fa-chair', name: 'ריהוט', color: 'maroon', active: false},
        {icon: 'fas fa-coffee', name: 'כלים לבית', color: 'royalblue', active: false},
        {icon: 'fas fa-dice', name: 'משחקים', color: 'tomato', active: false},
        {icon: 'fas fa-car-side', name: 'מוצרים לרכב', color: 'grey', active: false},
        {icon: 'fas fa-hanukiah', name: 'חגים ומועדים', color: 'peru', active: false},
        {icon: 'fas fa-pencil-alt', name: 'מכשירי כתיבה', color: 'darkorange', active: false},
        {icon: 'fas fa-plug', name: 'מכשירי חשמל', color: 'teal', active: false},
        {icon: 'fas fa-syringe', name: 'תרופות ותוספי מזון', color: 'mediumturquoise', active: false},
        {icon: 'fas fa-tshirt', name: 'ביגוד', color: 'mediumpurple', active: false},
        {icon: 'fas fa-desktop', name: 'מחשבים וטלפוניה', color: 'olive', active: false},
        {icon: 'fas fa-bed', name: 'טקסטיל לבית', color: 'hotpink', active: false},
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
    // addCategoryToItem,
    setCategories,
    addCategory,
    updateCategory,
    removeCategory
}
/*
    
    מיון: <i class="fas fa-sort-amount-down"></i>
חץ למעלה:  <i class="fas fa-sort-up"></i>
חץ למטה: <i class="fas fa-sort-down"></i>
פח: <i class="fas fa-trash-alt"></i>

    */