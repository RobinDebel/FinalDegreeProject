<template>
  <v-app id="App">
    
    <!-- Navbar on the top of the page for navigating. -->
    <nav-bar/>

    <v-main class="grey lighten-2">
      <v-container>
        <!-- Router page that comes from the  router/index.js-->
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar';
export default {
  components: { NavBar}
};
</script>