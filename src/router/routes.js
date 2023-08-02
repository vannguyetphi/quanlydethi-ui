
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
      },
      { path: 'quan-li-lop',
        component: () => import('pages/ClassPage.vue'),
        name: 'ClassPage',
        meta: {
          requiresAuth: true
        }
      }
    ],
  },
  {
    path: '/hocvien/dangnhap',
    component: () => import('pages/student/LoginPage.vue'),
    name: 'StudentLoginPage'
  },
  {
    path: '/hocvien/chon-de-thi',
    component: () => import('pages/student/ExamPicker.vue'),
    name: 'StudentExamPicker'
  },
  {
    path: '/hocvien/kiem-tra/:examId',
    component: () => import('layouts/ExamStartLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/student/ExamWelcome.vue'),
        name: 'StudentExamWelcome'
      },
      {
        path: ':subject',
        component: () => import('pages/student/ExamStart.vue'),
        name: 'StudentExamStart'
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
