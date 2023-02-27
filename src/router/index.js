import Vue from 'vue'
import VueRouter from "vue-router";

const login = () => import('../views/Login.vue')
const home = () => import('../views/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },     
  {
    path: '/home',
    name: 'home',
    component: home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
