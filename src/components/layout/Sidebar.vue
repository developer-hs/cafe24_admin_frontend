<template>
  <nav class="side-nav">
    <ul>
      <a class="logo"></a>
      <hr class="devider-horizontal" />
      <li
        :class="{ 'active-nav ': showingRouteName === nav.routeName }"
        class="side-menu"
        v-for="(nav, idx) in navs"
        @click="active(nav.routeName)"
        :key="{ idx }"
      >
        <b-icon :icon="nav.icon" scale="1.5"></b-icon
        ><span
          ><span v-if="windowInnerWidth > 1321">{{ nav.name }}</span></span
        >
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      navs: [
        { name: "대시보드", icon: "bar-chart", routeName: "Dashboard" },
        { name: "고객관리", icon: "person", routeName: "Customer" },
        { name: "상품관리", icon: "cart", routeName: "Product" },
        { name: "프로필", icon: "person-fill", routeName: "Profile" },
        { name: "Sale", icon: "cart" },
        { name: "Chat", icon: "cart" },
        { name: "Post", icon: "cart" },
        { name: "Calendar", icon: "cart" },
        { name: "Curd", icon: "cart" },
      ],
      windowInnerWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapState({
      showingRouteName: (state) => state.auth.route.showingRouteName,
    }),
  },
  methods: {
    ...mapMutations({
      setShowingRouteName: "auth/setShowingRouteName",
    }),
    onResize() {
      this.windowInnerWidth = window.innerWidth;
    },
    active(routeName) {
      this.navs.forEach((nav) => {
        if (routeName === nav.routeName) {
          this.setShowingRouteName(nav.routeName);
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style>
:root {
  --main-bg-color: "#f1f5f8;";
}
.side-nav {
  padding-top: 0.5rem;
  width: 11.5%;
  height: 100%;
}

.side-nav > ul > li {
  color: white;
}
.side-nav > ul > .side-menu {
  width: 100%;
  display: flex;
  padding: 8px;
}

.side-nav > ul > .side-menu:hover {
  cursor: pointer;
}

.side-nav > ul > .side-menu > .bootstrap-icon {
  margin-top: 2px;
}
.side-nav > ul > .side-menu span {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 1px;
}

.side-nav > ul > .side-menu span:hover {
  color: #ccc;
}

.side-nav > ul > .active-nav span:hover {
  color: #000;
}

.side-nav > ul > .logo {
  text-align: center;
  text-decoration: none;
  font-size: 28px;
}

.active-nav {
  color: black !important;
  position: relative;
  background-color: #f1f5f8;
  border-radius: 10% 0% 0% 10% / 50% 10% 10% 50%;
  animation-duration: 0.5s;
  transition-duration: 0.5s;
}

.active-nav::before {
  content: "";
  position: absolute;
  right: -20px;
  width: 40px;
  height: 47px;
  bottom: -26px;
  background-color: #f1f5f8;
}

.active-nav::after {
  content: "";
  position: absolute;
  right: -20px;
  width: 40px;
  height: 47px;
  top: -25px;
  background-color: #f1f5f8;
}

.active-nav span::before {
  position: absolute;
  content: "";
  width: 25px;
  height: 30px;
  right: 0px;
  background-color: #1e3a8a;
  bottom: -30px;
  border-radius: 0% 100% 100% 0% / 30% 100% 0% 70%;
}
.active-nav span::after {
  position: absolute;
  z-index: 1;
  content: "";
  width: 25px;
  height: 30px;
  right: -3px;
  background-color: #1e3a8a;
  top: -30px;
  border-radius: 100% 0% 100% 0% / 0% 0% 100% 100%;
}
@media screen and (max-width: 1432px) {
  .active-nav::before {
    content: "";
    position: absolute;
    right: -20px;
    width: 30px;
    height: 46px;
    bottom: -17px;
    background-color: #f1f5f8;
  }

  .active-nav span::before {
    position: absolute;
    content: "";
    width: 29px;
    height: 30px;
    right: -17px;
    background-color: #1e3a8a;
    bottom: -30px;
    border-radius: 0% 100% 100% 0% / 30% 100% 0% 70%;
  }

  .active-nav::after {
    content: "";
    position: absolute;
    right: -20px;
    width: 30px;
    height: 46px;
    top: -17px;
    background-color: #f1f5f8;
  }
  .active-nav span::after {
    position: absolute;
    z-index: 1;
    content: "";
    width: 29px;
    height: 30px;
    right: -17px;
    background-color: #1e3a8a;
    top: -30px;
    border-radius: 100% 0% 100% 0% / 0% 0% 100% 100%;
  }
}
</style>
