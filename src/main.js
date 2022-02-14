import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import BootstrapVue3 from "bootstrap-vue-3";
import cssVars from "css-vars-ponyfill";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";
// Optional, since every component import their Bootstrap funcionality
// the following line is not necessary
// import 'bootstrap'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

cssVars();
const app = createApp(App);

app.use(store);
app.use(router);
app.use(BootstrapVue3);
app.use(Vue3ChartJs, { plugins: [zoomPlugin] });
app.mount("#app");
