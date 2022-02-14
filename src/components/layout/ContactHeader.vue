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

<style>
.contact-header-container {
  width: 100%;
  padding: 15px 22px;
  border-bottom: 1px solid #ccc;
  background-color: #f1f5f8;
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

.search-container {
  position: relative;
}

.search-container > .bootstrap-icon {
  top: 10px;
  left: 18px;
  position: absolute;
}
.search {
  height: 2.3rem;
  padding: 0 30px;
  border: 1px solid #fff;
  border-radius: 0.785rem;
}

.search:focus {
  color: #212529;
  border: 1px solid #86b7fe;
  background-color: #fff;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
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
