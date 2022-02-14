import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";
import customer from "./customer";
import group from "./group";
import product from "./product";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    product: product,
    customer: customer,
    group: group,
  },
  plugins: [createPersistedState({ paths: ["auth"] })],
});
