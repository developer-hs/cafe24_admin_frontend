<template>
  <Content>
    <template #main>
      <!-- Add Group Name -->
      <CreateGroupModal />
      <AddGroupModal />
      <b-row class="customer-container">
        <b-col class="customer-nav" cols="2">
          <b-col class="p-2 menu-name">
            <span class="h4 name">고객관리</span>
          </b-col>
          <b-row class="h-50 nav">
            <b-col class="nav-items">
              <b-button-group>
                <b-button
                  @click="modalToggle('create')"
                  class="bg-white add-group-btn"
                >
                  <b-icon icon="pencil-square" class="color-black"></b-icon>
                  <span class="color-black ml-1 font-weight-400 font-size-15"
                    >그룹 추가</span
                  >
                </b-button>
              </b-button-group>
              <div class="devider-horizontal my-3"></div>
              <div
                class="nav-item"
                :class="{ 'active ': currentGroup === group.name }"
                @click="changeCurrentGroup(group.name)"
                v-for="(group, index) in groups"
                :key="index"
              >
                <span>{{ group.name }}</span>
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
        <b-col cols="10 px-3 border-l">
          <b-row>
            <b-col cols="12">
              <ContactHeader>
                <template #name> 전체</template>
                <template #content>
                  <b-col class="search-container" cols="5">
                    <b-icon icon="search" scale="0.8"></b-icon>
                    <b-form-input
                      class="search form-control shadow-sm drag-disable"
                      type="text"
                      placeholder="Enter your name"
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
                      <b-dropdown-item @click="requestCafe24Customer">
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
                      <b-dropdown-item @click="modalToggle('add')">
                        <span class="ml-1 font-weight-700 font-size-13">
                          선택회원 그룹에 추가
                        </span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                  <b-col
                    cols="1"
                    class="square-btn shadow-sm ml-2"
                    @click="prePage()"
                  >
                    <b-icon icon="arrow-left" scale="1.3"></b-icon>
                  </b-col>
                  <b-col
                    cols="1"
                    class="square-btn shadow-sm ml-2"
                    @click="nextPage()"
                  >
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
import CreateGroupModal from "../../components/group/CreateGroupModal.vue";
import AddGroupModal from "../../components/group/AddGroupModal";
import Customers from "../../components/customer/Customers.vue";
import Loading from "../../components/partial/Loading.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Content,
    ContactHeader,
    Customers,
    Loading,
    CreateGroupModal,
    AddGroupModal,
  },
  data() {
    return {
      groupName: "",
      navs: [
        { name: "전체", icon: "collection", routeName: "" },
        { name: "최근접속", icon: "broadcast", routeName: "" },
        { name: "신규", icon: "funnel", routeName: "" },
      ],
    };
  },
  computed: {
    ...mapState({
      groups: (state) => state.group.groups,
      currentGroup: (state) => state.group.currentGroup,
      pageSize: (state) => state.customer.paginator.page_size,
      pageCount: (state) => state.customer.paginator.count,
      currentPageNumber: (state) => state.customer.paginator.page_number,
      loading: (state) => state.customer.loading,
    }),
  },
  methods: {
    ...mapActions({
      requestAllGroups: "group/requestAllGroups",
      requestCafe24Customer: "customer/requestCafe24Customer",
      requestPageCustomer: "customer/requestPageCustomer",
      requestRefreshCustomer: "customer/requestRefreshCustomer",
      changeCurrentGroup: "group/changeCurrentGroup",
      modalToggle: "group/modalToggle",
      nextPage: "customer/nextPage",
      prePage: "customer/prePage",
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
        return this.pageSize * this.currentPageNumber + 1;
      }
    },
  },
  mounted() {
    this.requestAllGroups();
    this.requestPageCustomer();
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
.customer-nav {
  padding: 0;
  z-index: 1;
  height: 100vh;
  left: 0;
}

.customer-nav > .nav,
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
