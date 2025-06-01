import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/users/all',
        component: () => import('@/views/Users.vue')
      },
      {
        path: '/users/create',
        component: { template: '<div>Create User Page</div>' }
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
