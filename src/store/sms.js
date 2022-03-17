import callAPI from "../api/callAPI";
import store from "../store";

export default {
  namespaced: true,
  state: {
    receiverPhoneNumbers: "",
    message: "",
    addCustomerModal: false,
    phoneModal: false,
  },
  getters: {
    // computed
  },
  mutations: {
    setReceiverPhoneNumber(state, receiverPhoneNumbers) {
      state.receiverPhoneNumbers += receiverPhoneNumbers;
    },
    setMessage(state, message) {
      state.message = message;
    },
    modalToggle(state, modal_type) {
      if (modal_type === "phone") {
        state.phoneModal = !state.phoneModal;
      } else if (modal_type === "add") {
        state.addCustomerModal = !state.addCustomerModal;
      }
    },
    dataInit(state) {
      state.receiver = [];
      state.receiverPhoneNumbers = "";
    },
  },
  actions: {
    requestSmsMessage({ state }) {
      callAPI("post", `/sms/${store.state.auth.data.authorizeCode}/`, {
        phoneNumbers: state.receiverPhoneNumbers,
        message: state.message,
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
