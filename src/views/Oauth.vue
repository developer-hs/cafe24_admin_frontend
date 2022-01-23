<template>
  <b-col class="loading">
    <b-icon icon="three-dots" animation="spin-pulse" font-scale="4"></b-icon>
    <div>
      <span>권한 받는 중...</span>
    </div>
  </b-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Oauth",
  methods: {
    ...mapActions("auth", ["requestAccessToken"]),
    requestAccessToken() {
      this.$store.dispatch(
        "auth/requestAccessToken",
        this.$route.query.code,
        this.$router
      );
    },
  },
  mounted() {
    this.requestAccessToken();
  },
};
</script>
<style>
html body {
}

.loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
