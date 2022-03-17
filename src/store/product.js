import callAPI from "../api/callAPI";
import store from "../store";
export default {
  namespaced: true,
  state: { count: 0 },
  getters: {
    // computed
  },
  mutations: {
    setProductsCnt(state, count) {
      state.count = count;
    },
  },
  actions: {
    requestCafe24Products() {
      callAPI(
        "post",
        `/product/info/${store.state.auth.data.authorizeCode}/cafe24/`
      )
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    requestCafe24RefreshProducts() {
      callAPI(
        "put",
        `/product/info/${store.state.auth.data.authorizeCode}/cafe24/`
      )
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    requestProductsCnt({ commit }) {
      callAPI(
        "get",
        `/product/info/${store.state.auth.data.authorizeCode}/cnt/`
      )
        .then((response) => {
          if (response.status === 200) {
            commit("setProductsCnt", response.data.count);
          }
        })
        .catch((error) => console.log(`requestProductsCnt Error : ${error}`));
    },
  },
};
