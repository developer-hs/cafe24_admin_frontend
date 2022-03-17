<template>
  <b-dropdown-item @click="setOrdering(`-${orderBy}`)">
    <span class="ml-1 font-weight-700 font-size-13">오름차순 정렬</span>
  </b-dropdown-item>
  <b-dropdown-item href="#" @click="setOrdering(orderBy)">
    <span class="ml-1 font-weight-700 font-size-13">내림차순 정렬</span>
  </b-dropdown-item>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["orderBy"],
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      setOrdering: "group/setOrdering",
    }),
  },
};
</script>
