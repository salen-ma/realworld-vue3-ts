import { RouteRecordRaw, createRouter, createWebHistory  } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/index')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/login/index'),
        props: { isLogin: true },
        meta: { noAuth: true }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/login/index'),
        props: { isLogin: false },
        meta: { noAuth: true }
      },
      {
        path: '/profile/:username',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/profile/index'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/settings/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/editor/:slug?',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '../views/editor/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/article/:slug',
        name: 'article',
        component: () => import(/* webpackChunkName: "article" */ '../views/article/index'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router