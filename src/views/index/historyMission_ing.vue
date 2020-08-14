<template>
  <div class="historyMission-wrap">
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <p>
        <router-link to="/historyMission" replace>
          <span>进行中</span>
        </router-link>
        <router-link style="color: #ABABAB" to="/historyMission_done" replace>
          <span>已完成</span>
        </router-link>
      </p>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
    >
      <div 
        class="oneMission-wrap"
        v-for="(item,index) in historyMissionList"
        :key="index"
      >
        <div class="oneMission-cont">
          <div class="title" v-if="item.taskType != '数据申请'">
            <p>{{item.taskName}}</p>
            <p>{{item.endTime}}</p>
          </div>
          <div class="title" v-if="item.taskType == '数据申请'">
            <p>{{item.applicant}}提出的数据申请</p>
            <p>{{item.applyTime}}</p>
          </div>
          <div class="content">
            <p>任务类型：{{item.taskType}}</p>
            <p>任务状态：{{item.status}}</p>
          </div>
          <div class="btn">
            <p @click="goDetail(item.id,item.taskType,item.status,item)">查看</p>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../utils/aes';
export default {
  data() {
    return {
      requestPara: {
        current: 1
      },
      historyMissionList: [],
      loading: false,
      finished: false,
      offset: 100,
    }
  },
  methods: {
    routerBack() {
      this.$router.push('/')
    },
    getHistoryMissionList() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.requestPara)),
      data = `"requestData": "${info}"`;
      this.$api.historyMission.getHistoryMissionList(data)
      .then(res=>{
        console.log(res)
        if (JSON.stringify(res.ongoingData[0]) == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.historyMissionList = this.historyMissionList.concat(res.ongoingData);
        this.requestPara.current ++;
        this.loading = false;
      })
    },
    goDetail(id,type,status,item) {
      if(type == '督办任务') {
        this.$router.push({path: '/fileMissionDetail',query: {id: id,type: status}})
      }else if(type == '指派任务') {
        this.$router.push({path: '/zprwFileMissionDetail',query: {id: id,type: status}})
      }else if(item.taskType == '数据申请') {
        this.$router.push({path: '/approvalProcess',query: {id: id}})
      }
    },
    onLoad() {
      this.getHistoryMissionList();
    }
  },
  created() {
    this.getHistoryMissionList();
    localStorage.setItem('isIndex',false)
  },
  mounted() {

  },
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.historyMission-wrap {
  width: 100%;
  min-height: 100%;
  background-color: rgb(249,249,249);
  padding-top: 80/@size;
  box-sizing: border-box;
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
        position: relative;
        b {
          display: inline-block;
          position: absolute;
          width: 15/@size;
          height: 15/@size;
          right: -13/@size;
          background-color: red;
          border-radius: 10/@size;
        }
      }
    }
  }

  .oneMission-wrap {
    box-sizing: border-box;
    padding: 0 20/@size;
    width: 100%;
    height: 220/@size;
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
          width: 50%;
          height: 60/@size;
          line-height: 60/@size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
          font-family:Source Han Sans CN;
        }
        p:nth-child(1) {
          color: #323232;
          text-align: left;
          font-size: 22/@size;
        }
        p:nth-child(2) {
          color: #A4A4A4;
          text-align: right;
          font-size: 18/@size;
        }
      }
      .content {
        width: 100%;
        height: 100/@size;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 10/@size 0;
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
      }
    }
  }
}
</style>