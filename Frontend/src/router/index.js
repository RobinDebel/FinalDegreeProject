import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import AddDevice from '@/views/AddDevice.vue'
import QRScanner from '@/views/QRScanner.vue'
import DeviceInfo from '@/views/DeviceInfo.vue'
import RegisterLogin from '@/views/RegisterLogin.vue'
import ProfilePage from '@/views/ProfilePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/devices/:id',
    name: 'DeviceInfo',
    component: DeviceInfo
  },
  {
    path: '/AddDevice/:id?',
    name: 'AddDevice',
    component: AddDevice
  },
  {
    path:'/AddDevice/QRScanner',
    name: 'QRScanner',
    component: QRScanner
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
    component: ProfilePage
  },
  {
    path:'/CNC',
    name: 'CNC',
    component: ProfilePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
