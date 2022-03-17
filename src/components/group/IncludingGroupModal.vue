<template>
  <Modal
    v-if="includingGroupModal"
    v-on:CloseModal="this.modalToggle('add')"
    v-bind:modalStyle="'width:400px; height:170px;'"
  >
    <template #content>
      <div>
        <b-form-select v-model="selected" class="mb-3">
          <template #first>
            <b-form-select-option value="" disabled
              >추가할 그룹을 선택해 주세요</b-form-select-option
            >
          </template>
          <b-form-select-option
            :value="group.id"
            v-for="(group, index) in groups.slice(1)"
            :key="index"
            >{{ group.name }}</b-form-select-option
          >
        </b-form-select>
      </div>
      <b-button variant="primary w-100" @click="this.includeCustomer"
        >그룹에 추가</b-button
      >
    </template>
  </Modal>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Modal from "../partial/Modal.vue";
export default {
  components: { Modal },
  data() {
    return {
      selected: "", // number type
    };
  },
  computed: {
    ...mapState({
      groups: (state) => state.group.groups,
      includingGroupModal: (state) => state.group.includingGroupModal,
    }),
  },
  methods: {
    ...mapMutations({
      modalToggle: "group/modalToggle",
      setIncludingGroup: "group/setIncludingGroup",
    }),
    ...mapActions({
      includingCustomer: "group/includingCustomer",
    }),
    includeCustomer() {
      this.setIncludingGroup(this.selected);
      this.includingCustomer();
      this.modalToggle("add");
    },
  },
};
</script>
