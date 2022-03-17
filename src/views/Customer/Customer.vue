<template>
  <Phone v-if="phoneModal"></Phone>
  <Content>
    <template #main>
      <!-- Add Group Name -->
      <IncludingGroupModal />
      <b-row class="customer-container">
        <GroupNav />
        <b-col cols="10 px-3 border-l">
          <b-row>
            <b-col cols="12">
              <ContactHeader>
                <template #name> 전체</template>
                <template #content>
                  <b-col class="search-container" cols="5">
                    <b-icon
                      style="left: 18px"
                      icon="search"
                      scale="0.8"
                    ></b-icon>
                    <b-form-input
                      v-model="search"
                      placeholder="Enter Group name"
                      class="search form-control shadow-sm drag-disable"
                      type="text"
                    />
                  </b-col>
                  <b-col cols="1" class="square-btn shadow-sm">
                    <b-dropdown
                      variant="white"
                      toggle-class="text-decoration-none"
                      no-caret
                    >
                      <template #button-content>
                        <b-icon icon="download" scale="1.3"> </b-icon>
                      </template>
                      <b-dropdown-item @click="requestPrdAndCstmData">
                        <span class="ml-1 font-weight-700 font-size-13">
                          고객정보 가져오기
                        </span>
                      </b-dropdown-item>
                      <b-dropdown-item @click="requestRefreshCustomer">
                        <span class="ml-1 font-weight-700 font-size-13">
                          고객정보 새로고침
                        </span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                  <b-col cols="1" class="square-btn shadow-sm ml-2">
                    <b-dropdown
                      variant="white"
                      toggle-class="text-decoration-none"
                      no-caret
                    >
                      <template #button-content>
                        <b-icon icon="plus" scale="1.7"> </b-icon>
                      </template>
                      <b-dropdown-item @click="openIncludingGroupModal">
                        <span class="ml-1 font-weight-700 font-size-13">
                          선택회원 그룹에 추가
                        </span>
                      </b-dropdown-item>
                      <b-dropdown-item @click="smsModalToggle('phone')">
                        <span class="ml-1 font-weight-700 font-size-13">
                          선택회원 문자메시지 보내기
                        </span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                  <Pagination />
                </template>
              </ContactHeader>
              <Loading v-if="loading">
                <template #explain>고객정보 불러오는중 ...</template>
              </Loading>
              <Customers v-else />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </template>
  </Content>
</template>
<script>
import Content from "../../components/layout/Content.vue";
import ContactHeader from "../../components/layout/ContactHeader.vue";
import IncludingGroupModal from "../../components/group/IncludingGroupModal.vue";
import Customers from "../../components/customer/Customers.vue";
import Loading from "../../components/partial/Loading.vue";
import Phone from "../../components/sms/Phone.vue";
import GroupNav from "../../components/group/GroupNav.vue";
import Pagination from "../../components/customer/Pagination.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    GroupNav,
    Phone,
    Content,
    ContactHeader,
    Customers,
    Loading,
    IncludingGroupModal,
    Pagination,
  },
  data() {
    return {
      search: "",
      navs: [
        { name: "전체", icon: "collection", routeName: "" },
        { name: "최근접속", icon: "broadcast", routeName: "" },
        { name: "신규", icon: "funnel", routeName: "" },
      ],
    };
  },
  watch: {
    search: function (newVal) {
      this.setSearching(newVal);
    },
  },

  computed: {
    ...mapState({
      customers: (state) => state.group.paginator.results,
      loading: (state) => state.customer.loading,
      prevSearch: (state) => state.group.search,
      prepareAddCustomers: (state) => state.group.prepareAddCustomers,
      phoneModal: (state) => state.sms.phoneModal,
    }),
  },
  methods: {
    ...mapMutations({
      groupModalToggle: "group/modalToggle",
      setPrepareCustomer: "group/setPrepareCustomer",
      smsModalToggle: "sms/modalToggle",
    }),
    ...mapActions({
      requestCafe24Customer: "customer/requestCafe24Customer",
      setSearching: "group/setSearching",
      requestRefreshCustomer: "customer/requestRefreshCustomer",
      requestCafe24Products: "product/requestCafe24Products",
    }),

    requestPrdAndCstmData() {
      this.requestCafe24Customer();
      this.requestCafe24Products();
    },
    openIncludingGroupModal() {
      this.customers.forEach((customer) => {
        if (customer.checked === true) {
          this.setPrepareCustomer(customer);
        }
      });
      if (this.prepareAddCustomers.length >= 1) {
        this.groupModalToggle("add");
      } else {
        alert("그룹에 추가할 회원을 선택해 주세요.");
      }
    },
  },
  mounted() {
    this.search = this.prevSearch;
  },
};
</script>

<style>
.customer-container {
  margin: 0;
}

/* 고객 네비게이션 */
.add-group-btn {
  transition-duration: 0.2s;
}
.add-group-btn:hover {
  background-color: rgba(255, 255, 255, 0.9) !important;
}
.group-nav {
  padding: 0;
  z-index: 1;
  height: 100vh;
  left: 0;
}

.group-nav > .nav,
.customer-filters {
  padding: 1rem 2.5rem;
}

.nav-items {
  display: flex;
  flex-direction: column;
  background-color: #1e3a8a;
  border-radius: 0.375rem;
  padding: 12px;
}
.nav-items > .nav-item {
  cursor: pointer;
  padding: 0.375rem;
  transition-duration: 0.235s;
  border-radius: 0.375rem;
}

.nav-items > .nav-item:hover {
  background-color: rgba(54, 85, 184, 0.3);
}

.nav-items > .active {
  background-color: rgba(54, 85, 184, 0.7) !important;
}

.nav-items > .nav-item > .bootstrap-icon {
  margin-top: 2px;
  color: #fff;
}

.nav-items > .nav-item > span {
  font-size: 13px;
  font-weight: 500;
  padding-left: 12px;
  color: #fff;
}
</style>
