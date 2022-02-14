<template>
  <div @click="updateParentValue" class="modal">
    <div class="modal_body">
      <slot name="modal-main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    updateParentValue(el) {
      if (el.target.className === "modal") {
        this.$emit("CloseModal");
      }
    },
  },
};
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  width: 1000px;
  height: 300px;
  padding: 2rem;
  z-index: 100;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
}
</style>
