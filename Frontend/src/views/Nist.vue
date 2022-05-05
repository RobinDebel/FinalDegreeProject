<template>
  <h1>Implement NIST here</h1>
</template>

<script>



  export default {
    name: 'NIST',


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
