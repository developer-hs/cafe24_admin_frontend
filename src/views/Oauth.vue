<template>
  <Loading>
    <template #explain>권한받는중 ...</template>
  </Loading>
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../components/partial/Loading.vue";
export default {
  components: { Loading },
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
