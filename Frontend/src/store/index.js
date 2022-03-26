import Vue from 'vue'
import Vuex from 'vuex'
import { Devices, Authentication} from "@/api/devicecreator"
 
Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
    devices: undefined,
    QRValue: undefined,
    secure: false, 
    user: {},
    devicevalue: {},
    paramid: null,
  },

  getters:{
    devicevalue(state) {
      return state.devicevalue;
    },
  },

  mutations: {
    changeDevices(state,payload) {
      state.devices = payload.devices;
    },

    changeDeviceInfo(state,payload){
      state.devicevalue = payload
    },

    changeQRValue(state,value) {
      state.QRValue = value;
    },

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

    saveQRValue: (store, message) => {
      console.log(`QR value read: ${message}`)
      store.commit('changeQRValue',message)
      
    },

    getAllDevices({commit} ){
      return Devices.get_all_devices()
      .then((response) => {

          commit('changeDevices', {
              devices: response.data
          })
          this.devices = response.data
      })
      .catch((error) => console.log(error));
    },

    getSensorById({commit}, id ){
      Devices.get_device_by_id(id)
      .then((response) => {
        commit('changeDeviceInfo', response.data)
        
      })
      .catch((error) => console.log(error));
    },

    addDevice(state, payload){
      Devices.add_device(payload)
      .then((response) => {
        this.snackbartext = response
        })
      .catch((err) => {
          this.snackbartext = err
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
