<template>
  <Content>
    <template #main> </template>
  </Content>
</template>

<script>
import { mapActions } from "vuex";
import Content from "../../components/layout/Content.vue";
export default {
  components: { Content },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestCafe24RefreshProducts: "product/requestCafe24RefreshProducts",
    }),
  },
  mounted() {
    this.requestCafe24RefreshProducts();
  },
};
</script>
