<template>
  <div class="settingWrap">
    <router-link to="/about" class="optionWrap">
      <p>关于督查督办</p>
      <img src="../../assets/img/mine/go.png" alt="前往">
    </router-link>
    <div class="optionWrap logout">
      <p @click="loginOut()">退出登录</p>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {

    }
  },
  created() {
    localStorage.setItem('isIndex',false)
  },
  methods: {
    loginOut() {
      Dialog.confirm({
        title: '提示',
        message: '确认退出登录吗？',
        confirmButtonColor: '#02ac61',
        cancelButtonColor: '#02ac61',
      }).then(() => {
        this.$store.commit('del_token');
        localStorage.clear()
        this.$router.replace('/login');
      })
    }
  }
}
</script>

<style lang="less" type="text/less">
@import '../../assets/less/common.less';
.settingWrap {
  height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;
  padding-top: 80/@size;
  .optionWrap {
    height: 100/@size;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20/@size;
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-top: 30/@size;
    img:nth-child(2) {
      width: 10/@size;
      height: 20/@size;
    }
    p {
      width: 100%;
      color: black;
      font-size: 24/@size;
      box-sizing: border-box;
      padding-left: 20/@size;
    }
  }
  .logout {
    margin-top: 30/@size;
    p {
      padding: 0;
      text-align: center;
    }
  }
}
</style>