<template>
  <div class="examineDetailWrap">
    <div 
      v-for="(item, index) in examine"
      :key="index"
      class="detailWrap"
    >
      <div class="title">
        <span>审核人：{{item.auditorName == undefined ? item.reviewerName : item.auditorName}}</span>
        <span>{{item.auditTime}}</span>
      </div>
      <div class="content">
        <p>发起人：<span>{{item.originator}}</span></p>
        <p v-if="item.isPass">审核结果：<span :style="{'color': (item.isPass=='审核通过' ? '#259dfc':'#ff0000')}">{{item.isPass}}</span></p>
        <p v-if="item.whetherThrough">审核结果：<span :style="{'color': (item.whetherThrough=='审核通过' ? '#259dfc':'#ff0000')}">{{item.whetherThrough}}</span></p>
        <p>审核意见：<span @click="seeDetail(item.auditOpinion)">查看详情</span></p>
      </div>
    </div>
    <div style="margin: 20px;">
      <van-divider>已经到底了</van-divider>
    </div>
    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>审核意见</p>
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
      popContent: '',
      show: false
    }
  },
  mounted() {
    if(this.$route.query.item.reportAuditComments) {
      return this.examine = this.$route.query.item.reportAuditComments;
    }else if(this.$route.query.item.taskAudit){
      return this.examine = this.$route.query.item.taskAudit;
    }else if(this.$route.query.item.auditComments) {
      return this.examine = this.$route.query.item.auditComments;
    }
  },
  methods: {
    seeDetail(item) {
      this.show = true;
      this.popContent = item;
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
      height: 150/@size;
      background-color: #fff;
      box-sizing: border-box;
      padding: 10/@size;
      p {
        font-size: 20/@size;
        color: #888888;
        display: inline-block;
        width: 49%;
        height: 60/@size;
        line-height: 60/@size;
      }
      p:nth-child(1) {
        width: 100%;
      }
      p:nth-child(3) span{
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