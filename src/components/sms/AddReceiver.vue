<template>
  <b-row>
    <b-col cols="12 pb-4">
      <span v-for="(recevier, index) in receivers" :key="index">
        <NameCard v-bind:datas="receivers">
          <template #data>{{ recevier.name }}</template>
        </NameCard>
      </span>
    </b-col>
    <b-col cols="12" class="w-100 p-2" style="height: 520px">
      <b-col cols="12" class="d-flex justify-content-end">
        <Pagination />
      </b-col>
      <b-col cols="12" class="search-container my-3">
        <b-icon style="left: 10" icon="search" scale="0.8"></b-icon>
        <b-form-input
          v-model="search"
          placeholder="Enter Customer name"
          class="search form-control shadow-sm drag-disable"
          type="text"
        />
      </b-col>
      <b-col
        class="customer p-1"
        :class="{ checked: customer.checked === true }"
        v-for="(customer, index) in customers"
        :key="index"
        @click="checkedToggle(customer.id)"
        :style="{ animationDuration: `${0.2 * index}s` }"
        cols="12"
      >
        {{ customer.name }}
      </b-col>
    </b-col>
  </b-row>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Pagination from "../../components/customer/Pagination.vue";
import NameCard from "../partial/NameCard.vue";
export default {
  components: { Pagination, NameCard },
  data() {
    return { search: "" };
  },
  watch: {
    search: function (newVal) {
      this.setSearching(newVal);
    },
  },
  computed: {
    ...mapState({
      receivers: (state) => state.sms.receiver,
      customers: (state) => state.group.paginator.results,
    }),
  },
  methods: {
    ...mapMutations({ checkedToggle: "group/checkedToggle" }),
    ...mapActions({
      setSearching: "group/setSearching",
    }),
  },
};
</script>
<style scoped>
.customer {
  height: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
