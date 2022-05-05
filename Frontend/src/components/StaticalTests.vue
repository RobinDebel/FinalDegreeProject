<template>
  <v-container>
    <v-row >
      <v-col
        cols="15"
        sm="4"
        
      
      >
        <v-card class="pa-2 mb-2">
          [01] Frequency
        </v-card> 
        
        <v-card class="pa-2 mb-2" >
          [03] Cumulative Sums
        </v-card> 

        <v-card class="pa-2 mb-2">
          [05] Longest Run of Ones
        </v-card> 

        <v-card class="pa-2 mb-2">
          [07] Discrete Fourier Transform
        </v-card> 
        
        <v-card class="pa-2 mb-2">
          [09] Overlapping Template Matchings
        </v-card>        
        
        <v-card class="pa-2 mb-2">
          [11] Approximate Entropy
        </v-card> 

        <v-card class="pa-2 mb-2">
          [13] Random Excursions Variant
        </v-card> 

        <v-card class="pa-2 mb-2">
          [15] Linear Complexity
        </v-card> 
        
        
      </v-col>

            <v-col
        cols="15"
        sm="4"
      >
        <v-card class="pa-2 mb-2">
          [02] Block Frequency
        </v-card>

        <v-card class="pa-2 mb-2">
          [04] Runs
        </v-card>

        <v-card class="pa-2 mb-2">
          [06] Rank
        </v-card>

        <v-card class="pa-2 mb-2">
          [08] Nonperiodic Template Matchings 
        </v-card>

        <v-card class="pa-2 mb-2">
          [10] Universal Statistical
        </v-card>

        <v-card class="pa-2 mb-2">
          [12] Random Excursions
        </v-card>

        <v-card class="pa-2 mb-2">
          [14] Serial
        </v-card>
      </v-col>



    </v-row>

    <v-row>
      <v-col class="d-flex pb-0">
        <v-text-field
          class="mr-16"
          label="Choose here what Statistical Test You Want To Use"
          hide-details="auto"
          v-model="stats"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row  class="ma-4 mt-8 justify-space-around">
      <v-btn @click="sendStats" dark color="black">Submit Statistical Test</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: 'NIST',
    data()
    {
      return{
        sendStats:null,
        notgood: false, 
      }
    },
    methods: {
      sendFile()
      {
        if(this.sendStats == null){
          this.notgood = true
        } else 
        {
          this.notgood = false
          let form = new FormData();
          form.append("sendStats", this.sendStats)
          this.clearData()
          this.$store.dispatch("sendFileNIST", form);
        }
      }
    }
}


</script>