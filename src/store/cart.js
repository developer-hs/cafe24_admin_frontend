import callAPI from "../api/callAPI";
import store from "../store";
export default {
  namespaced: true,
  state: {
    maxLabelLength: 4,
    summaryCart: {},
    cartChartData: {
      id: "CartDoughnut",
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgba(255, 197, 51, 0.2)",
              "rgba(255, 139, 39, 0.2)",
              "rgba(51, 78, 150, 0.2)",
              "rgba(221, 27, 22, 0.2)",
            ],

            borderColor: [
              "rgba(255, 197, 51, 1)",
              "rgba(255, 139, 39, 1)",
              "rgba(51, 78, 150, 1)",
              "rgba(221, 27, 22, 1)",
            ],
          },
        ],
      },
    },
  },
  getters: {
    // computed
  },
  mutations: {
    setSummaryCart(state, summaryCart) {
      state.summaryCart = summaryCart.sort(function (a, b) {
        return b.count - a.count;
      });

      const datasets = state.cartChartData.data.datasets[0];
      datasets.data = [];
      for (let i = 0; i < state.maxLabelLength - 1; i++) {
        if (!summaryCart[i]) {
          return;
        }
        if (state.cartChartData.data.labels.length < state.maxLabelLength) {
          state.cartChartData.data.labels.push(summaryCart[i].name);
          datasets.data.push(summaryCart[i].count);
        }
      }
    },
  },
  actions: {
    requestSummaryCartInfo({ commit }) {
      callAPI(
        "get",
        `/cart/info/${store.state.auth.data.authorizeCode}/summary/`
      )
        .then((response) => {
          commit("setSummaryCart", response.data);
        })
        .catch((error) => console.log(error));
    },
  },
};
