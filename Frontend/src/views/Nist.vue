<template>
  <v-container>
    <!-- Start step 1 -->
      <div v-if="step == 1">
        <file-upload/>
      </div>
      <!-- end Step 1 -->
      <!-- start Step 2 -->
      <div v-if="step == 2">
        <statical-tests/>
      </div>
      <!-- end Step 2 -->
      <!-- start Step 3 -->
      <div v-if="step == 3 & isFrequency == true">
        <parameter-adjustments/>
      </div>
      
      <div v-if="(step == 3 & isFrequency == false) ">
        <each-sequence/>
      </div>
      <!-- end Step 3 -->
      
      <v-alert
        class="ma-3"
        v-if="showsendbox"
        shaped
        prominent
        type="success"
        >
        Latest request is now being handled by the server. You will shortly receive a mail with the results
        </v-alert>

  

  </v-container>
</template>

<script>

import StaticalTests from '@/components/StaticalTests.vue'
import ParameterAdjustments from '@/components/ParameterAdjustments.vue'
import EachSequence from '@/components/EachSequence.vue'
import FileUpload from '@/components/FileUpload.vue'

  export default {
  components: { StaticalTests, ParameterAdjustments, EachSequence,FileUpload },
    name: 'NIST',
    data()
    {
      return{
        step: 1,
        isFrequency: false, 
        showsendbox: false,
      }
    },


    beforeCreate() {
      this.$store.dispatch("askSecure")
      .then((res) => {
        if(!res.data.secure){
          this.$router.push({name: 'Login/Register'})
        }
      })
      
    },

    watch: {
      "$store.state.staticalTestChoice": {
        handler: function(choice) {
          if (choice) {
            this.step++
            if (choice == 1 ){
              this.isFrequency = true; 
            }
            else {
              this.isFrequency = false; 
            }
          }
        }
      },
        "$store.state.backToMenu": {
        handler: function(bool) {
          if (bool) {
            this.step++
            this.$store.dispatch("updateBackToMenu", false)

            console.log("Step: " + this.step)
            if( (this.step >= 4)){
              this.$store.dispatch("sendFileNIST")
              this.step = 1
              this.showsendbox = true
              setTimeout(() => this.showsendbox = false, 2000)
            }

          }
        }
      },
    }
  }
</script>
