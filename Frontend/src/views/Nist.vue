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
      
    <!-- Allerting user that his request is succesfully handled. -->
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
// View to load everything needed to do the NIST requests
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
      // Checking if the user is signed in. If not, he will be redirected to the login page.
      this.$store.dispatch("askSecure")
      .then((res) => {
        if(!res.data.secure){
          this.$router.push({name: 'Login/Register'})
        }
      })
      
    },

    watch: {
      //Watchers to check if anything happens in the different steps.
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
        // Watcher used to go to the next step. This value is saved in the store. And reset after step is increased.
        "$store.state.backToMenu": {
        handler: function(bool) {
          if (bool) {
            this.step++
            this.$store.dispatch("updateBackToMenu", false)

            console.log("Step: " + this.step)
            if( (this.step >= 4)){
              //After final step, requesting the store to send the request to the backend.
              this.$store.dispatch("sendFileNIST")
              this.step = 1
              //Showing the alert box.
              this.showsendbox = true
              //Hiding the alert box after 2 seconds.
              setTimeout(() => this.showsendbox = false, 2000)
            }

          }
        }
      },
    }
  }
</script>
