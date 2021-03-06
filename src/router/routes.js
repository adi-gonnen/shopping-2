
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/add-item/:category?',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddItem.vue') },
    ]
  },
  {
    path: '/edit-item/:id?',  
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditItem.vue') },
    ]
  },
  {
    path: '/lists',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Lists.vue') },
    ]
  },
  {
    path: '/categories',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Categories.vue') },
      { path: 'add', component: () => import('pages/AddCategories.vue') },
    ]
  },
  {
    path: '/sort',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Sort.vue') },
    ]
  },
  {
    path: '/list/:id?',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditList.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
