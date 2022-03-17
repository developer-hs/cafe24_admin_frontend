<template>
  <Content>
    <template #main>
      <b-row>
        <b-col class="main-left" cols="8">
          <b-row class="head">
            <div class="head-name">
              <h5>요약 보고서</h5>
            </div>
            <b-col cols="12" style="display: flex">
              <b-col
                v-for="(item, index) in items"
                :key="index"
                cols="3"
                class="summary-info p-4 bg-white shadow-sm"
                @click="setShowingRouteName(item.name)"
              >
                <b-icon
                  :icon="item.icon"
                  scale="2"
                  :variant="item.iconVariant"
                ></b-icon>
                <div class="info">{{ item.value }}</div>
              </b-col>
            </b-col>
          </b-row>
          <b-row class="p-10 body">
            <b-col cols="12" class="d-flex">
              <b-col class="chart-card bg-transparent" cols="3">
                <h5 class="chart-name">나이별 차트</h5>
                <div
                  class="bg-white doughnut-chart shadow-sm"
                  style="height: 245px; width: 245px"
                >
                  <vue3-chart-js
                    :id="ageDoughnutChart.id"
                    :type="ageDoughnutChart.type"
                    :data="ageDoughnutChart.data"
                    @before-render="beforeRenderLogic"
                  ></vue3-chart-js>
                </div>
              </b-col>
              <b-col class="chart-card bg-transparent" cols="3">
                <h5 class="chart-name">장바구니 차트</h5>
                <div
                  class="bg-white doughnut-chart shadow-sm"
                  style="height: 245px; width: 245px"
                >
                  <vue3-chart-js v-bind="{ ...cartChartData }" />
                </div>
              </b-col>
              <b-col class="chart-card bg-white shadow-sm" cols="6">
                <h5 class="chart-name">최근 일주일 판매량</h5>
                <div style="padding-left: 13px; height: 245px; width: 450px">
                  <vue3-chart-js
                    :id="lineChart.id"
                    :type="lineChart.type"
                    :data="lineChart.data"
                    :options="lineChart.options"
                  ></vue3-chart-js></div
              ></b-col>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="main-right" cols="3"> </b-col>
      </b-row>
    </template>
  </Content>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import Content from "../components/layout/Content.vue";

export default {
  data() {
    return {
      items: [
        {
          name: "Customer",
          value: this.customerCnt,
          icon: "person-fill",
          iconVariant: "primary",
        },
        {
          name: "Product",
          value: this.productCnt,
          icon: "cart3",
          iconVariant: "danger",
        },
        {
          name: "SalesAmount",
          value: 0,
          icon: "server",
          iconVariant: "warning",
        },
        {
          name: "Order",
          value: 0,
          icon: "basket3",
          iconVariant: "success",
        },
      ],
      ageDoughnutChart: {
        id: "AgeDoughnut",
        type: "doughnut",
        data: {
          labels: ["~ 18", "19 ~ 24", "25 ~ 29", "30 ~"],
          datasets: [
            {
              backgroundColor: ["#FFC533", "#FB8136", "#334E96", "#DD1B16"],
              data: [40, 20, 80, 10],
              borderWidth: 1,
            },
          ],
        },
      },
      // cartDoughnutChart: {
      //   id: "CartDoughnut",
      //   type: "doughnut",
      //   data: {
      //     labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
      //     datasets: [
      //       {
      //         backgroundColor: [
      //           "rgba(255, 197, 51, 0.2)",
      //           "rgba(255, 139, 39, 0.2)",
      //           "rgba(51, 78, 150, 0.2)",
      //           "rgba(221, 27, 22, 0.2)",
      //         ],

      //         borderColor: [
      //           "rgba(255, 197, 51, 1)",
      //           "rgba(255, 139, 39, 1)",
      //           "rgba(51, 78, 150, 1)",
      //           "rgba(221, 27, 22, 1)",
      //         ],
      //         data: [80, 20, 30, 10],
      //       },
      //     ],
      //   },
      // },

      lineChart: {
        id: "line",
        type: "line",
        data: {
          labels: [
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
            "Brown",
          ],
          datasets: [
            {
              label: "# of Votes",
              data: [50, 19, 3, 5, 2, 3, 30],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: false,
                },
                pinch: {
                  enabled: false,
                },
                mode: "y",
              },
            },
          },
        },
      },
    };
  },

  components: { Content, Vue3ChartJs },

  computed: {
    ...mapState({
      productCnt: (state) => state.product.count,
      customerCnt: (state) => state.customer.count,
      summaryCart: (state) => state.cart.summaryCart,
      cartChartData: (state) => state.cart.cartChartData,
    }),
  },
  watch: {
    productCnt: function (newVal) {
      this.items.forEach((item) => {
        if (item.name === "Product") {
          item.value = newVal;
        }
      });
    },
    customerCnt: function (newVal) {
      this.items.forEach((item) => {
        if (item.name === "Customer") {
          item.value = newVal;
        }
      });
    },
  },
  methods: {
    ...mapMutations({
      setShowingRouteName: "auth/setShowingRouteName",
    }),
    ...mapActions({
      requestProductsCnt: "product/requestProductsCnt",
      requestCustomerCnt: "customer/requestCustomerCnt",
      requestSummaryCartInfo: "cart/requestSummaryCartInfo",
      requestCafe24Group: "mallGroup/requestCafe24Group",
    }),
    cntValueInit() {
      this.items.forEach((item) => {
        if (item.name === "Customer") {
          item.value = this.customerCnt;
        } else if (item.name === "Product") {
          item.value = this.productCnt;
        } else if (item.name === "SalesAmount") {
          item.value = 0;
        } else if (item.name === "Order") {
          item.value = 0;
        }
      });
    },
    beforeRenderLogic(event) {
      event;
      // ...
      // if (a === b) {
      //   event.preventDefault();
      // }
    },
  },

  mounted() {
    this.requestSummaryCartInfo();
    this.requestProductsCnt();
    this.requestCustomerCnt();
    this.cntValueInit();
    this.requestCafe24Group();
  },
  // setup() {
  //   const ageDoughnutChart = {
  //     id: "AgeDoughnut",
  //     type: "doughnut",
  //     data: {
  //       labels: ["~ 18", "19 ~ 24", "25 ~ 29", "30 ~"],
  //       datasets: [
  //         {
  //           backgroundColor: ["#FFC533", "#FB8136", "#334E96", "#DD1B16"],
  //           data: [40, 20, 80, 10],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //   };
  //   const cartDoughnutChart = {
  //     id: "CartDoughnut",
  //     type: "doughnut",
  //     data: {
  //       labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  //       datasets: [
  //         {
  //           backgroundColor: [
  //             "rgba(255, 197, 51, 0.2)",
  //             "rgba(255, 139, 39, 0.2)",
  //             "rgba(51, 78, 150, 0.2)",
  //             "rgba(221, 27, 22, 0.2)",
  //           ],

  //           borderColor: [
  //             "rgba(255, 197, 51, 1)",
  //             "rgba(255, 139, 39, 1)",
  //             "rgba(51, 78, 150, 1)",
  //             "rgba(221, 27, 22, 1)",
  //           ],
  //           data: [80, 20, 30, 10],
  //         },
  //       ],
  //     },
  //   };

  //   const lineChart = {
  //     id: "line",
  //     type: "line",
  //     data: {
  //       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Brown"],
  //       datasets: [
  //         {
  //           label: "# of Votes",
  //           data: [50, 19, 3, 5, 2, 3, 30],
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)",
  //             "rgba(255, 159, 64, 0.2)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       plugins: {
  //         zoom: {
  //           zoom: {
  //             wheel: {
  //               enabled: false,
  //             },
  //             pinch: {
  //               enabled: false,
  //             },
  //             mode: "y",
  //           },
  //         },
  //       },
  //     },
  //   };

  //   const beforeRenderLogic = (event) => {
  //     event;
  //     // ...
  //     // if (a === b) {
  //     //   event.preventDefault();
  //     // }
  //   };

  //   return {
  //     lineChart,
  //     ageDoughnutChart,
  //     cartDoughnutChart,
  //     beforeRenderLogic,
  //   };
  // },
};
</script>

<style>
.header > span,
a {
  font-size: 14px;
}

.main-right {
  border-left: 1px solid #ccc;
  margin-left: 30px;
}
.head {
  padding: 0 2.5rem 2.5rem 2.5rem;
}
.body {
  padding: 2.5rem;
}
.head-name {
  padding: 1.5rem 0;
}

.summary-info {
  cursor: pointer;
  position: relative;
  padding: 15px;
  border-color: transparent;
  border-radius: 0.375rem;
  position: relative;
  margin-right: 20px;
  transition-duration: 0.3s;
  z-index: 1;
}

.summary-info::before {
  position: absolute;
  z-index: -1;
  content: "";
  bottom: -13px;
  width: 80%;
  height: 15px;
  background-color: #f1f5f8;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
}

.summary-info > .info {
  padding-top: 25px;
  font-size: 25px;
  font-weight: 600;
}

.summary-info:hover {
  transform: scale(1.05) !important;
}

.chart-card {
  position: relative;
  margin-top: 50px;
  margin-right: 20px;
  border-radius: 1rem;
  padding: 0;
}

.chart-card > .chart-name {
  position: absolute;
  left: 7.5%;
  top: -40px;
}

.chart-card > .doughnut-chart {
  border-radius: 0.375rem;
  padding: 10px;
}
</style>
