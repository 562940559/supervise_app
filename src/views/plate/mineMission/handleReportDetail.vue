<template>
  <div class="leadingReportDetailWrap">
    <div class="plateWrap">
      <span>汇报人</span>
      <span>{{detail.reporterName}}</span>
    </div>
    <div class="plateWrap">
      <span>查看工作完成情况</span>
      <span>{{detail.completionWork}}%</span>
    </div>
    <div @click="show = true" class="plateWrap">
      <span>查看工作落实情况</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <div @click="goEnclosure()" class="plateWrap">
      <span>查看汇报附件</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>工作落实情况</p>
        <p>{{detail.implementationWork}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Toast } from 'vant';
import * as $api from '@/api';
import base from '@/api/base.js'; // 导入接口域名列表
import axios from 'axios';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      detail: '',
      show: false,
    }
  },
  methods: {
    seeWork() {
      this.show = true;
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.$api.mineMission.getCoordinationReportDetail(id)
    .then(res=>{
      this.detail = res;
    })
  },
  methods: {
    goEnclosure() {
      axios.get(`/app/downloadFile/472`,  {
        responseType: 'blob'
      }).then(res => {
        let blob = new Blob([aes.decrypt(res.data)], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'
        });
        let objectUrl = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = objectUrl;
        a.download = "客户";
        //a.click();
        //下面这个写法兼容火狐
        a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
        window.URL.revokeObjectURL(blob);
      })
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.leadingReportDetailWrap {
  width: 100%;
  padding-top: 80/@size;
  min-height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;
  .plateWrap {
    width: 100%;
    height: 70/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 10/@size;
    color: #6e6e6e;
    border-bottom: 1px solid #f7f7f7;
    span {
      display: inline-block;
      height: 70/@size;
      line-height: 70/@size;
      font-size: 20/@size;
    }
    span:nth-child(2){
      float: right;
      color: #000;
      max-width: 350/@size;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .popWrap {
    background-color: #fff;
    padding: 50/@size;
    position: relative;
    border-radius: 50/@size;
    p {
      width: 300/@size;
    }
  }
  .popWrap p:nth-child(1) { 
    text-align: center;font-size: 22/@size;color: #000;
    margin-bottom: 20/@size;
  }
  .popWrap p:nth-child(2) {
    word-wrap: break-word;
    color: #737373;
    font-size: 20/@size;
  }
}
</style>