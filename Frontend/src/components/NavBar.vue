<template>
  <v-app-bar app color="black" flat>
    <v-container class="py-0 fill-height">
      <v-btn :exact="true" v-for="link in links" :key="link" :to="{ name: link }" text color="white">
        {{ link }}
      </v-btn>
      <v-btn v-if="logout" @click="logoutfunction" text color="white">
        Logout
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      links: ["Login/Register"],
      logout: null,
    };
  },

  methods: {
    logoutfunction(){
      this.$store.dispatch("logout")
      this.$router.push({name: 'Login/Register'})


    },
    updateNavBar(){
      if(this.logout){
        this.links = ["Home", "NIST", "CMC" ,   "Profile"]
      } else {
        this.links = ["Login/Register" ]
      }

    }
    
  },

  watch: {
    "$store.state.secure":{
      handler: function (nv) {
        this.logout = nv
        this.updateNavBar()
      }

    }
  },

  created(){
    this.$store.dispatch("askSecure")
    .then((res) => {
      this.logout = res.data.secure
      this.updateNavBar()
    })
    
    
  }
};
</script>
