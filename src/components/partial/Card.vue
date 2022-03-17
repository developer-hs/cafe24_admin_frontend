<template>
  <div class="card shadow-sm">
    <slot name="content"> </slot>
  </div>
</template>

<style>
.card {
  margin-top: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #eee;
}
.card-title {
  padding: 8px;
  padding-bottom: 20px;
  font-weight: 400;
  font-size: 18px;
  border-bottom: 1px solid #eee;
}
</style>
