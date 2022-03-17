import callAPI from "../api/callAPI";
import store from "../store";

export default {
  namespaced: true,
  state: {
    id: "",
    profile: {},
  },
  getters: {
    // computed
  },
  mutations: {
    setCustomerInfo(state, result) {
      state.profile = result;
    },
    setId(state, id) {
      state.id = id;
    },
  },
  actions: {
    requestProfileInfo({ state, commit }) {
      callAPI(
        "get",
        `/profile/${store.state.auth.data.authorizeCode}/info/${state.id}`
      )
        .then((response) => {
          commit("setCustomerInfo", response.data);
        })
        .catch((error) => console.log(error));
    },
    setCustomerId({ commit }, id) {
      commit("setId", id);
      commit("auth/setShowingRouteName", "Profile", { root: true });
    },
  },
};
