import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Habilidades from'@/views/HabilidadesComponent.vue'
import Sobre from '@/views/SobreComponent.vue'
import Status from '@/views/StatusComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: 'habilidades',
        name: 'habilidades',
        component: Habilidades,
      },
      {
        path: 'sobre',
        name: 'sobre',
        component: Sobre,
      },
      {
        path: 'status',
        name: 'status',
        component: Status
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
