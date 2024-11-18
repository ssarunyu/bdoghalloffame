import { createRouter, createWebHistory } from 'vue-router'
import About from '@/components/About.vue'
import Acs from '@/components/Acs.vue'
import Patch from '@/components/Patch.vue'
import Performance from '@/components/Performance.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'acs',
      component: Acs
    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/patch-note',
      name: 'patch',
      component: Patch
    }
  ]
})

export default router
