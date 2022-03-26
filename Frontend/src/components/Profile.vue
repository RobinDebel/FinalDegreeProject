<template>
    <div class="d-flex">
        <v-card
        class="mx-auto my-12 justify-center"
        >
            <img :src="Picture"
            height= 350px> 
            <v-card-title>{{user.username}}</v-card-title>
            <v-card-text>Email: {{user.email}}</v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Profile',
   
    computed:{
        user(){
            return this.$store.state.user
        },
        Picture(){
            return process.env.VUE_APP_BACKEND_BASE_URL +"/"+ this.$store.state.user.filename
        }
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