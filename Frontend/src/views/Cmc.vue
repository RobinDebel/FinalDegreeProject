<template>
  <v-container>
    <FileUploadCMC/>
  </v-container>
  
</template>

<script>
import FileUploadCMC from '@/components/FileUploadCMC.vue'

  export default {
    components:{ FileUploadCMC},

    name: 'CMC',
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
