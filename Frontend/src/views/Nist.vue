<template>
  <v-container>
    <!-- Start step 1 -->
      <div v-if="step == 1">
      <v-row>
          <v-col>
            <p class="text-h2 text-center">NIST</p>
            <p class="text-subtitle-1 text-center">
              Upload ur file here
            </p>
          </v-col>
        </v-row>

        <v-row>
            <v-col class="d-flex pb-0" >
              <v-text-field
                class="mr-14"
                label="Stream Length (Length of the individual bit stream(s) to be processed"
                hide-details="auto"
                v-model="strlength"
              ></v-text-field>
            </v-col>
          </v-row>

        <v-row>
              <v-col class="pt-0" >
                <v-file-input
                label="Upload file here" 
                v-model="file">
                </v-file-input>
              </v-col>
        </v-row>

        <v-alert
        class="ma-3"
        v-if="notgood"
        shaped
        prominent
        type="warning"
      >
        Please fill in everything
      </v-alert>
        
        <v-row  class="ma-4 justify-space-around">
          <v-btn @click="sendFile" dark color="black">Submit file</v-btn>
        </v-row>
      </div>
      <!-- end Step 1 -->
      <!-- start Step 2 -->
      <div v-if="step == 2">
        <statical-tests/>
      </div>
      <!-- end Step 2 -->
      <!-- start Step 3 -->
      <div v-if="step == 3">
        <parameter-adjustments/>
      </div>

  

  </v-container>
</template>

<script>

import StaticalTests from '@/components/StaticalTests.vue'
import ParameterAdjustments from '@/components/ParameterAdjustments.vue'

  export default {
  components: { StaticalTests, ParameterAdjustments },
    name: 'NIST',
    data()
    {
      return{
        step: 1,
        file:null,
        strlength:null,
        notgood: false, 
      }
    },
    methods: {
      sendFile()
      {
        if(this.strlength == null || this.file == null){
          this.notgood = true
        } else 
        {
          this.notgood = false
          let form = new FormData();
          form.append("strlength", this.strlength)
          form.append("recfile",this.file)
          this.step++;
          
        }
      },

      clearData(){
      this.$store.state.QRValue = ""
      Object.keys(this.$data).forEach(key => {
        this.$data[key] = ""
      })
      this.file = null
    },
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
