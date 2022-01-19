import callAPI from "../api/callAPI";

export default {
  namespaced: true,
  state: {
    mallId: "",
    redirectUri: "https://127.0.0.1:8080/oauth/redirect",
    clientId: "70ftsywwR63eulVGGO2fdT",
    state: "abc",
    scope:
      "mall.read_category,mall.write_category,mall.read_product,mall.write_product,mall.read_collection,mall.write_collection,mall.read_personal,mall.write_personal,mall.read_order,mall.write_order,mall.read_community,mall.write_community,mall.read_customer,mall.write_customer,mall.read_notification,mall.write_notification,mall.read_promotion,mall.write_promotion,mall.read_salesreport",
    // data
  },
  getters: {
    // computed
  },
  mutations: {
    setMallId(state, mallId) {
      state.mallId = mallId;
      console.log(state);
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
          if (response.state == 200) {
            console.log("correct");
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
