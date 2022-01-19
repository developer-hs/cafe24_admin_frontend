<template>
  <div class="center">
    <b-card class="w-25">
      <b-form @submit="getAuthorizationCode" v-if="show">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.mall_id"
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
        mall_id: "rlagudtjq2016",
      },
      show: true,
    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
    }),
  },
  methods: {
    ...mapMutations({
      setMallId: "auth/setMallId",
    }),
    getAuthorizationCode(event) {
      event.preventDefault();
      this.setMallId(this.form.mall_id);
      window.open(
        `https://${this.form.mall_id}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=${this.auth.client_id}&state=${this.auth.state}&redirect_uri=${this.auth.redirect_uri}&scope=${this.auth.scope}`
      );
    },
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
