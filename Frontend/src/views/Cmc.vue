<template>
  <v-container>
    <!-- <h1>Implement CMC here</h1> -->
   <statical-tests/> 
    <parameter-adjustments/>
  </v-container>
  
</template>

<script>
import StaticalTests from '@/components/StaticalTests.vue'
import ParameterAdjustments from '@/components/ParameterAdjustments.vue'



  export default {
  //components: { StaticalTests },
  components:{ParameterAdjustments,StaticalTests },
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
