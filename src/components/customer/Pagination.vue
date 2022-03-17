<template>
  <b-col cols="1" class="square-btn shadow-sm ml-2" @click="prePage()">
    <b-icon icon="arrow-left" scale="1.3"></b-icon>
  </b-col>
  <b-col cols="1" class="square-btn shadow-sm ml-2" @click="nextPage()">
    <b-icon icon="arrow-right" scale="1.3"></b-icon>
  </b-col>
  <b-col
    v-if="currentPageNumber"
    cols="3"
    class="d-flex justify-content-center align-items-center font-size-13 drag-disable"
  >
    {{ pageNumber() }} - {{ currentPageSize() }} of
    {{ pageCount }}
  </b-col>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentPageNumber: (state) => state.group.paginator.page_number,
      pageSize: (state) => state.group.paginator.page_size,
      pageCount: (state) => state.group.paginator.count,
    }),
  },
  methods: {
    ...mapActions({
      nextPage: "group/nextPage",
      prePage: "group/prePage",
    }),
    pageNumber() {
      if (this.currentPageNumber === 1) {
        return this.currentPageNumber;
      } else return this.currentPageNumber * this.pageSize - this.pageSize + 1;
    },
    currentPageSize() {
      if (this.pageSize * this.currentPageNumber + 1 > this.pageCount) {
        return this.pageCount;
      } else {
        return this.pageSize * this.currentPageNumber;
      }
    },
  },
};
</script>
