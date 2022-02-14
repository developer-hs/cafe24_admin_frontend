import callAPI from "../api/callAPI";
import store from "../store";
export default {
  namespaced: true,
  state: {
    groups: [],
    currentGroup: "전체",
    creatingGroupModal: false,
    addGroupModal: false,
    options: "",
    // data
  },
  getters: {
    // computed
  },
  mutations: {
    setGroups(state, groups) {
      state.groups = [];
      for (let i = 0; i < groups.length; i++) {
        state.groups.push(groups[i]);
      }
    },
    setCurrentGroup(state, currentGroup) {
      state.currentGroup = currentGroup;
    },

    setModalToggle(state, modal_type) {
      console.log(modal_type);
      if (modal_type === "create") {
        state.creatingGroupModal = !state.creatingGroupModal;
      } else if (modal_type === "add") {
        state.addGroupModal = !state.addGroupModal;
      }
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
  },
  actions: {
    requestAllGroups({ commit }) {
      callAPI("get", `/group?code=${store.state.auth.data.authorizeCode}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            commit("setGroups", response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createGroup({ commit, dispatch, state }, groupName) {
      callAPI("post", "/group/", {
        group_name: groupName,
        authorize_code: store.state.auth.data.authorizeCode,
        options: state.options,
      })
        .then((response) => {
          if (response.status === 200) {
            commit("optionsInit");
            dispatch("requestAllGroups");
          }
        })
        .catch((error) => console.log(error));
    },
    changeCurrentGroup({ commit, dispatch }, currentGroup) {
      commit("customer/pageInit", "", { root: true });
      commit("setCurrentGroup", currentGroup);
      dispatch("customer/requestPageCustomer", "", { root: true });
    },
    modalToggle({ commit }, modal_type) {
      commit("setModalToggle", modal_type);
    },
  },
};
