<template>
  <div class="main">
    <!-- 头部按钮 -->
    <div class="header">
      <div class="logo">
        <span class="big">链上商城</span>
        <span class="min">
          <img
            width="20"
            style="margin-top: 5px"
            src="../assets/images/logo.png"
            alt
          />
        </span>
      </div>
      <span class="header-btn" @click="hiddenSidebar">
        <i class="el-icon-menu"></i>
      </span>
      <div class="right">
        <span class="header-btn" @click="screen">
          <i v-if="fullscreen == false" class="el-icon-full-screen"></i>
          <i v-else class="el-icon-crop"></i>
        </span>
        <el-dropdown>
          <span class="header-btn">
            <i class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div style="padding: 10px; text-align: center; width: 420px">
              <div class="setting-category">
                <el-switch
                  @change="saveSwitchTabBarVal"
                  v-model="switchTabBar"
                  active-text="开启TabBar"
                  inactive-text="关闭TabBar"
                ></el-switch>

                <el-alert
                  v-if="switchTabBar"
                  style="margin-top: 10px"
                  title="导航标签超过容器时,可在导航上滚动鼠标来移动标签"
                  type="info"
                  show-icon
                ></el-alert>
              </div>

              <!--<div class="setting-category">-->
              <!--下个设置块-->
              <!--</div>-->
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown>
          <span class="header-btn">
            {{ $store.state.nickname }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="clearToken">
              <i style="padding-right: 8px" class="fa fa-key"></i>退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 左侧菜单栏 -->
    <div class="app">
      <div class="aside">
        <div class="menu">
          <el-menu
            :unique-opened="true"
            router
            background-color="#222d32"
            text-color="#fff"
            :default-active="$route.path"
            class="menu"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <template v-for="(menu_v, index) in menuList" v-for-item="cell">
              <el-submenu
                v-if="menu_v.list.length != 0"
                :index="'/' + index + '/'"
                :key="menu_v.id"
              >
                <template slot="title">
                  <i :class="menu_v.icon"></i>
                  <span slot="title">{{ menu_v.name }}</span>
                </template>
                <el-menu-item
                  v-for="(menuChildren_v, menuChildren_k) in menu_v.list"
                  :key="menuChildren_k"
                  :index="'/' + menuChildren_v.path"
                >
                  <i class="is-children fa fa-circle-o"></i>
                  <span slot="title">{{ menuChildren_v.name }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="'/' + menu_v.href"
                :key="menu_v.name"
              >
                <i :class="menu_v.icon"></i>
                <span slot="title">{{ menu_v.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="sidebar-toggle" @click="sidebarToggle">
          <div class="icon-left">
            <i class="el-icon-back"></i>
          </div>
        </div>
      </div>
      <!-- 页面主体部分 -->
      <div class="app-body">
        <NavBar
          id="nav-bar"
          v-if="switchTabBar"
          :style="fixedTabBar && switchTabBar ? 'position: fixed;top: 0;' : ''"
        ></NavBar>
        <div style="margin-top: 50px"></div>
        <div
          id="mainContainer"
          :style="fixedTabBar && switchTabBar ? 'margin-top: 88px;' : ''"
          class="main-container"
        >
          <!--<transition name="fade">-->
          <router-view></router-view>
          <!--</transition>-->
        </div>
        <!-- <EuiFooter></EuiFooter> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getMenu } from "../network/menu";
import { getSign } from "../network/sign";
import NavBar from "../components/home/NavBar";
export default {
  components: {},
  props: {},
  data() {
    return {
      fullscreen: false,
      fixedTabBar: false,
      switchTabBar: false,
      // siteName: this.$Config.siteName,
      isCollapse: false,
      menuList: null,
    };
  },

  methods: {
    // 退出登录
    clearToken() {
      this.$store.state.accessToken = "";
      this.$router.push({path:"/login"})
    },
    //  菜单栏宽度设置
    NavBarWidth() {
      let navBar = document.getElementById("nav-bar");
      if (!navBar) return;
      if (!(this.fixedTabBar && this.switchTabBar)) {
        navBar.style.width = "100%";
        return;
      }
      let sidebarClose = document.body.classList.contains("sidebar-close");
      if (sidebarClose) {
        navBar.style.width = "100%";
        return;
      }
      if (this.isCollapse) navBar.style.width = "calc(100% - 64px)";
      else navBar.style.width = "calc(100% - 230px)";
    },

    // 页面全屏
    screen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    saveFixedTabBar(v) {
      v
        ? localStorage.setItem("fixedTabBar", v)
        : localStorage.removeItem("fixedTabBar");
      this.NavBarWidth();
    },
    saveSwitchTabBarVal(v) {
      let containerDom = document.getElementById("mainContainer");
      v
        ? (containerDom.style.minHeight = "calc(100vh - 139px)")
        : (containerDom.style.minHeight = "calc(100vh - 101px)");
      v
        ? localStorage.setItem("switchTabBar", v)
        : localStorage.removeItem("switchTabBar");
      this.NavBarWidth();
    },
    sidebarToggle(e) {
      e.preventDefault();
      if (this.isCollapse) {
        document.body.classList.remove("sidebar-hidden");
        //this.siteName = this.$Config.siteName;
        this.isCollapse = false;
      } else {
        document.body.classList.add("sidebar-hidden");
        this.isCollapse = true;
      }
      this.NavBarWidth();
    },
    hiddenSidebar(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-close");
      this.NavBarWidth();
    },
    logout() {
      sessionStorage.removeItem(this.$Config.tokenKey);
      this.$router.push({ path: "/login" });
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //关闭菜单
    },
  },
  created() {
    // 调用登录接口
    getSign().then((res) => {
      console.log(res);
      this.menuList = res.data;
    });
  },
  mounted() {
    this.switchTabBar = localStorage.getItem("switchTabBar") ? true : false;
    this.fixedTabBar = localStorage.getItem("fixedTabBar") ? true : false;
    if (this.switchTabBar)
      document.getElementById("mainContainer").style.minHeight =
        "calc(100vh - 139px)";

    if (!this.isCollapse) {
      document.body.classList.remove("sidebar-hidden");
      // this.siteName = this.$Config.siteName
    } else {
      document.body.classList.add("sidebar-hidden");
    }

    setTimeout(() => {
      this.NavBarWidth();
    }, 1000);
  },
  components: {
    NavBar,
  },
};
</script>
<style lang="less">
.sidebar-hidden {
  .header {
    .logo {
      background: #222d32;
      .big {
        display: none;
      }
      .min {
        display: block;
      }
      width: 64px;
    }
  }
  .aside {
    .sidebar-toggle {
      .icon-left {
        transform: rotate(180deg);
      }
    }
  }
  .main {
    .app-body {
      margin-left: 64px;
    }
  }
}
.sidebar-close {
  .header {
    .logo {
      width: 0;
      overflow: hidden;
    }
  }
  .aside {
    margin-left: -230px;
  }
  .main {
    .app-body {
      margin-left: 0;
    }
  }
}
.sidebar-hidden.sidebar-close {
  .aside {
    margin-left: -64px;
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 230px;
}
.el-form-item__content {
  line-height: 20px;
}
.main {
  display: flex;

  .app {
    width: 100%;
    background-color: #ecf0f5;
  }
  .aside {
    position: fixed;
    margin-top: 50px;
    z-index: 10;
    background-color: #222d32;
    transition: all 0.3s ease-in-out;
    .menu {
      height: calc(~"100vh - 100px");
    }
    .sidebar-toggle {
      position: relative;
      width: 100%;
      height: 50px;
      background-color: #367fa9;
      color: #fff;
      cursor: pointer;
      .icon-left {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 0;
        width: 64px;
        height: 100%;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  .app-body {
    margin-left: 230px;
    -webkit-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
  }
  .main-container {
    //margin-top: 50px;
    padding: 15px;
    min-height: calc(~"100vh - 101px");
  }
}

.header {
  width: 100%;
  position: fixed;
  display: flex;
  height: 50px;
  background-color: #3c8dbc;
  z-index: 10;
  .logo {
    .min {
      display: none;
    }
    width: 230px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: #367fa9;
    -webkit-transition: width 0.35s;
    transition: all 0.3s ease-in-out;
  }
  .right {
    width: 300px;
    position: absolute;
    right: 0;
    display: flex;

    justify-content: space-around;
  }
  .signIn {
    cursor: pointer;
    color: #fff;
    line-height: 50px;
    height: 50px;
    width: 50px;
    text-align: center;
  }
  .signIn:hover {
    background: rgba(83, 83, 83, 0.233);
  }
  .header-btn {
    .el-badge__content {
      top: 14px;
      right: 7px;
      text-align: center;
      font-size: 9px;
      padding: 0 3px;
      background-color: #00a65a;
      color: #fff;
      border: none;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25em;
    }
    overflow: hidden;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    padding: 0 14px;
    color: #fff;
    &:hover {
      background-color: #367fa9;
    }
  }
}

.menu {
  border-right: none;

  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
}
.el-dialog__title {
  line-height: 24px;
  font-size: 14px;
  color: #303133;
}
.el-menu--vertical {
  min-width: 190px;
}
.setting-category {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.fa {
  margin-right: 14px;
}
input[disabled],
input:disabled,
input.disabled {
  color: #aaa;
  -webkit-text-fill-color: #aaa;
  -webkit-opacity: 1;
  opacity: 1;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>
