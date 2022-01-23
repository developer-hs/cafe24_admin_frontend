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
    requestProductsCnt({ commit }) {
      callAPI("post", "/product/info/cnt/", {
        mall_id: store.state.auth.mallId,
      })
        .then((response) => {
          if (response.status === 200) {
            commit("setProductsCnt", response.data.count);
          }
        })
        .catch((error) => console.log(`requestProductsCnt Error : ${error}`));
    },
  },
};
