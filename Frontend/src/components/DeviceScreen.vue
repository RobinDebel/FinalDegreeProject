<template>
<div class="d-flex">
  <v-card
  class="mx-auto my-12 justify-center"
  >
  <img :src="Picture"
  height= 350px>
  <v-card-title>{{devicevalue.devicename}}</v-card-title>
  <v-card-text>{{devicevalue.description}}</v-card-text>
  </v-card>
</div>

</template>

<script>

import dotenv from 'dotenv';
dotenv.config();

export default {
  name: "DeviceScreen",


  data(){
    return{
      id: this.$route.params.id
    };
  },

  created(){
    this.$store.dispatch("getSensorById", this.id)
  },

  computed:{
    devicevalue(){
      return this.$store.getters.devicevalue
    },
    Picture(){
      return process.env.VUE_APP_BACKEND_BASE_URL +"/"+ this.$store.getters.devicevalue.filename
    }
  },
  beforeCreate() {
      if (!this.$store.state.secure){
        this.$router.push({name: 'Login/Register'})
      }
    }


}
</script>

