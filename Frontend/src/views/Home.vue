<template>
  <h1>Implement here</h1>
</template>

<script>
// Homepage that is not used in the project, due to time constraints.
  export default {
    name: 'Home',

    beforeCreate() {

      this.$store.dispatch("askSecure")
      .then((res) => {
        if(!res.data.secure){
          this.$router.push({name: 'Login/Register'})
        }else{
          
          this.$router.push({name: 'NIST'})
        }
      })
      
    }
  }
</script>
