import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Описание',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/task',
    name: 'Выполненное задание',
    component: () => import('../views/TaskView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
