import Vue from 'vue'
import Vuex from 'vuex'
import { Nist, Authentication} from "@/api/finalproject"
 
Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
    secure: false, 
    user: {},
    staticalTestChoice: null, 
    backToMenu: false,
    form: null
  },

  getters:{
    
    staticalTestChoice(state) {
      return state.staticalTestChoice;
    },

  },

  mutations: {
    changeBackToMenu(state,value) {
      state.backToMenu = value
    },

    changeStaticalTestChoice(state,value) {
     
      state.staticalTestChoice = value;
    },

    changeSecure(state,value) {
      state.secure = value; 
    },

    changeUser(state,value) {
      state.user = value;
    },

  },

  actions: {

    sendFileNIST(state){
      Nist.sendFile(state.form)
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
    },

    updateStaticalTestChoice(store,payload){
      this.commit('changeStaticalTestChoice', payload)
    },

    updateBackToMenu(store,payload){
      this.commit('changeBackToMenu', payload)
    },

    newForm(state){
      state.state.form = new FormData()
    }




  },
})
