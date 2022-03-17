<template>
  <b-col class="customer-inbox">
    <b-col class="customer-inbox-header border-b" cols="12">
      <b-row class="h-100">
        <b-col cols="2" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-form-checkbox v-model="allCheck"></b-form-checkbox>
            <b-dropdown
              variant="white p-0 m-0"
              toggle-class="text-decoration-none"
            >
              <template #button-content>
                <b-icon icon="person-circle" scale="0.9"></b-icon>
                <span class="ml-1 font-weight-700 font-size-13">이름</span>
              </template>
              <CustomerOrdering v-bind:orderBy="'name'" />
            </b-dropdown>
          </div>
        </b-col>
        <b-col cols="2" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-dropdown
              variant="white p-0 m-0"
              toggle-class="text-decoration-none"
            >
              <template #button-content>
                <b-icon icon="phone" scale="0.9"></b-icon>
                <span class="ml-1 font-weight-700 font-size-13">
                  휴대폰 번호
                </span>
              </template>
              <CustomerOrdering v-bind:orderBy="'cellphone'" />
            </b-dropdown>
          </div>
        </b-col>
        <b-col cols="2" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-dropdown
              variant="white p-0 m-0"
              toggle-class="text-decoration-none"
            >
              <template #button-content>
                <b-icon icon="phone" scale="0.9"></b-icon>
                <span class="ml-1 font-weight-700 font-size-13">최근접속</span>
              </template>
              <CustomerOrdering v-bind:orderBy="'last_login_date'" />
            </b-dropdown>
          </div>
        </b-col>
        <b-col cols="1" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-dropdown
              variant="white p-0 m-0"
              toggle-class="text-decoration-none"
            >
              <template #button-content>
                <b-icon icon="person-circle" scale="0.9"></b-icon>
                <span class="ml-1 font-weight-700 font-size-13">아이디</span>
              </template>
              <CustomerOrdering v-bind:orderBy="'member_id'" />
            </b-dropdown>
          </div>
        </b-col>
        <b-col cols="1" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-dropdown
              variant="white p-0 m-0"
              toggle-class="text-decoration-none"
            >
              <template #button-content>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                  style="transform: sacle(0.9)"
                >
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                  />
                </svg>
                <span class="ml-1 font-weight-700 font-size-13">이메일</span>
              </template>
              <CustomerOrdering v-bind:orderBy="'email'" />
            </b-dropdown>
          </div>
        </b-col>
        <b-col cols="1" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-dropdown
              variant="white p-0 m-0"
              toggle-class="text-decoration-none"
            >
              <template #button-content>
                <b-icon icon="award" scale="0.9"></b-icon>
                <span class="ml-1 font-weight-700 font-size-13">고객등급</span>
              </template>
              <CustomerOrdering v-bind:orderBy="'last_login_date'" />
            </b-dropdown>
          </div>
        </b-col>
        <b-col cols="1" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-icon icon="cart2" scale="0.9"></b-icon>
            <span
              class="ml-1 font-weight-500 font-size-13 w-100 text-overflow-hidden overflow-hidden white-space-nowrap"
              >장바구니상품개수</span
            >
          </div>
        </b-col>
        <b-col cols="1" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-envelope-exclamation"
              viewBox="0 0 16 16"
              style="transform: sacle(0.9)"
            >
              <path
                d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"
              />
              <path
                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0Zm0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
              />
            </svg>
            <span
              class="ml-1 font-weight-500 font-size-13 w-100 text-overflow-hidden overflow-hidden white-space-nowrap"
              >문자수신여부</span
            >
          </div>
        </b-col>
        <b-col cols="1" class="customer-inbox-header-item">
          <div class="h-100 d-flex align-items-center">
            <b-icon icon="book" scale="0.9"></b-icon>
            <span
              class="ml-1 font-weight-500 font-size-13 w-100 text-overflow-hidden overflow-hidden white-space-nowrap"
              >고객설명</span
            >
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="12"
      class="customer border-b"
      :class="{ checked: customer.checked === true }"
      v-for="(customer, index) in customers"
      :key="index"
      :style="{ animationDuration: `${0.2 * index}s` }"
    >
      <b-row class="h-100 w-100">
        <b-col cols="2">
          <div class="d-flex customer-name align-items-center h-100 ml-2">
            <b-col cols="1">
              <b-icon
                v-if="!customer.checked"
                icon="person-fill"
                scale="1.2"
              ></b-icon>
              <b-icon v-if="customer.checked" scale="1.2" icon="check2-circle">
              </b-icon>
            </b-col>
            <b-col
              cols="11"
              class="ml-2 w-100 h-100 d-flex jutify-content-center align-items-center"
              id="customer-name"
            >
              <b-col
                @click="setCustomerId(customer.id)"
                class="z-index-100 font-weight-400 font-size-14 overflow-hidden text-overflow-hidden"
              >
                {{ customer.name }}
              </b-col>
            </b-col>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="2">
          <div class="d-flex align-items-center h-100 ml-2">
            <span
              class="font-weight-400 font-size-14 overflow-hidden text-overflow-hidden"
            >
              {{ customer.cellphone }}
            </span>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="2">
          <div class="d-flex align-items-center h-100 ml-2">
            <span
              class="font-weight-400 font-size-13 overflow-hidden text-overflow-hidden"
            >
              {{
                fullRecentlyDaysAgo(
                  customer.recently_login_day_ago,
                  customer.recently_login_hour_ago,
                  customer.recently_login_min_ago
                )
              }}
            </span>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="1">
          <div class="d-flex align-items-center h-100 ml-2">
            <span
              class="font-weight-400 font-size-14 overflow-hidden text-overflow-hidden"
            >
              {{ customer.member_id }}
            </span>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="1">
          <div class="d-flex align-items-center h-100 ml-2">
            <span
              class="font-weight-400 font-size-14 overflow-hidden text-overflow-hidden"
            >
              {{ customer.email }}
            </span>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="1">
          <div class="d-flex align-items-center h-100 ml-2">
            <span
              class="font-weight-400 font-size-14 overflow-hidden text-overflow-hidden"
            >
              <!-- {{ customer.membershipLevel }} -->
            </span>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="1">
          <div class="d-flex align-items-center h-100 ml-2">
            <span
              class="font-weight-400 font-size-14 overflow-hidden text-overflow-hidden"
            >
              {{ customer.cart.length }}
            </span>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="1">
          <div class="d-flex align-items-center h-100 ml-2">
            <span
              class="font-weight-400 font-size-14 overflow-hidden text-overflow-hidden"
            >
              {{ smsReceiveStatus(customer.sms) }}
            </span>
          </div>
        </b-col>
        <b-col @click="checkedToggle(customer.id)" cols="1">
          <div class="d-flex align-items-center ml-2 h-100 w-100">
            <span
              class="font-weight-400 font-size-14 align-items-center h-100 w-100 white-space-nowrap overflow-hidden text-overflow-hidden"
            >
              <!-- {{ customer.description }} -->
            </span>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-col>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CustomerOrdering from "./CustomerOrdering.vue";
export default {
  components: { CustomerOrdering },
  data() {
    return {
      allCheck: false,
      inboxItems: [
        { name: "이름" },
        { name: "휴대폰 번호" },
        { name: "이메일" },
        { name: "최근 접속" },
        { name: "아이디" },
        { name: "고객등급" },
        { name: "장바구니 개수" },
        { name: "문자수신여부" },
        { name: "고객설명" },
      ],
    };
  },
  computed: {
    ...mapState({
      customers: (state) => state.group.paginator.results,
    }),
  },
  watch: {
    allCheck: function (newVal) {
      this.allChecked(newVal);
    },
  },
  methods: {
    ...mapMutations({
      checkedToggle: "group/checkedToggle",
      allChecked: "group/allChecked",
    }),
    ...mapActions({
      setCustomerId: "profile/setCustomerId",
    }),
    fullRecentlyDaysAgo(day, hour, min) {
      if (day === "0") {
        return `${hour}시간${min}분전`;
      } else if ((day === "0") & (hour === "0")) {
        return `${min}분전`;
      } else if (day === null) {
        return "";
      } else {
        return `${day}일${hour}시간전`;
      }
    },
    smsReceiveStatus(status) {
      if (status === "T") {
        return "O";
      } else {
        return "X";
      }
    },
  },
};
</script>
<style scoped>
/* 고객 List */

.customer-inbox {
  max-height: 870px !important;
  overflow: scroll;
}

.customer-inbox-header-item {
  cursor: pointer;
}
.customer-inbox-header {
  animation: UpFromBottom 0.3s linear;
  padding: 10px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: #fff;
  height: 4rem;
}
</style>
