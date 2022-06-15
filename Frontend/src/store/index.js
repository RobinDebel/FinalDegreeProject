import Vue from 'vue'
import Vuex from 'vuex'
import { CMC, Nist, Authentication} from "@/api/finalproject"
 
Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
    secure: false, 
    user: {},
    staticalTestChoice: null, 
    backToMenu: false,
    inputs: [],
    file: null,
    cmcfile: null

  },

  //getters are used to access the state
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

    changeFile(state,value){
      state.file = value;
    },

    addInputs(state,value){
      state.inputs.push(value)
    },

    changeCMCFile(state,value){
      state.cmcfile = value
    }

  },


  actions: {

    //This action is called to send the CMC file to the backend
    sendFileCMC(){
      //Making a form data object to send the file, and user email
      let form = new FormData()
      form.append("recfile", this.state.cmcfile)
      form.append("email", this.state.user.email)

      //Calling the finalproject.js api to send the file
      CMC.sendFile(form).then((response) => {
        console.log(response)
        })
      .catch((err) => {
          console.log(err)
        });
    },

    //This action is called to send the NIST file to the backend
    sendFileNIST(){
      //Making a form data object to send the file, inputs and user email
      let form = new FormData()
      form.append("recfile", this.state.file)
      form.append("inputs", this.state.inputs)
      form.append("email", this.state.user.email)

      //Calling the finalproject.js api to send the file
      Nist.sendFile(form)
      .then((response) => {
        console.log(response)
        })
      .catch((err) => {
          console.log(err)
        });
    },

    //This action is called to register a new user
    register(state, payload){
      return Authentication.register(payload)
      .then((res) => {
        return res
      })
    },

    //This action is called to login a user
    login(state,payload) { 
      return Authentication.login(payload)
      .then((res) => {
        this.commit("changeSecure", true)
        this.commit("changeUser", res.data)
        console.log(this.state.user.email)
        return res
      })
      .catch((err) => {
        console.log(err)
      })
    },

    //This action is called to logout a user
    logout() {
      Authentication.logout()
      .then(()=> {
        this.commit("changeSecure", false)
        this.commit("changeUser", {})
      })
    },

    //This action is called to check if the user is logged in, and provide the user object
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

    updateFile(store,payload){
      this.commit('changeFile', payload)
    },

    updateCMCFile(store,payload){
      this.commit('changeCMCFile', payload)
    },

    pushInputs(state,payload) {
      this.commit('addInputs', String(payload))
      console.log(state.state.inputs)
    },

    resetNIST(){
      this.commit('changeFile', null)
      this.state.inputs = []
    },

    resetCMC(){
      this.commit('changeFile', null)
      this.state.cmcfile = null
    }
  
  },
})
