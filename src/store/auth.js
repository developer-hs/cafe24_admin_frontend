import callAPI from "../api/callAPI";
import router from "../router";
export default {
  namespaced: true,
  state: {
    data: {
      mallId: "",
      redirectUri: "https://127.0.0.1:8080/oauth/redirect",
      clientId: "jtKX97TqPJfV5qfeJ13lHN",
      state: "abc",
      scope: "mall.read_product,mall.read_privacy",
      authorizeCode: "",
    },
    route: {
      showingRouteName: "Dashboard",
    },

    // data
  },
  getters: {
    // computed
  },
  mutations: {
    setMallId(state, mallId) {
      state.data.mallId = mallId;
    },
    setShowingRouteName(state, routeName) {
      state.route.showingRouteName = routeName;
    },
    setAuthorizeCode(state, authorizeCode) {
      state.data.authorizeCode = authorizeCode;
    },
  },
  actions: {
    requestAccessToken({ commit, state }, authorize_code) {
      callAPI("post", "/user/token/access/", {
        mall_id: state.data.mallId,
        authorize_code: authorize_code,
        redirect_uri: state.data.redirectUri,
        client_id: state.data.clientId,
      })
        .then((response) => {
          if (response.status == 200) {
            commit("setAuthorizeCode", authorize_code);
            router.push({ name: "Home" });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
