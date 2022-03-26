import Vue from 'vue'
import Vuex from "vuex"
import App from './App.vue'
import router from './router'
import { store } from './store'
import VueQrcodeReader from "vue-qrcode-reader";
import vuetify from './plugins/vuetify'
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);
Vue.use(VueQrcodeReader);
Vue.config.productionTip = false
Vue.use(Vuex)

import {config} from './config'
for(const key in config) {
  Vue.prototype[`$${key}`] = config[key]
}

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
