<template>
  <v-container>
    <h1>Implement CMC here</h1>
  <statical-tests/>
  </v-container>
  
</template>

<script>
import StaticalTests from '@/components/StaticalTests.vue'



  export default {
  components: { StaticalTests },
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
