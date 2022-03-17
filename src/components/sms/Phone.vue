<template>
  <Modal>
    <template #custom>
      <div
        @click="closeModal"
        class="phone-modal"
        style="z-index: -1; width: 100%; height: 100%"
      >
        <div class="iphonex">
          <div class="front">
            <div class="screen">
              <div class="screen__view" style="width: 100%">
                <div class="dribbbleLogo"><span></span></div>
                <div class="hello">
                  <b-col
                    cols="12"
                    class="receivers d-flex justify-content-center drag-disable p-2"
                  >
                    <b-col cols="10" class="receiver text-overflow-hidden">
                      <span v-for="(recevier, index) in receivers" :key="index">
                        <NameCard v-bind:datas="receivers">
                          <template #data> {{ recevier.name }}</template>
                        </NameCard>
                      </span>
                    </b-col>
                    <b-col cols="2" class="pr-1"
                      ><b-icon
                        @click="smsModalToggle('add')"
                        class="add-group"
                        icon="plus-circle"
                        scale="0.6"
                      ></b-icon
                    ></b-col>
                  </b-col>
                  <div class="message-box">
                    <b-form-textarea
                      v-model="message"
                      class="font-size-14"
                      id="textarea-no-resize"
                      placeholder="내용을 입력 해 주세요. "
                      rows="4"
                      style="padding-right: 40px; height: 4rem"
                      no-resize
                    ></b-form-textarea>
                    <b-icon
                      @click="sendMessage"
                      class="message-btn"
                      variant="primary"
                      icon="arrow-up-circle"
                      style="
                        transition-duration: 0.5s;
                        border-radius: 100%;
                        position: absolute;
                        top: 13;
                        right: 2;
                        cursor: pointer;
                      "
                    ></b-icon>
                  </div>
                </div>
              </div>
              <div class="screen__front">
                <div class="screen__front-speaker"></div>
                <div class="screen__front-camera"></div>
              </div>
            </div>
            <div class="front__line"></div>
            <div class="front__line front__line-second"></div>
          </div>
          <div class="phoneButtons phoneButtons-right"></div>
          <div class="phoneButtons phoneButtons-left"></div>
          <div class="phoneButtons phoneButtons-left2"></div>
          <div class="phoneButtons phoneButtons-left3"></div>
          <div class="back"></div>
        </div>
      </div>
    </template>
  </Modal>
  <Modal
    v-if="addCustomerModal"
    v-bind:modalStyle="'width:500px; height:700px;'"
    v-on:closeModal="this.smsModalToggle('add')"
  >
    <template #content><AddReceiver /> </template>
  </Modal>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import AddReceiver from "./AddReceiver.vue";
import Modal from "../partial/Modal.vue";
import NameCard from "../partial/NameCard.vue";

export default {
  components: { Modal, NameCard, AddReceiver },
  data() {
    return { message: "", body: document.querySelector("body") };
  },
  computed: {
    ...mapState({
      addCustomerModal: (state) => state.sms.addCustomerModal,
      receivers: (state) => state.group.checkedCustomers,
      receiverPhoneNumbers: (state) => state.sms.receiverPhoneNumbers,
    }),
  },
  methods: {
    ...mapMutations({
      smsModalToggle: "sms/modalToggle",
      setMessage: "sms/setMessage",
      dataInit: "sms/dataInit",
      setReceiverPhoneNumber: "sms/setReceiverPhoneNumber",
    }),
    ...mapActions({
      requestSmsMessage: "sms/requestSmsMessage",
    }),
    closeModal(e) {
      if (e.target.className === "phone-modal") {
        this.body.classList.remove("prevent-scrolling");
        this.smsModalToggle("phone");
        this.dataInit();
      }
    },
    sendMessage() {
      this.setMessage(this.message);
      this.setReceiverInfo();
      this.requestSmsMessage();
    },

    setReceiverInfo() {
      this.receivers.forEach((customer) => {
        if (this.receiverPhoneNumbers === "") {
          this.setReceiverPhoneNumber(customer.cellphone.replaceAll("-", ""));
        } else {
          this.setReceiverPhoneNumber(
            `,${customer.cellphone.replaceAll("-", "")}`
          );
        }
      });
    },
  },
};
</script>

<style scope>
.iphonex {
  width: 20em;
  height: 40em;
  display: flex;
  position: absolute;
  top: 20%;
  left: 43%;
  transform: rotate(0deg);
  transition: all cubic-bezier(0.36, 0.41, 0.38, 1) 0.4s;
  z-index: 1000;
  animation: HideAtShow 0.3s linear;
}
.iphonex:hover {
  transform: rotate(0deg) scale(0.95);
  margin-right: 0%;
}
.iphonex:hover ~ .title {
  opacity: 0;
}
.iphonex .back {
  display: flex;
  flex: 1;
  margin: 0.2em;
  border-radius: 3em;
  position: absolute;
  z-index: 1;
  width: calc(100% - 0.6em);
  height: calc(100% - 0.6em);
  top: 0;
  right: 0;
  box-shadow: 0 0 10em rgba(70, 70, 70, 0.1);
  transition: all 0.4s;
}
.iphonex:hover .back {
  box-shadow: 0 0 15em rgba(70, 70, 70, 0.4);
}
.iphonex .front {
  display: flex;
  flex: 1;
  background-color: #292c2d;
  border-radius: 3em;
  margin: 0.2em;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0.1em 0.4em rgba(255, 255, 255, 0.1) inset;
  z-index: 10;
}
.iphonex .screen {
  display: flex;
  flex: 1;
  background-color: #191b1c;
  margin: 0.4em;
  border-radius: 2.6em;
  border: solid 0.2em #121415;
  position: relative;
  z-index: 10;
}
.iphonex .front__line {
  background: linear-gradient(to right, #515455, #454748, #515455);
  position: absolute;
  z-index: 8;
  width: 100%;
  height: 0.5em;
  top: 10%;
}
.iphonex .front__line-second {
  top: 90%;
}
.iphonex .screen .screen__view {
  display: flex;
  flex: 1;
  margin: 0.6em;
  border-radius: 2em;
  overflow: hidden;
  position: relative;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
}
.iphonex .screen .screen__view:after,
.iphonex .screen .screen__view:before {
  content: "";
  position: absolute;
  z-index: 1;
  width: 50em;
  height: 50em;
  border-radius: 50%;
  background: linear-gradient(110deg, #ab34b2, #d63776, #5d2b8b);
  bottom: 0;
}
.iphonex .screen .screen__view:after {
  transform: translateY(100%) scaleX(1.4);
  opacity: 0.3;
  transition: all ease 0.5s 0.1s;
}
.iphonex .screen:hover .screen__view:after {
  transform: translateY(10%) scaleX(1.4);
  transition: all ease 0.9s;
}
.iphonex .screen .screen__view:before {
  transform: translateY(100%) scaleX(1.4);
  opacity: 1;
  z-index: 40;
  transition: all ease 0.6s;
}
.iphonex .screen:hover .screen__view:before {
  transform: translateY(10%) scaleX(1.4);
  transition: all ease 0.9s 0.2s;
}
.iphonex .screen .screen__view .dribbbleLogo {
  width: 8em;
  height: 8em;
  border: solid 0.7em #d33572;
  border-radius: 50%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  background: #ea4c89;
  position: absolute;
  z-index: 10;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.7s;
}
.iphonex .screen .screen__view .dribbbleLogo.white {
  width: 0.9em;
  height: 0.9em;
  border: solid 0.07em #fff;
  position: relative;
  margin-left: 0.3em;
  background: transparent;
  box-sizing: border-box;
}
.iphonex .screen:hover .screen__view .dribbbleLogo:not(.white) {
  transform: translateY(100%) translateZ(1px);
  transition: all ease 1s 0.1s;
}
.iphonex .screen .screen__view .dribbbleLogo:after,
.iphonex .screen .screen__view .dribbbleLogo:before,
.iphonex .screen .screen__view .dribbbleLogo span {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: solid 0.45em #d33572;
  position: absolute;
}
.iphonex .screen .screen__view .dribbbleLogo.white:after,
.iphonex .screen .screen__view .dribbbleLogo.white:before,
.iphonex .screen .screen__view .dribbbleLogo.white span {
  border: solid 0.04em #fff;
}
.iphonex .screen .screen__view .dribbbleLogo:after {
  bottom: 0;
  transform: translateY(63%) scaleY(1.65) scaleX(1.5) rotate(-30deg);
  transform-origin: top center;
}
.iphonex .screen .screen__view .dribbbleLogo:before {
  top: 0;
  transform: translateY(-62%) scaleY(1.65) scaleX(1.5) rotate(-30deg);
  transform-origin: bottom center;
}
.iphonex .screen .screen__view .dribbbleLogo span {
  top: 0;
  transform: translateY(-50%) scaleY(1.85) scaleX(1.5) rotate(-63deg);
  transform-origin: bottom right;
}
.iphonex .screen .screen__view .hello {
  font-size: 2.5em;
  color: #fff;
  position: absolute;
  z-index: 60;
  opacity: 0;
  flex-direction: row;
  align-items: center;
  transition: all ease 0.3s;
  transform: translateY(40%);
  font-weight: 600;
}
.iphonex .screen:hover .screen__view .hello {
  transform: translateY(5%);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: all ease 0.6s 0.7s;
}
.iphonex .screen .screen__front {
  position: absolute;
  width: 50%;
  background-color: #191b1c;
  height: 1.8em;
  border-radius: 0 0 0.9em 0.9em;
  right: 25%;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.3em;
  box-sizing: border-box;
  margin-top: 0.5em;
  z-index: 999;
}
.iphonex .screen .screen__front::after,
.iphonex .screen .screen__front::before {
  content: "";
  width: 10%;
  height: 50%;
  position: absolute;
  background: transparent;
  top: -0.3em;
  border: solid 0.4em #191b1c;
  border-bottom: 0;
}
.iphonex .screen .screen__front::after {
  left: 0.4em;
  transform: translateX(-100%);
  border-left: 0;
  border-radius: 0 0.7em 0 0;
}
.iphonex .screen .screen__front::before {
  right: 0.4em;
  transform: translateX(100%);
  border-right: 0;
  border-radius: 0.7em 0 0 0;
}
.iphonex .screen .screen__front-speaker {
  background: #070808;
  border-radius: 0.2em;
  height: 0.35em;
  width: 28%;
}
.iphonex .screen .screen__front-camera {
  height: 0.35em;
  width: 0.35em;
  background: #272727;
  margin-left: 0.5em;
  border-radius: 50%;
  margin-right: -0.8em;
}
.iphonex .phoneButtons {
  width: 1em;
  height: 6em;
  position: absolute;
  z-index: 2;
  background: linear-gradient(to bottom, #212324, #2b2e31, #212324);
  box-shadow: 0 0 0.4em rgba(255, 255, 255, 0.1) inset;
  border-radius: 2px;
}
.iphonex .phoneButtons-right {
  right: 0;
  top: 30%;
}
.iphonex .phoneButtons-left {
  left: 0;
  top: 15%;
  height: 3em;
}
.iphonex .phoneButtons-left2 {
  left: 0;
  top: 25%;
  height: 5em;
}
.iphonex .phoneButtons-left3 {
  left: 0;
  top: calc(25% + 6em);
  height: 5em;
}

@media (max-height: 40em) {
  body {
    font-size: 70%;
  }
  .iphonex {
    width: 48vh;
    height: 94vh;
  }
  .title .title__svg svg text {
    font-size: 4em;
  }
}
.add-group:hover {
  color: #27ae60;
}
.message-box {
  display: none;
}
.iphonex .screen:hover .message-box {
  display: block;
  bottom: 27px;
  position: absolute;
  width: 100%;
}
.receivers {
  cursor: pointer;
  display: none;
}

.iphonex .screen:hover .receivers {
  display: block;
}

.recevier {
  display: none;
}

.iphonex .screen:hover .receiver {
  display: block;
  height: 2.375rem;
}
.message-btn:hover {
  background-color: #74b9ff;
}
</style>
