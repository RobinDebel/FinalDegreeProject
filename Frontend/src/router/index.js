import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import AddDevice from '@/views/AddDevice.vue'
import RegisterLogin from '@/views/RegisterLogin.vue'
import ProfilePage from '@/views/ProfilePage'
import CMC from '@/views/Cmc.vue'
import NIST from '@/views/Nist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AddDevice/:id?',
    name: 'AddDevice',
    component: AddDevice
  },
  {
    path:'/RegisterLogin',
    name: 'Login/Register',
    component: RegisterLogin
  },
  {
    path:'/Profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path:'/NIST',
    name: 'NIST',
    component: NIST
  },
  {
    path:'/CMC',
    name: 'CMC',
    component: CMC
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
