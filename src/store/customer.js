import callAPI from "../api/callAPI";
import store from "../store";
export default {
  namespaced: true,
  state: {
    count: 0,
    loading: false,

    // data
  },
  getters: {
    // computed
  },
  mutations: {
    setCustomerCount(state, count) {
      state.count = count;
    },

    loadingExcute(state) {
      state.loading = true;
    },
    loadingEnd(state) {
      state.loading = false;
    },
  },
  actions: {
    // 새로가입한 고객정보 갱신
    requestCafe24Customer({ commit, dispatch }) {
      commit("loadingExcute");
      callAPI(
        "post",
        `/customer/${store.state.auth.data.authorizeCode}/cafe24/`
      )
        .then((response) => {
          if (response.status === 200) {
            dispatch("group/requestPageCustomer", {}, { root: true });
          }
        })
        .catch(() => {
          window.alert("인증 토큰이 만료되었습니다.");
          return (window.location.href = "https://127.0.0.1:8080/auth/login");
        });
    },

    // 고객정보 새로고침
    requestRefreshCustomer({ dispatch, commit }) {
      commit("loadingExcute");
      const group_name = store.state.group.currentGroup.name;

      callAPI(
        "put",
        group_name === "전체"
          ? `/customer/${store.state.auth.data.authorizeCode}/cafe24/`
          : `/group/customer/${store.state.auth.data.authorizeCode}/${store.state.group.currentGroup.id}/`,
        {
          authorize_code: store.state.auth.data.authorizeCode,
          group_name: group_name,
        }
      )
        .then((response) => {
          if (response.status === 200) {
            dispatch("group/requestAllGroups", "", { root: true });
            commit("loadingEnd");
            dispatch("group/requestPageCustomer", {}, { root: true });
          }
        })
        .catch((error) => console.log(error));
    },
    requestCustomerCnt({ commit }) {
      callAPI(
        "get",
        `/customer/info/${store.state.auth.data.authorizeCode}/cnt/`
      )
        .then((response) => {
          if (response.status === 200) {
            commit("setCustomerCount", response.data.count);
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
