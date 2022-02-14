<template>
  <Modal v-if="addGroupModal" v-on:CloseModal="this.modalToggle('add')">
    <template #modal-main> </template>
  </Modal>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Modal from "../partial/Modal.vue";
export default {
  components: { Modal },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      addGroupModal: (state) => state.group.addGroupModal,
    }),
  },
  methods: {
    ...mapActions({
      modalToggle: "group/modalToggle",
    }),
  },
};
</script>
