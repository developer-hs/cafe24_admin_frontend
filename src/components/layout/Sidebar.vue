<template>
  <nav class="side-nav">
    <ul>
      <a class="logo"></a>
      <hr class="side_nav_devider" />
      <li
        @click="active(nav.name)"
        :class="{ 'active ': activated === nav.name }"
        class="side-menu"
        v-for="(nav, idx) in navs"
        :key="{ idx }"
      >
        <b-icon :icon="nav.icon" scale="1.2"></b-icon
        ><span>{{ nav.name }}</span>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      navs: [
        { name: "대시보드", icon: "bar-chart-fill" },
        { name: "상품관리", icon: "cart2" },
        { name: "고객관리", icon: "person-fill" },
        { name: "Manager" },
        { name: "Sale" },
        { name: "Chat" },
        { name: "Post" },
        { name: "Calendar" },
        { name: "Curd" },
      ],
      activated: "대시보드",
    };
  },
  methods: {
    active(name) {
      this.activated = name;
    },
  },
};
</script>
<style>
:root {
  --main-bg-color: "#f1f5f8;";
}
.side-nav {
  padding-top: 20px;
  width: 9%;
  height: 100%;
}

.side-nav > ul > li {
  color: white;
}
.side-nav > ul > .side-menu {
  display: flex;
  padding: 8px;
}

.side-nav > ul > .side-menu:hover {
  cursor: pointer;
}

.side-nav > ul > .side-menu span {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  padding-left: 10px;
  padding-top: 1px;
}

.side-nav > ul > .side_nav_devider {
  border: 0;
  border-top: 1px solid #ccc;
  width: 80%;
}

.side-nav > ul > .logo {
  text-align: center;
  text-decoration: none;
  font-size: 28px;
}

.active {
  color: black !important;
  position: relative;
  background-color: #f1f5f8;
  border-radius: 10% 0% 0% 10% / 50% 10% 10% 50%;
  animation-duration: 0.5s;
  transition-duration: 0.5s;
}

.active::before {
  content: "";
  position: absolute;
  right: -20px;
  width: 30px;
  height: 46px;
  bottom: -26px;
  background-color: #f1f5f8;
}

.active span::before {
  position: absolute;
  content: "";
  width: 25px;
  height: 30px;
  right: -14.5px;
  background-color: #1c3faa;
  bottom: -30px;
  border-radius: 0% 100% 100% 0% / 30% 100% 0% 70%;
}

.active::after {
  content: "";
  position: absolute;
  right: -20px;
  width: 30px;
  height: 46px;
  top: -26px;
  background-color: #f1f5f8;
}
.active span::after {
  position: absolute;
  z-index: 1;
  content: "";
  width: 25px;
  height: 30px;
  right: -14.5px;
  background-color: #1c3faa;
  top: -30px;
  border-radius: 100% 0% 100% 0% / 0% 0% 100% 100%;
}
</style>
