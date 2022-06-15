<template>
  <v-container>
    <FileUploadCMC/>
  </v-container>
  
</template>

<script>
// View to load FileUploadCMC.vue
import FileUploadCMC from '@/components/FileUploadCMC.vue'

  export default {
    components:{ FileUploadCMC},

    name: 'CMC',
    beforeCreate() {
      //Checking if the user is logged in, if not, redirect to login page.
      this.$store.dispatch("askSecure")
      .then((res) => {
        if(!res.data.secure){
          this.$router.push({name: 'Login/Register'})
        }
      })
      
    }
  }
</script>
