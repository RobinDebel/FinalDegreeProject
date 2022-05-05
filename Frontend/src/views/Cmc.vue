<template>
  <h1>Implement CMC here</h1>
</template>

<script>



  export default {
    name: 'CMC',


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
