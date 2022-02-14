<template>
  <div class="d-flex p-0 m-0">
    <Sidebar></Sidebar>
    <Dashboard v-if="routeName === 'Dashboard'"></Dashboard>
    <Customer v-if="routeName === 'Customer'"></Customer>
    <Product v-if="routeName === 'Product'"></Product>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "./Dashboard.vue";
import Product from "./Product/Product.vue";
import Customer from "./Customer/Customer.vue";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({ routeName: (state) => state.auth.route.showingRouteName }),
  },
  components: { Sidebar, Dashboard, Product, Customer },
};
</script>

<style>
* {
  background-image: linear-gradient(
      to bottom,
      rgba(rgba(28, 63, 170, 1)) 0%,
      rgba(rgba(28, 63, 170, 1)) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(rgba(28, 63, 170, 1)) 0%,
      rgba(rgba(28, 63, 170, 1)) 100%
    );
}

html body {
  background-color: #1e3a8a;
  overflow-x: hidden;
  padding: 0.75rem 2rem;
  font-family: Roboto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 1;
  color: rgb(var(--color-slate-800) / var(--tw-text-opacity));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
ul {
  list-style: none;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}

a {
  color: black;
}

.devider-horizontal {
  border-top: 1px solid #ccc;
  width: 100%;
}

.devider-vertical {
  border-left: 1px solid #ccc;
  height: 100%;
}
.menu-name {
  margin-top: 0.785rem;
  margin-left: 0.785rem;
}
</style>
