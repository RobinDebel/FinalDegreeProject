<template>
<div class="d-flex justify-center ">
   <div class="d-flex flex-column justify-center " style="maxWidth: 500px">
    <p class="d-flex justify-center"> Last result: <b>{{ result }}</b> </p>
    <qrcode-stream class="d-flex justify-center" @decode="onDecode" @init="onInit"></qrcode-stream>
    <h3 class="d-flex justify-center" v-if="loading">Scanner loading...</h3>
  </div>
</div>
 
</template>

<script>
export default {
  name: "Scanner",

  data() {
    return {
      result: "",
      error: "",
      loading: false,
    };
  },

  methods: {
    onDecode(result) {
      this.result = result;
      this.$store.dispatch("saveQRValue", result);
      this.$router.push({ name: 'AddDevice'});
    },

    async onInit(promise) {
      this.loading = true;

      try {
        await promise;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>