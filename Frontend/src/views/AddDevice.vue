<template>
  <add-device-page/>
</template>

<script>
import AddDevicePage from '@/components/AddDevicePage.vue'

  export default {
    name: 'AddDevice',

    components: {
        // Scanner
        AddDevicePage
      
    },
    beforeCreate() {
      if(this.$route.params.id) {
        this.$store.dispatch('paramId', this.$route.params.id)
      }

      this.$store.dispatch('askSecure')
      .then((res)=> {
        if (!res.data.secure){
          this.$router.push({name: 'Login/Register'})
        }
      })
      
    }
  }
</script>
