<template>
  <div class="reportListWrap">
    <div 
      class="oneMission-wrap"
      v-for="(item,index) in mineMissionList"
      :key="index"
    >
      <div class="oneMission-cont">
        <div class="title">
          <p>{{item.taskName}}</p>
        </div>
        <div class="content">
          <p>办理人：{{item.reportName}}</p>
          <p>开始截止时间：{{item.startTime}}-{{item.endTime}}</p>
          <p>任务状态：{{item.status}}</p>
        </div>
        <div class="btn">
          <p @click="goShDetail(item.id,item.type)">查看</p>
        </div>
      </div>
    </div>
    <div style="padding: 20px 0;">
      <van-divider>无更多信息</van-divider>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      mineMissionList: '',
      power: ''
    }
  },
  methods: {
    goShDetail(id,type) {
      this.$router.push({ path: '/zprwReportDetail',query: { id: id } })
      return
    }
  },
  created() {
    this.mineMissionList = JSON.parse(localStorage.getItem('zprwReportList'))
  },
  mounted() {
    
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.reportListWrap {
  padding-top: 80/@size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  .top-wrap {
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
    font-family: SourceHanSansCN;
    font-size: 18/@size;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20/@size;
    position: fixed;
    z-index: 9999;
    top: 0;
    .return-btn {
      font-size: 28/@size;
      float: left;
      i {
        position: relative;
        top: 5/@size;
      }
    }
    a {
      color: #323232;
    }
    p {
      width: 100%;
      float: left;
      text-align: center;
      font-size: 24/@size;
      span {
        margin: 0 10/@size;
      }
    }
  }
  .oneMission-wrap {
    box-sizing: border-box;
    padding: 0 20/@size;
    width: 100%;
    height: 240/@size;
    margin-top: 20/@size;
    
    .oneMission-cont {
      background-color: #fff;
      border-top: 2px solid #00A0E9;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 20/@size;
      .title {
        height: 60/@size;
        width: 100%;
        border-bottom: 1px solid #eee;
        p {
          width: 70%;
          height: 60/@size;
          line-height: 60/@size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
          font-family:Source Han Sans CN;
          color: #323232;
          text-align: left;
          font-size: 22/@size;
        }
      }
      .content {
        width: 100%;
        height: 120/@size;
        border-bottom: 1px solid #eee;
        p {
          height: 40/@size;
          line-height: 40/@size;
          color: #A4A4A4;
          font-size: 20/@size;
        }
      }
      .btn {
        width: 100%;
        height: 60/@size;
        text-align: center;
        p {
          width: 100%;
          height: 60/@size;
          font-size: 24/@size;
          line-height: 60/@size;
          color: #58A2EF;
          font-family:Source Han Sans CN;
        }
        i {
          font-size: 18/@size;
          position: relative;
          padding: 2/@size;
          left: -10/@size;
          top: 0/@size;
          border: 1px solid #58A2EF;
          border-radius: 50%;
        }
      }
    }
  }
}

</style>