<template>
  <div class="content">
    <div class="top-bar">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <b-col cols="9"><slot name="main-left"></slot></b-col>
      <b-col cols="3"><slot name="main-right"></slot></b-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.content {
  margin: 0 15px;
  flex: 1 1 0%;
  min-height: 100vh;
  min-width: 0;
  padding-bottom: 2.5rem;
  border-radius: 30px;
  padding: 0 22px;
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
  height: 67px;
  z-index: 51;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  position: relative;
  background-color: transparent;
}

.main {
  padding: 20px;
}
</style>
