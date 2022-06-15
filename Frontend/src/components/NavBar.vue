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
      //Logging out the user when logout button is pressed.
      this.$store.dispatch("logout")
      this.$router.push({name: 'Login/Register'})


    },
    updateNavBar(){
      //Updating the navbar when the user logs in or out.
      if(this.logout){
        this.links = ["NIST", "CMC", "Profile"]
      } else {
        this.links = ["Login/Register" ]
      }

    }
    
  },

  watch: {
    "$store.state.secure":{
      //Watching state of secure in the store, if it changes, update the navbar.
      handler: function (nv) {
        this.logout = nv
        this.updateNavBar()
      }

    }
  },

  created(){
    //Updating the navbar when the user logs in or out.
    this.$store.dispatch("askSecure")
    .then((res) => {
      this.logout = res.data.secure
      this.updateNavBar()
    })
    
    
  }
};
</script>
