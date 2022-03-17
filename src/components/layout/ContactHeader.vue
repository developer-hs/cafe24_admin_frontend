<template>
  <div>
    <div class="contact-header-container">
      <b-row class="contact-header-items">
        <b-col cols="6">
          <span class="contact-header-name h4"><slot name="name"></slot></span>
        </b-col>
        <b-col cols="6">
          <b-row class="p-0 m-0">
            <slot name="content"> </slot>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style scope>
.contact-header-container {
  width: 100%;
  padding: 15px 22px;
  background-color: #f1f5f8;
  animation: UpFromBottom 0.5s linear;
}

.contact-header-container > .contact-header-items {
  display: flex;
  justify-content: center;
  align-items: center;
}
.contact-header-container > .contact-header-name {
  line-height: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
}

.square-btn {
  z-index: 1000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.375rem;
  transition-duration: 0.2s;
  width: 2.35rem;
}

.square-btn:hover {
  transform: scale(1.1);
  z-index: 1000;
}
.square-btn:active {
  transform: scale(0.9);
  z-index: 1000;
}
</style>
