<template>
  <b-col class="loading">
    <b-icon icon="three-dots" animation="spin-pulse" font-scale="4"></b-icon>
    <div>
      <slot name="explain"></slot>
    </div>
  </b-col>
</template>
<style>
.loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
