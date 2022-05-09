<template>
  <v-container>
    <v-row>
      <div class="pb-7">
        <h1 class="">Parameter Adjustments</h1>
      </div>
    </v-row>
    <v-col cols="15" sm="6">
    <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [1] Block Frequency Test - block length(M)
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="BFT"> </v-text-field>
          </v-col>
        </v-row>
    </v-card>
        
    <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [2] NonOverlapping Template Test - block length(m)
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="NTT"> </v-text-field>
          </v-col>
        </v-row>
    </v-card>

        

    <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [3] Overlapping Template Test - block length(m)
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="OTT"> </v-text-field>
          </v-col>
        </v-row>
    </v-card>
    <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [4] Approximate Entropy Test - block length(m)
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="AET"> </v-text-field>
          </v-col>
        </v-row>
    </v-card>
        <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [5] Serial Test - block length(m)
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field   v-model="ST"> </v-text-field>
          </v-col>
        </v-row>
    </v-card>
        <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [6] Linear Complexity Test - block length(M)
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="LCT"> </v-text-field>
          </v-col>
        </v-row>
    </v-card>
    <v-card class="pa-2 mt-10">
        <v-row align="center">
          <v-col cols="10" sm="6">
            How many bitsteams?
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="BIT"> </v-text-field>
          </v-col>
        </v-row>
    </v-card>
    <h3 class="mt-10" > Input File Format </h3>

    <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [0] ASCII - A sequence of ASCII 0's and 1's
          </v-col>
          <v-col cols="12" sm="6">
            
          </v-col>
        </v-row>
    </v-card>

    <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            [1] Binary - Each byte in data file contains 8 bits of data
          </v-col>
          <v-col cols="12" sm="6">
          </v-col>
        </v-row>
    </v-card>
    <v-text-field 
    v-model="INPUT"
    label="Choice">
    </v-text-field>
    <v-row  class="ma-4 mt-8 justify-space-around">
      <v-btn @click="fileformat" dark color="black">INPUT</v-btn>
    </v-row>

    </v-col>
  </v-container>
</template>

<script>
export default {
  name:"PARAMETERADJUSTMENTS",
  data(){
    return{
      BFT: 128,
      NTT: 9,
      OTT: 9,
      AET: 10,
      ST: 16,
      LCT: 500,
      BIT: null,
    }
  }
};
</script>
