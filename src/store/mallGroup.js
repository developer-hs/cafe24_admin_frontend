import callAPI from "../api/callAPI";
import store from "../store";
export default {
  namespaced: true,
  state: { mallGroups: Array() },
  getters: {
    // computed
  },
  mutations: {
    setMallGroup(state, groups) {
      state.mallGroups = groups;
    },
  },
  actions: {
    requestCafe24Group() {
      callAPI(
        "post",
        `/group/mall/${store.state.auth.data.authorizeCode}/cafe24/`
      )
        .then((response) => {
          if (response.status === 200) {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    requestMallGroup({ commit }) {
      callAPI("get", `/group/mall/${store.state.auth.data.authorizeCode}/`)
        .then((response) => {
          if (response.status === 200) {
            commit("setMallGroup", response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
