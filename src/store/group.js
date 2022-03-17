import callAPI from "../api/callAPI";
import store from "../store";
export default {
  namespaced: true,
  state: {
    paginator: Array(),
    groups: Array(),
    currentGroup: { id: "", name: "전체", created_by: "", options: "" },
    checkedCustomers: Array(),
    prepareAddCustomers: Array(),
    includingGroup: Number(),
    options: "",
    page: 1,
    order_by: "",
    search: "",
    updating: false,
    editGroupModal: false,
    includingGroupModal: false,
    // data
  },
  getters: {
    // computed
  },
  mutations: {
    setPaginator(state, paginator) {
      state.paginator = paginator;
    },
    setGroups(state, groups) {
      state.groups = [];
      for (let i = 0; i < groups.length; i++) {
        state.groups.push(groups[i]);
      }
    },
    setOrderBy(state, ordering) {
      state.order_by = ordering;
    },
    setSearch(state, searching) {
      state.search = searching;
    },
    setCurrentGroup(state, group) {
      state.currentGroup = group;
    },
    setIncludingGroup(state, group_pk) {
      state.includingGroup = group_pk;
    },
    setPrepareCustomer(state, customer) {
      state.prepareAddCustomers.push(customer);
    },
    initChecked(state) {
      state.checkedCustomers.forEach((checkedCustomer) => {
        state.paginator.results.forEach((customer) => {
          if (customer.id === checkedCustomer.id) {
            customer.checked = true;
          }
        });
      });
    },
    checkedToggle(state, id) {
      const customers = state.paginator.results;
      customers.forEach((customer) => {
        if (customer.id === id) {
          customer.checked = !customer.checked;
          if (customer.checked === true) {
            state.checkedCustomers.push(customer);
          } else {
            state.checkedCustomers = state.checkedCustomers.filter(
              (checkedCustomer) => checkedCustomer.id !== customer.id
            );
          }
        }
      });
    },
    allChecked(state, check) {
      const customers = state.paginator.results;
      customers.forEach((customer) => {
        customer.checked = check;
      });
    },
    modalToggle(state, modal_type) {
      if (modal_type === "edit") {
        state.editGroupModal = !state.editGroupModal;
      } else if (modal_type === "add") {
        state.includingGroupModal = !state.includingGroupModal;
      }
    },
    updatingToggle(state, boolean) {
      state.updating = boolean;
    },
    setOptions(state, options) {
      if (!state.options) {
        state.options += options;
      } else {
        state.options += `,${options}`;
      }
    },
    optionsInit(state) {
      state.options = "";
    },
    pageInit(state) {
      state.page = 1;
    },
  },
  actions: {
    // 고객정보를 paginator 로 받아옴
    requestPageCustomer({ commit, state }) {
      callAPI(
        "get",
        `/group/customer/${store.state.auth.data.authorizeCode}/${state.currentGroup.id}?&page=${state.page}&group_name=${state.currentGroup.name}&order_by=${state.order_by}&search=${state.search}`
      )
        .then((response) => {
          if (response.status === 200) {
            commit("customer/loadingEnd", {}, { root: true });
            commit("setPaginator", response.data);
            commit("initChecked");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    includingCustomer({ state }) {
      callAPI(
        "post",
        `/group/customer/${store.state.auth.data.authorizeCode}/${state.includingGroup}/`,
        {
          customers: state.prepareAddCustomers,
        }
      )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    requestAllGroups({ state, commit, dispatch }) {
      callAPI("get", `/group/${store.state.auth.data.authorizeCode}/`)
        .then((response) => {
          if (response.status === 200) {
            commit("setGroups", response.data);
            commit("setCurrentGroup", state.groups[0]);
            dispatch("requestPageCustomer");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createGroup({ commit, dispatch, state }, groupName) {
      callAPI("post", `/group/${store.state.auth.data.authorizeCode}/`, {
        group_name: groupName,
        options: state.options,
      })
        .then((response) => {
          if (response.status === 201) {
            commit("optionsInit");
            dispatch("requestAllGroups");
          }
        })
        .catch((error) => console.log(error));
    },
    updateGroup({ state, dispatch, commit }, groupName) {
      callAPI(
        "put",
        `/group/${store.state.auth.data.authorizeCode}/${state.currentGroup.id}/`,
        {
          name: groupName,
          options: state.options,
        }
      )
        .then(() => {
          commit("optionsInit");
          dispatch("requestAllGroups");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteGroup({ state, dispatch }, id) {
      callAPI("delete", `/group/${store.state.auth.data.authorizeCode}/${id}`)
        .then(() => {
          dispatch("requestAllGroups");
          dispatch("changeCurrentGroup", state.groups[0]);
        })
        .catch((error) => console.log(error));
    },
    changeCurrentGroup({ commit, dispatch }, group) {
      commit("pageInit");
      commit("setCurrentGroup", group);
      dispatch("requestPageCustomer");
    },
    setOrdering({ commit, dispatch }, ordering) {
      commit("setOrderBy", ordering);
      dispatch("requestPageCustomer");
    },
    setSearching({ commit, dispatch }, searching) {
      commit("setSearch", searching);
      dispatch("requestPageCustomer");
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
