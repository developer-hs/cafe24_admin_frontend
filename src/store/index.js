import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";
import product from "./product";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    product: product,
  },
  plugins: [createPersistedState({ paths: ["auth"] })],
});
