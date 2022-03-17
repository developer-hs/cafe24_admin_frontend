<template>
  <span class="data p-1 mr-1 font-size-13 font-weight-500">
    <slot name="data"></slot
  ></span>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.data {
  border: 1px solid #f1f5f8;
  border-radius: 25px;
  background-color: rgba(241, 245, 248, 0.5);
}
</style>
