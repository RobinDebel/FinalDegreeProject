<template>
    <v-container>
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
    </v-container>
</template>

<script>
//Nist upload component, used to upload a the NIST file to the server.
export default {
    name: 'FILEUPLOAD',
    data(){
      return{
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
                this.$store.dispatch("pushInputs", this.strlength)
                this.$store.dispatch("updateFile", this.file)
                this.$store.dispatch("updateBackToMenu", true)
            }
        }   

    },
    created(){
        this.$store.dispatch("resetNIST")
    } 
};
</script>

