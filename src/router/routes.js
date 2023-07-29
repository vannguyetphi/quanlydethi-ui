
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/MainPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      { path: 'test-management',
        component: () => import('pages/TestManagement.vue'),
        name: 'TestPage',
        meta: {
          requiresAuth: true
        }
      }
    ],
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    name: 'LoginPage'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
