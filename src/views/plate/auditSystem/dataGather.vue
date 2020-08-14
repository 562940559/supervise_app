<template>
  <div class="examineDetailWrap">
    <div 
      v-for="(item, index) in examine"
      :key="index"
      class="detailWrap"
    >
      <div class="title">
        <span>审核人：{{item.auditor}}</span>
        <span>{{item.auditTime}}</span>
      </div>
      <div class="content">
        <p>审核意见：<span @click="seeDetail('审核意见',item.auditOpinion)">查看详情</span></p>
        <p>备注：<span @click="seeDetail('备注',item.remark)">查看详情</span></p>
        <div style="clear: both;"></div>
      </div>
    </div>
    <div style="margin: 20px;">
      <van-divider>已经到底了</van-divider>
    </div>
    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>{{popTitle}}</p>
        <p>{{popContent}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Popup } from 'vant';
export default {
  data() {
    return {
      examine: '',
      popTitle: '',
      popContent: '',
      show: false
    }
  },
  mounted() {
   this.examine = this.$route.query.item;
  },
  methods: {
    seeDetail(title,item) {
      this.show = true;
      this.popTitle = title;
      this.popContent = item;
      if(this.popContent == '') {
        return this.popContent = '暂无';
      }
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.examineDetailWrap {
  width: 100%;
  padding-top: 80/@size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  
  .detailWrap {
    .title {
      background: #eef4fb;
      height: 60/@size;
      width: 100%;
      padding: 0 10/@size;
      box-sizing: border-box;
      span {
        display: inline-block;
        width: 49%;
        height: 60/@size;
        line-height: 60/@size;
        font-size: 20/@size;
      }
      span:nth-child(2) {
        text-align: right;
      }
    }
    .content {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 10/@size;
      p {
        font-size: 20/@size;
        color: #888888;
        width: 50%;
        float: left;
        height: 60/@size;
        line-height: 60/@size;
      }
      p span{
        padding: 5/@size 15/@size;
        border-radius: 20/@size;
        background-color: #dcf7e4;
        color: #02ac61;
      }
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