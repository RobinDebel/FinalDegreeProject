<template>
  <v-container>
    <v-card color="#F0F2F4" elevation="5">
      <v-row>
        <v-col>
          <p class="text-h2 text-center">Add a Device</p>
          <p class="text-subtitle-1 text-center">
            You can create ur device here!
          </p>
        </v-col>
      </v-row>
      <v-divider />
      <v-form ref="form" class="mx-4">
        
        <v-row>
          <v-col class="d-flex pb-0" >
            <v-text-field
              class="mr-14"
              label="Device ID"
              hide-details="auto"
              v-model="deviceid"
            ></v-text-field>
            <v-btn color="black" dark large class="mt-3 mr-8" :exact="true" :to="{ name: 'QRScanner' }">use QR</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pt-0">
            <v-text-field
              class="pt-0"
              label="Device Name"
              hide-details="auto"
              v-model="devicename"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pt-0">
            <v-text-field
              label="Description"
              hide-details="auto"
              v-model="description"
            ></v-text-field>
          </v-col>
        </v-row>


        <v-row>
          <v-col class="pt-0" cols="12" sm="4" md="5">
            <v-text-field
              label="latitude"
              hide-details="auto"
              v-model="latitude"
            ></v-text-field>
          </v-col>
          <v-col class="pt-0" cols="12" sm="4" md="5">
            <v-text-field
              label="longitude"
              hide-details="auto"
              v-model="longitude"
              @keydown.enter="FormatLatLong"
              @blur="FormatLatLong"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="2" class="d-flex align-center">
              <v-btn @click="getLocation" block dark color="vlack">Use GPS</v-btn>
          </v-col>
          
        </v-row>

        <v-row>
            <v-col>
              <v-file-input
              label="Add Picture" 
              v-model="file">
              </v-file-input>
            </v-col>
          </v-row>


      </v-form>

      <v-alert
      class="ma-3"
      v-if="notgood"
      shaped
      prominent
      type="warning"
    >
      Please fill in everything
    </v-alert>

      <v-row>
        <v-col class="text-center">
          <v-divider />
          <v-btn @click="sendData" large color="black" dark class="mt-3">
            <v-icon> mdi-plus </v-icon>
            Add Device
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>

<script>

export default {
  name: "AddDevicePage",
  data() {
    return {
      deviceid: "",
      devicename: "",
      longitude: "",
      latitude: "",
      description: "",
      file: null,
      notgood: false,
    };
  },
  methods: {
    sendData() {

        this.$refs.form.validate()
        this.notgood=false

        if(this.deviceid == ""|| this.devicename == "" || this.longitude == "" || this.latitude == "" || this.description == "" || this.file == null)
        {
          this.notgood = true
        }
        
        if(!this.notgood){
          let form = new FormData();
          form.append("deviceid", this.deviceid)
          form.append("devicename", this.devicename)
          form.append("longitude", this.longitude)
          form.append("latitude", this.latitude)
          form.append("description", this.description)
          form.append("image", this.file)
          this.clearData()
          this.$store.dispatch("addDevice", form);
          this.$router.push({name: 'Home'})
        }

    },

    getLocation(){
      this.$getLocation()
      .then(coordinates => {
        this.longitude = coordinates.lng
        this.latitude = coordinates.lat
        this.FormatLatLong()
      });
      
    },

    clearData(){
      this.$store.state.QRValue = ""
      Object.keys(this.$data).forEach(key => {
        this.$data[key] = ""
      })
      this.file = null
      this.$store.dispatch('paramId', null)
    },

    FormatLatLong() {
      this.latitude = Number(this.latitude).toFixed(7);
      this.longitude = Number(this.longitude).toFixed(7);
    },

  
  },

  created(){
    if(this.$store.state.QRValue){
      this.deviceid = this.$store.state.QRValue
    }
    
    if(this.$store.state.paramid){
      this.deviceid = this.$store.state.paramid

    }
  },

  



  
};
</script>
