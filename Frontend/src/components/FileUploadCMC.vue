<template>
    <v-container>
        <v-row>
            <v-col>
                <p class="text-h2 text-center">NGSPICE</p>
                <p class="text-subtitle-1 text-center">
                Upload ur file here
                </p>
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
export default {
    name: 'FileUploadCMC',
    data(){
      return{
        file:null,
        notgood: false, 
        showsendbox: false,
      }
    },
    methods: {
        sendFile()
        {
            if(this.file == null){
                this.notgood = true
            } else 
            {
                this.$store.dispatch('updateCMCFile', this.file)
                this.$store.dispatch('sendFileCMC')
                this.file = null
                this.showsendbox = true
                setTimeout(() => this.showsendbox = false, 2000)
            }
        }   

    },
    created(){
        this.$store.dispatch("resetCMC")
    } 
};
</script>

