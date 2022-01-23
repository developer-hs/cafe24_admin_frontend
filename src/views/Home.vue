<template>
  <div class="d-flex">
    <Sidebar></Sidebar>
    <Dashboard></Dashboard>
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "./Dashboard.vue";
export default {
  components: { Sidebar, Dashboard },
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
  background-color: #1c3faa;
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
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  background-clip: content-box, padding-box;
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
</style>
