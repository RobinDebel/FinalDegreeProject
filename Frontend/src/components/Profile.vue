<template>
    <div class="d-flex">
        <v-card
        class="mx-auto my-12 justify-center"
        >

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