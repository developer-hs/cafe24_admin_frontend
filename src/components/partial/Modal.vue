<template>
  <div @click="updateParentValue" class="modal">
    <div class="modal_body" :style="modalStyle">
      <slot name="content"></slot>
    </div>
    <slot name="custom"></slot>
  </div>
</template>

<script>
export default {
  props: ["modalStyle"],
  data() {
    return {
      body: document.querySelector("body"),
    };
  },
  methods: {
    updateParentValue(el) {
      if (el.target.classList[0] === "modal") {
        this.body.classList.remove("prevent-scrolling");
        this.$emit("closeModal");
      }
    },
  },
  mounted() {
    this.body.classList.add("prevent-scrolling");
  },
};
</script>

<style scope>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal.show {
  display: block;
}
.modal_body {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 2rem;
  z-index: 100;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.75);
  transform: translateX(-50%) translateY(-50%);
}
</style>
