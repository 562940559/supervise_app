<template>
  <div id="app">
    <!-- 头部信息栏 -->
    <div class="top-wrap" v-if="$route.meta.showTop">
      <span class="return-btn" v-if="$route.meta.showBack">
        <van-icon name="arrow-left" @click="routerBack"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span class="setting-btn">
        <router-link to="/searchMission">
          <van-icon name="search" v-if="!$route.meta.showSearch"></van-icon>
        </router-link>
        <router-link to="/createTask">
          <van-icon name="add-o" v-if="!$route.meta.showAdd"></van-icon>
        </router-link>
        <router-link to="/" replace>
          <van-icon name="home-o" v-if="$route.meta.showHome"></van-icon>
        </router-link>
      </span>
    </div>
    <!-- 页面 -->
    <!-- 存在与keep-alive中的页面会被vue缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <van-tabbar v-model="active" v-if="$route.meta.showTab">
      <van-tabbar-item icon="chat-o" :info='getLength' to="/chatIndex" >消息</van-tabbar-item>
      <!-- <van-tabbar-item icon="underway-o" to="/needToDo">待办</van-tabbar-item> -->
      <van-tabbar-item icon="todo-list-o" to="/" replace>工作</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/mailList" >通讯录</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
import { Dialog } from "vant";
import store from './store';
export default {
  name: 'app',
  data() {
    return {
      active: 1,
    }
  },
  computed: {
    getLength() {
      return this.$store.state.unReadLength
    }
  },
  methods: {
    routerBack() {
      this.$router.back(-1);
    }
  },
  watch: {
    $route (to,from) { // 监听路由，改变tabbar的active项
      this.active = to.meta.active;
    }
  },
};
</script>

<style lang="less" type="text/less">
@import './assets/less/common.less';
  #app {
    width: 100%;height:100%;
  }
  // 对vant的Tabbar的样式进行修改
  .van-tabbar {
    height: 88/@size;
    border-top: 2/@size solid #ececf0;
  }
  .van-tabbar-item__icon {
    font-size: 38/@size!important;
    margin-bottom: 5/@size!important;
    .van-info {
      font-size: 18/@size;
      line-height: 20/@size;
      min-width: 24/@size;
      top: 8/@size;
    }
  }
  .van-tabbar-item__text {
    font-size: 18/@size!important;
  }
  .van-tabbar-item--active {
    color: #02ac61!important;
  }
</style>
<style scoped lang="less" type="text/less">
@import './assets/less/common.less';
// 对顶部导航条进行样式修改
  .top-wrap {
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
    font-family: SourceHanSansCN;
    font-size: 18/@size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20/@size;
    position: fixed;
    z-index: 9999;
    .return-btn {
      font-size: 28/@size;
      width: 150/@size;
      i {
        position: relative;
        top: 5/@size;
      }
      .text {
        position: relative;
        left: -10/@size;
      }
    }
    .route-title {
      font-size: 30/@size;
      text-align: left;
    }
    .setting-btn {
      font-size: 36/@size;
      width: 150/@size;
      text-align: right;
      position: relative;
      top: 5/@size;
      a:nth-child(1) {
        margin-right: 30/@size;
      }
      a {
        color: #323232;
      }
    }
  }
</style>
