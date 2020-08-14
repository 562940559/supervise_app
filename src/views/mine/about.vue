<template>
  <div class="aboutWrap">
    <div class="logoWrap">
      <img src="../../assets/img/mine/logo.png" alt="Logo">
      <p>版本号 v1.2.6</p>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../utils/aes';
import { Toast,Dialog } from 'vant';
export default {
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang="less" type="text/less">
@import '../../assets/less/common.less';
.aboutWrap {
  height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;
  padding-top: 80/@size;
  .logoWrap {
    width: 100%;
    height: 250/@size;
    text-align: center;
    box-sizing: border-box;
    padding: 50/@size 0;
    img {
      width: 150/@size;
      height: 100/@size;
    }
    p {
      color: #7f7f7f;
      font-size: 20/@size;
    }
  }
  .optionWrap {
    height: 100/@size;
    width: 100%;
    border-top: 10/@size solid #f7f7f7;
    box-sizing: border-box;
    padding: 0 20/@size;
    display: flex;
    align-items: center;
    background-color: #fff;
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
}
</style>