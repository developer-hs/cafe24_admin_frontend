<template>
  <Content>
    <template #header>
      <div class="header">
        <a>Application</a>
        <span class="right_angle">></span>
        <a>Dashboard</a>
      </div>
    </template>
    <template #main-left>
      <b-col cols="12">
        <b-row>
          <b-col class="summary-info p-4 bg-white shadow-sm"
            ><b-icon icon="cart3" scale="2" variant="primary"></b-icon>
            <div class="info">{{ product.count }}</div>
          </b-col>
          <b-col class="summary-info p-4 bg-white shadow-sm"
            ><b-icon icon="person-fill" scale="2" variant="warning"></b-icon>
            <div></div>
          </b-col>
          <b-col class="summary-info p-4 bg-white shadow-sm"
            ><b-icon icon=""></b-icon>
            <div></div>
          </b-col>
          <b-col class="summary-info p-4 bg-white shadow-sm"
            ><b-icon icon=""></b-icon>
            <div></div>
          </b-col>
        </b-row>
      </b-col>
    </template>
  </Content>
</template>

<script>
import Content from "../components/layout/Content.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { Content },
  computed: {
    ...mapState({ product: (state) => state.product }),
  },
  methods: {
    ...mapActions("product", ["requestProductsCnt"]),
  },
  mounted() {
    this.requestProductsCnt();
  },
};
</script>

<style>
.header > span,
a {
  font-size: 14px;
}

.right_angle {
  padding: 0 10px;
}
.summary-info {
  position: relative;
  padding: 15px;
  border-color: transparent;
  border-radius: 0.375rem;
  position: relative;
  margin-right: 20px;
}

.summary-info::before {
  position: absolute;
  content: "";
  bottom: -10px;
  width: 80%;
  height: 10px;
  background-color: #f1f5f8;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
}

.summary-info > .info {
  padding-top: 25px;
  font-size: 25px;
  font-weight: 600;
}
</style>
