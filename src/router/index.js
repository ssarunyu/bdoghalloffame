import { createRouter, createWebHistory } from 'vue-router'
import About from '@/components/About.vue'
import Acs from '@/components/Acs.vue'
import Headshot from '@/components/Headshot.vue'
import OwnStat from '@/components/OwnStat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'acs',
      component: Acs
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/headshot',
      name: 'headshot',
      component: Headshot
    },
    {
      path: '/stats',
      name: 'stats',
      component: OwnStat
    }
  ]
})

export default router
