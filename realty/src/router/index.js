import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PropertyDetails from '../views/PropertyDetails.vue'
import LoginView from '@/views/LoginView.vue'

const validLanguages = ['en', 'hr', 'de', 'it']

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:lang',
    name: 'homeLang',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (validLanguages.includes(to.params.lang)) {
        next()
      } else {
        next({ name: 'notFound' })
      }
    },
  },
  {
    path: '/:lang/:propertyType/:slug',
    name: 'propertyDetails',
    component: PropertyDetails,
    props: true,
    beforeEnter: (to, from, next) => {
      if (validLanguages.includes(to.params.lang)) {
        next()
      } else {
        next({ name: 'notFound' })
      }
    },
  },
  {
    path: '/:lang/:pathMatch(.*)*',
    name: 'notFoundLang',
    component: NotFoundView,
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404
    name: 'notFound',
    component: NotFoundView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
