<template>
    <v-container>

        <h3> 
            INSTRUCTIONS
        </h3>
        
        <v-card class="pa-2 mb-2">
        <v-row align="center">
          <v-col cols="10" sm="6">
            Should the numbered statistical
            test be applied to each sequence.
          </v-col>
          <v-col cols="12" sm="6">
            <v-checkbox
            v-model="each"
            ></v-checkbox>
          </v-col>
        </v-row>
        </v-card>
        <v-row  class="ma-4 mt-8 justify-space-around">
            <v-btn @click="Submit" dark color="black">Submit</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name:"EACHSEQUENCE",
  data(){
    return{
     each: false,
    }
  }

}
</script>

<style>

</style>