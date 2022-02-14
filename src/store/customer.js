import callAPI from "../api/callAPI";
import store from "../store";
export default {
  namespaced: true,
  state: {
    paginator: [],
    page: 1,
    count: 0,
    loading: false,
    // data
  },
  getters: {
    // computed
  },
  mutations: {
    setPaginator(state, paginator) {
      state.paginator = paginator;
    },
    setCustomerCount(state, count) {
      state.count = count;
    },

    loadingExcute(state) {
      state.loading = true;
    },
    loadingEnd(state) {
      state.loading = false;
    },
    pageInit(state) {
      state.page = 1;
    },
  },
  actions: {
    // 새로가입한 고객정보 갱신
    requestCafe24Customer({ commit, dispatch }) {
      commit("loadingExcute");
      callAPI("post", `/customer/cafe24/`, {
        authorize_code: store.state.auth.data.authorizeCode,
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch("requestPageCustomer");
          }
        })
        .catch((error) => console.log(error));
    },
    // 고객정보를 paginator 로 받아옴
    requestPageCustomer({ commit, state }, order_by = "") {
      callAPI(
        "get",
        `/customer?code=${store.state.auth.data.authorizeCode}&group_name=${store.state.group.currentGroup}&page=${state.page}&order_by=${order_by}`
      )
        .then((response) => {
          if (response.status === 200) {
            commit("loadingEnd");
            commit("setPaginator", response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 고객정보 새로고침
    requestRefreshCustomer({ dispatch, commit }) {
      commit("loadingExcute");
      const group_name = store.state.group.currentGroup;

      callAPI(
        "put",
        group_name === "전체" ? "/customer/cafe24/" : "/customer/",
        {
          authorize_code: store.state.auth.data.authorizeCode,
          group_name: group_name,
        }
      )
        .then((response) => {
          if (response.status === 200) {
            dispatch("group/requestAllGroups");
            commit("loadingEnd");
            commit("requestPageCustomer");
          }
        })
        .catch((error) => console.log(error));
    },
    requestCustomerCnt({ commit }) {
      callAPI(
        "get",
        `/customer/cnt?code=${store.state.auth.data.authorizeCode}`
      )
        .then((response) => {
          if (response.status === 200) {
            commit("setCustomerCount", response.data.count);
          }
        })
        .catch((error) => console.log(error));
    },
    nextPage({ dispatch, state }) {
      state.page = state.paginator.page_number + 1;
      dispatch("requestPageCustomer");
    },
    prePage({ dispatch, state }) {
      state.page = state.paginator.page_number - 1;
      dispatch("requestPageCustomer");
    },
  },
};
