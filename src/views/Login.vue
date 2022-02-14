<template>
  <div class="center">
    <b-card class="w-25">
      <b-form @submit="getAuthorizationCode" v-if="show">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.mallId"
            type="text"
            placeholder="cafe24 아이디를 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-button block type="submit" variant="primary" style="width: 100%"
          >Submit</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        defaultRoute: "Dashboard",
        mallId: "dalnimdalring",
      },
      show: true,
    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth.data,
    }),
  },
  methods: {
    ...mapMutations({
      setMallId: "auth/setMallId",
      setShowingRouteName: "auth/setShowingRouteName",
    }),
    getAuthorizationCode(event) {
      event.preventDefault();
      this.setMallId(this.form.mallId);
      console.log(this.auth);
      location.href = `https://${this.form.mallId}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=${this.auth.clientId}&state=${this.auth.state}&redirect_uri=${this.auth.redirectUri}&scope=${this.auth.scope}`;
    },
  },
  mounted() {
    this.setShowingRouteName(this.defaultRoute);
  },
};
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;
  align-items: center;
}
</style>
