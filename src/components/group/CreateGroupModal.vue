<template>
  <Modal v-if="creatingGroupModal" v-on:CloseModal="this.modalToggle('create')">
    <template #modal-main>
      <b-row class="h-100">
        <b-col
          cols="4"
          class="d-flex justify-content-center align-items-center"
        >
          <b-col cols="12">
            <b-form-input v-model="groupName" placeholder="Enter Group name">
            </b-form-input>
            <b-button
              @click="createGroupSubmit()"
              class="w-100 mt-3"
              block
              variant="primary"
            >
              확인
            </b-button>
          </b-col>
          <div class="devider-vertical ml-3"></div>
        </b-col>
        <b-col cols="8">
          <b-row>
            <span class="text-left mb-4 ml-2 font-size-20 font-weight-700">
              자동화 옵션
            </span>
            <b-col cols="6">
              <b-col cols="12">
                <b-col
                  v-for="(left_option, index) in left_options"
                  :key="index"
                  cols="12"
                  class="mb-3"
                >
                  <b-row>
                    <b-col cols="1">
                      <b-form-checkbox
                        v-model="left_option.checked"
                      ></b-form-checkbox>
                    </b-col>
                    <b-col cols="11" class="d-flex flex-column">
                      <span class="font-weight-400 font-size-15 text-left">
                        {{ left_option.option }}
                      </span>
                      <span class="font-weight-300 text-left fot-size-14">
                        {{ left_option.description }}
                      </span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-col>
            </b-col>
            <b-col cols="6">
              <b-col cols="12">
                <b-col
                  v-for="(left_option, index) in right_options"
                  :key="index"
                  cols="12"
                  class="mb-3"
                >
                  <b-row>
                    <b-col cols="1">
                      <b-form-checkbox
                        v-model="left_option.checked"
                      ></b-form-checkbox>
                    </b-col>
                    <b-col cols="11" class="d-flex flex-column">
                      <span class="font-weight-400 font-size-15 text-left">
                        {{ left_option.option }}
                      </span>
                      <span class="font-weight-300 text-left fot-size-14">
                        {{ left_option.description }}
                      </span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-col>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </template>
  </Modal>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Modal from "../partial/Modal.vue";
export default {
  data() {
    return {
      groupName: "",
      left_options: [
        {
          name: "recently_login",
          option: "최근로그인",
          description: "최근 10일 내에 로그인한 회원들을 추가합니다",
          checked: false,
        },
        {
          name: "recently_login_day_ago",
          option: "최근로그인",
          description: "최근 24시간 내에 로그인한 회원들을 추가합니다",
          checked: false,
        },
        {
          name: "recently_login_day_ago",
          option: "최근로그인",
          description: "최근 24시간 내에 로그인한 회원들을 추가합니다",
          checked: false,
        },
      ],
      right_options: [
        {
          name: "recentl_login",
          option: "최근로그인",
          description: "최근 10일 내에 로그인한 회원들을 추가합니다",
          checked: false,
        },
        {
          name: "recently_login_day_ago",
          option: "최근로그인",
          description: "최근 24시간 내에 로그인한 회원들을 추가합니다",
          checked: false,
        },
        {
          name: "recently_login_day_ago",
          option: "최근로그인",
          description: "최근 24시간 내에 로그인한 회원들을 추가합니다",
          checked: false,
        },
      ],
    };
  },
  components: { Modal },
  computed: {
    ...mapState({
      creatingGroupModal: (state) => state.group.creatingGroupModal,
    }),
  },
  methods: {
    ...mapMutations({
      setOptions: "group/setOptions",
    }),
    ...mapActions({
      modalToggle: "group/modalToggle",
      createGroup: "group/createGroup",
    }),
    createGroupSubmit() {
      this.left_options.forEach((option) => {
        if (option.checked) {
          this.setOptions(option.name);
        }
      });
      this.right_options.forEach((option) => {
        if (option.checked) {
          this.setOptions(option.name);
        }
      });
      this.modalToggle("create");
      this.createGroup(this.groupName);
    },
  },
};
</script>
