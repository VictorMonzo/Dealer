import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import DeliveriesTable from '../views/DeliveriesTable.vue'

Vue.use(VueRouter)

const isAuthenticated = (to, from, next) => {
  if(sessionStorage.token) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Comandas',
    component: DeliveriesTable,
    beforeEnter: isAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
