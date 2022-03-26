<template>
  <v-app id="App">
    
    <nav-bar/>

    <v-main class="grey lighten-2">
      <v-container>
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