<template>
  <div class="content">
    <div class="top-bar">
      <a>Application</a>
      <span class="right_angle">></span>
      <a>{{ showingRouteName }}</a>
      <slot name="header"> </slot>
    </div>
    <b-col cols="12">
      <slot name="main"></slot>
    </b-col>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      showingRouteName: (state) => state.auth.route.showingRouteName,
    }),
  },
};
</script>
<style scoped>
.content {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0.75rem 1rem 0.75rem 0;
  z-index: 1;
  flex: 1 1 0%;
  min-height: 100vh;
  min-width: 0;
  border-radius: 30px;
  --tw-bg-opacity: 1;
  background-color: rgba(241, 245, 248, var(--tw-bg-opacity));
}
.content:before {
  content: "";
  display: block;
  height: 1px;
  width: 100%;
}

.top-bar {
  height: 50px;
  padding: 0 22px;
  z-index: 51;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  position: relative;
  background-color: transparent;
}

.right_angle {
  padding: 0 10px;
}
</style>
