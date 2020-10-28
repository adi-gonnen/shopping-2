
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/item/:id?',
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
