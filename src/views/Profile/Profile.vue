<template>
  <Content>
    <template #main>
      <ContactHeader>
        <template #name
          >{{ profile.name }}님
          <span class="font-size-20 font-weight-500">의 프로필</span>
        </template>
      </ContactHeader>
      <b-row class="px-4 py-3">
        <div class="profile-content">
          <Card>
            <template #content>
              <b-col cols="12" class="d-flex justify-content-center">
                awdawd
              </b-col>
              <b-col cols="12" class="d-flex justify-content-center">
                <span class="font-size-20 font-weight-500">
                  {{ profile.name }}
                </span>
              </b-col>
            </template>
          </Card>
          <Card>
            <template #content>
              <b-col cols="12" class="card-title">고객정보</b-col>
              <b-col class="customer-info mt-3 p-1" cols="12">
                <b-icon icon="calendar3" class="mr-1"></b-icon>
                <span>가입날짜 </span>
                <span>{{ profile.created_date }}</span>
              </b-col>
              <b-col v-if="!profile">
                <EmptyMessage v-bind:icon="'box'">
                  <template #message> 보낸 메시지가 없습니다. </template>
                </EmptyMessage>
              </b-col>
            </template>
          </Card>
        </div>
        <div class="profile-content">
          <Card>
            <template #content>
              <b-col class="card-title" cols="12">장바구니 목록</b-col>
              <b-col
                class="mt-3"
                cols="12"
                v-for="(product, index) in profile.cart"
                :key="index"
                :v-if="profile.cart.length >= 1"
              >
                <b-row>
                  <b-col cols="1">
                    <img
                      class="rounded mr-1"
                      :src="product.tiny_image"
                      style="width: 45px; height: 45px"
                    />
                  </b-col>
                  <b-col cols="10" class="d-flex flex-column ml-2">
                    <span class="font-weight-400">
                      {{ product.product_name }}
                    </span>
                    <span class="font-size-13">
                      {{ removeDecimal(product.price) }}
                    </span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col v-if="profile.cart.length === 0">
                <EmptyMessage v-bind:icon="'box'">
                  <template #message> 장바구니가 비었습니다. </template>
                </EmptyMessage>
              </b-col>
            </template>
          </Card>
          <Card>
            <template #content>
              <b-col cols="12" class="card-title">보낸 문자 기록</b-col>
              <b-col>
                <EmptyMessage v-bind:icon="'box'">
                  <template #message> 보낸 메시지가 없습니다. </template>
                </EmptyMessage>
              </b-col>
            </template>
          </Card>
        </div>
        <div class="profile-content">
          <Card>
            <template #content>
              <b-col cols="12" class="card-title">주문내역</b-col>
              <b-col>
                <EmptyMessage v-bind:icon="'box'">
                  <template #message> 주문내역이 없습니다. </template>
                </EmptyMessage>
              </b-col>
            </template>
          </Card>
        </div>
      </b-row>
    </template>
  </Content>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Card from "../../components/partial/Card.vue";
import Content from "../../components/layout/Content.vue";
import EmptyMessage from "../../components/partial/EmptyMessage.vue";
import ContactHeader from "../../components/layout/ContactHeader.vue";
export default {
  data() {
    return {};
  },
  components: {
    ContactHeader,
    Content,
    Card,
    EmptyMessage,
  },
  computed: {
    ...mapState({
      profile: (state) => state.profile.profile,
    }),
  },
  watch: {},

  methods: {
    ...mapActions({
      requestProfileInfo: "profile/requestProfileInfo",
    }),
    removeDecimal(decimal) {
      return Number(decimal);
    },
  },
  mounted() {
    this.requestProfileInfo();
  },
};
</script>
<style scoped>
.profile-content {
  width: 33%;
}

.customer-info {
  cursor: pointer;
}

.customer-info:hover {
  background-color: #eee;
}
</style>
