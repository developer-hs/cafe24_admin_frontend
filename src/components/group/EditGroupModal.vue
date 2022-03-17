<template>
  <Modal
    v-if="editGroupModal"
    v-on:closeModal="this.closeModal('edit')"
    v-bind:modalStyle="'width:1100px; height:300px;'"
  >
    <template #content>
      <b-row class="h-100">
        <b-col
          cols="4"
          class="d-flex justify-content-center align-items-center"
        >
          <b-col cols="12">
            <b-form-input v-model="groupName" placeholder="Enter Group name">
            </b-form-input>
            <b-button
              @click="editGroupSubmit()"
              class="w-100 mt-3"
              block
              variant="primary"
            >
              확인
            </b-button>
          </b-col>
          <div class="devider-vertical ml-3"></div>
        </b-col>
        <b-col cols="8" class="d-flex" style="flex-flow: row wrap">
          <b-col cols="6" v-for="(option, index) in options" :key="index">
            <b-row>
              <b-col cols="1">
                <b-form-checkbox v-model="option.checked"></b-form-checkbox>
              </b-col>
              <b-col cols="11" class="d-flex flex-column">
                <div v-if="option.option === '그룹별 분류'">
                  <!-- 그룹별 분류 -->
                  <b-form-select
                    v-model="mallGroupSelected"
                    size="sm"
                    class="mt-0 mb-1"
                    multiple
                    :select-size="mallGroups.length"
                  >
                    <template #first>
                      <b-form-select-option value="" disabled>
                        {{ option.option }}
                      </b-form-select-option>
                    </template>
                    <b-form-select-option
                      :value="mallGroup.id"
                      v-for="(mallGroup, index) in mallGroups"
                      :key="index"
                      >{{ mallGroup.group_name }}</b-form-select-option
                    >
                  </b-form-select>
                  <div class="mt-3">
                    Selected: <strong>{{ mallGroupSelected }}</strong>
                  </div>
                </div>
                <span v-else class="font-weight-400 font-size-15 text-left">
                  {{ option.option }}
                </span>

                <span class="font-weight-300 text-left fot-size-14">
                  {{ option.description }}
                </span>
                <span class="font-weight-300 text-left fot-size-14">
                  {{ option.selectedOption }}
                </span>
              </b-col>
            </b-row>
          </b-col>
        </b-col>
      </b-row>
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
      groupName: "",
      mallGroupSelected: [],

      options: [
        {
          name: "recently_login",
          option: "최근로그인",
          description: "최근 10일 내에 로그인한 회원들을 추가합니다",
          checked: false,
          selected: false,
        },
        {
          name: "mall_group",
          option: "그룹별 분류",
          description: "해당 그룹별로 분류합니다",
          checked: false,
          selected: false,
        },
        {
          name: "recently_login_day_ago",
          option: "최근로그인",
          description: "최근 24시간 내에 로그인한 회원들을 추가합니다",
          checked: false,
          selected: false,
        },
        {
          name: "recentl_login",
          option: "최근로그인",
          description: "최근 10일 내에 로그인한 회원들을 추가합니다",
          checked: false,
          selected: false,
        },
        {
          name: "recently_login_day_ago",
          option: "최근로그인",
          description: "최근 24시간 내에 로그인한 회원들을 추가합니다",
          checked: false,
          selected: false,
        },
        {
          name: "recently_login_day_ago",
          option: "최근로그인",
          description: "최근 24시간 내에 로그인한 회원들을 추가합니다",
          checked: false,
          selected: false,
        },
      ], //
    };
  },
  watch: {
    updating: function (newVal) {
      this.groupName = this.currentGroup.name;
      if (newVal === true) {
        if (this.currentGroup.options) {
          let currentOptions = this.currentGroup.options.split(",");
          currentOptions.forEach((currentOption) => {
            this.options.forEach((option) => {
              if (option.name === currentOption) {
                option.checked = true;
              }
            });
          });
        }
      } else {
        this.groupName = "";
        this.options.forEach((option) => {
          option.checked = false;
        });
      }
    },
  },
  computed: {
    ...mapState({
      editGroupModal: (state) => state.group.editGroupModal,
      updating: (state) => state.group.updating,
      currentGroup: (state) => state.group.currentGroup,
      mallGroups: (state) => state.mallGroup.mallGroups,
    }),
  },
  methods: {
    ...mapMutations({
      setOptions: "group/setOptions",
      modalToggle: "group/modalToggle",
      updatingToggle: "group/updatingToggle",
    }),
    ...mapActions({
      updateGroup: "group/updateGroup",
      createGroup: "group/createGroup",
      requestMallGroup: "mallGroup/requestMallGroup",
    }),
    editGroupSubmit() {
      this.options.forEach((option) => {
        if (option.checked) {
          this.setOptions(option.name);
        }
      });
      if (this.updating === true) {
        this.updateGroup(this.groupName);
      } else {
        this.createGroup(this.groupName);
      }
      this.closeModal();
    },
    closeModal() {
      this.updatingToggle(false);
      this.modalToggle("edit");
    },
  },
  mounted() {
    this.requestMallGroup();
  },
};
</script>
