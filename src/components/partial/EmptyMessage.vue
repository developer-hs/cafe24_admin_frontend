<template>
  <b-col
    cols="12"
    class="d-flex justify-content-center align-items-center h-10 p-5"
  >
    <b-icon :icon="icon" class="mr-1" variant="secondary"></b-icon>
    <span class="font-size-15"><slot name="message"></slot></span>
  </b-col>
</template>
<script>
export default {
  props: ["icon"],
};
</script>
