<template>
  <EditGroupModal />
  <b-col class="group-nav" cols="2">
    <b-col class="p-2 menu-name">
      <span class="h4 name">고객관리</span>
    </b-col>
    <b-row class="h-50 nav">
      <b-col class="nav-items">
        <b-button-group>
          <b-button @click="modalToggle('edit')" class="bg-white add-group-btn">
            <b-icon icon="pencil-square" class="color-black"></b-icon>
            <span class="color-black ml-1 font-weight-400 font-size-15"
              >그룹 추가</span
            >
          </b-button>
        </b-button-group>
        <div class="devider-horizontal my-3"></div>
        <div
          class="nav-item d-flex"
          style="justify-content: space-between"
          :class="{ 'active ': currentGroup.name === group.name }"
          @click="changeCurrentGroup(group)"
          v-for="(group, index) in groups"
          :key="index"
        >
          <span>{{ group.name }}</span>
          <div class="group_actions">
            <b-icon
              @click="openUpdatingGroupModal(group)"
              class="group-update color-light-white mr-1"
              icon="pencil"
            ></b-icon>
            <b-icon
              @click="groupDelete(group)"
              class="group-delete color-light-white"
              icon="x-circle"
            ></b-icon>
          </div>
        </div>
        <div class="devider-horizontal my-3"></div>
      </b-col>
    </b-row>
    <div class="devider-horizontal"></div>
    <b-row class="customer-filters">
      <b-col>
        <b-icon icon="filter" scale="1.1"> </b-icon>
        <span class="p-1">Filters Area</span>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import EditGroupModal from "../../components/group/EditGroupModal.vue";
export default {
  components: { EditGroupModal },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentGroup: (state) => state.group.currentGroup,
      groups: (state) => state.group.groups,
      editGroupModal: (state) => state.group.editGroupModal,
    }),
  },
  methods: {
    ...mapMutations({
      modalToggle: "group/modalToggle",
      updatingToggle: "group/updatingToggle",
    }),
    ...mapActions({
      deleteGroup: "group/deleteGroup",
      requestAllGroups: "group/requestAllGroups",
      changeCurrentGroup: "group/changeCurrentGroup",
    }),
    groupDelete(group) {
      if (confirm(`${group.name} 그룹을 삭제하시겠습니까?`) === true) {
        return this.deleteGroup(group.id);
      } else {
        return;
      }
    },
    openUpdatingGroupModal(group) {
      this.changeCurrentGroup(group);
      this.updatingToggle(true);
      this.modalToggle("edit");
    },
  },

  mounted() {
    console.log("GroupModal");
    this.requestAllGroups();
  },
};
</script>
<style scoped>
.group-delete {
  transition-duration: 0.375s;
}
.group-delete:hover {
  color: #ce0013;
}
.group-update {
  transition-duration: 0.375s;
}
.group-update:hover {
  color: #27ae60;
}
</style>
