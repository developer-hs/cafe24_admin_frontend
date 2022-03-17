<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // HelloWorld,
  },
};
</script>

<style>
@import url("./assets/styles/init.css");
* {
  font-family: source-han-sans-korean, sans-serif;
  font-style: normal;
  font-weight: 200;
}
</style>
