import Vue from 'vue'
import Vuex from 'vuex'
import { NIST, Authentication} from "@/api/finalproject"
 
Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
    secure: false, 
    user: {},
    paramid: null,
  },

  getters:{
    devicevalue(state) {
      return state.devicevalue;
    },
  },

  mutations: {
    
    changeSecure(state,value) {
      state.secure = value; 
    },

    changeUser(state,value) {
      state.user = value;
    },
    changeParamId(state,value){
      state.paramid = value;
    }

  },

  actions: {

    paramId:(store,message) => {
      store.commit('changeParamId', message)
    },

    sendFileNIST(state, payload){
      NIST.sendFile(payload)
      .then((response) => {
        console.log(response)
        })
      .catch((err) => {
          console.log(err)
        });
    },

    register(state, payload){
      return Authentication.register(payload)
      .then((res) => {
        return res
      })
    },

    login(state,payload) { 
      return Authentication.login(payload)
      .then((res) => {
        this.commit("changeSecure", true)
        this.commit("changeUser", res.data)
        return res
      })
      .catch((err) => {
        console.log(err)
      })
    },

    logout() {
      Authentication.logout()
      .then(()=> {
        this.commit("changeSecure", false)
        this.commit("changeUser", {})
      })
    },

    askSecure() {
      return Authentication.secure()
      .then((res) => {
        this.commit("changeSecure", res.data.secure)
        this.commit("changeUser", res.data.user)

        return res
      })
    }




  },
})
