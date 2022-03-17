import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";
import cart from "./cart";
import customer from "./customer";
import group from "./group";
import mallGroup from "./mallGroup";
import product from "./product";
import profile from "./profile";
import sms from "./sms";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    product: product,
    customer: customer,
    group: group,
    cart: cart,
    profile: profile,
    sms: sms,
    mallGroup: mallGroup,
  },
  plugins: [createPersistedState({ paths: ["auth", "profile"] })],
});
