import callAPI from "../api/callAPI";
import router from "../router";
export default {
  namespaced: true,
  state: {
    mallId: "",
    redirectUri: "https://127.0.0.1:8080/oauth/redirect",
    clientId: "70ftsywwR63eulVGGO2fdT",
    state: "abc",
    scope: "mall.read_product",
    // data
  },
  getters: {
    // computed
  },
  mutations: {
    setMallId(state, mallId) {
      state.mallId = mallId;
    },
  },
  actions: {
    requestAccessToken({ state }, authorize_code) {
      callAPI("post", "/user/token/access/", {
        mall_id: state.mallId,
        authorize_code: authorize_code,
        redirect_uri: state.redirectUri,
        client_id: state.clientId,
      })
        .then((response) => {
          if (response.status == 200) {
            router.push({ name: "Home" });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
