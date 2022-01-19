<template>
  <div>{{ $route.query.code }}</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Oauth",
  methods: {
    ...mapActions("auth", ["requestAccessToken"]),
    requestAccessToken() {
      console.log(this.$route.query.code);
      this.$store.dispatch("auth/requestAccessToken", this.$route.query.code);
    },
  },
  mounted() {
    this.requestAccessToken();
  },
};
</script>
