<template>
  <device-list/>
</template>

<script>
import DeviceList from '@/components/DeviceList.vue'


  export default {
    name: 'Home',

    components: {
        DeviceList

    },

    beforeCreate() {

      this.$store.dispatch("askSecure")
      .then((res) => {
        if(!res.data.secure){
          this.$router.push({name: 'Login/Register'})
        }
      })
      
    }
  }
</script>
