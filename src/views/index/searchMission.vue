<template>
  <div class="searchMission-wrap">
    <div class="searchInput-wrap">
      <form action="/">
        <van-search
          v-model="requestPara.supervisoryItems"
          placeholder="请输入任务关键词"
          @search="onSearch"
          shape="round"
          input-align="center"
        />
      </form>
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
        v-for="(item,index) in searchResultList"
        :key="index"
      >
        <div class="oneMission-cont">
          <div class="title">
            <p>{{item.supervisoryItems}}</p>
            <p>{{item.reportTime}}</p>
          </div>
          <div class="content">
            <p>开始结束时间：{{item.startTime}}-{{item.endTime}}</p>
            <p>任务来源：{{item.source}}</p>
            <p>发起人：{{item.transactor}}</p>
            <p>汇报截止时间：{{item.appointedTaskReportTime}}</p>
            <p>任务类型：{{item.type}}</p>
            <p>任务状态：{{item.statusStr}}</p>
          </div>
          <div class="btn">
            <p @click="goDetail(item.id,item.status,item.type)">查看</p>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../utils/aes';
import { Search  } from 'vant';
export default {
  data() {
    return {
      requestPara: {
        current: 1,
        supervisoryItems: '',
      },
      searchResultList: [],
      loading: false,
      finished: true,
      offset: 100,
    }
  },
  created() {
    localStorage.setItem('isIndex',false)
  },
  activated() {
    localStorage.setItem('isIndex',false)
  },
  mounted() {

  },
  methods: {
    getSearchResultList() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.requestPara)),
      data = `"requestData": "${info}"`;
      this.$api.historyMission.getSeatchMissionList(data)
      .then(res=>{
        if (JSON.stringify(res.searchData[0]) == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.searchResultList = this.searchResultList.concat(res.searchData);
        this.requestPara.current ++;
        this.loading = false;
      })
    },
    onSearch() {
      this.searchResultList = [];
      this.requestPara.current = 1;
      this.getSearchResultList();
    },
    onLoad() {
      this.getSearchResultList();
    },
    goDetail(id,status,type) {
      if(type == '承办任务') {
        //承办任务
        if(status == '0') {
          //承办汇报（汇报）
          this.$router.push({path: '/undertakeReport',query: {id: id}})
          return
        }else if(status == '3') { 
          //承办汇报（修改）
          this.$router.push({path: '/undertakeReport',query: {id: id,pageType: 'modify'}})
          return
        }else if(status == '1' || status == '2') {
          //承办审批
          this.$router.push({path: '/takeLeadReport',query: {id: id,type: '承办任务审批'}})
          return
        }else if(status == '4') {
          //承办详情
          this.$router.push({path: '/undertakeReportDetail',query: {id: id}})
          return
        }
      }
      if(type == '牵头任务') {
        //牵头任务
        if(status == '0') { 
          //牵头汇报（汇报）
          this.$router.push({path: '/takeLeadReport',query: {id: id}})
          return
        }else if(status == '3' || status == '5' || status == '7') { 
          //牵头汇报（修改）
          this.$router.push({path: '/takeLeadReport',query: {id: id,pageType: 'modify'}})
          return
        }else if(status == '1' || status == '2' || status == '4' || status == '6') {
          //牵头审批
          this.$router.push({path: '/takeLeadReport',query: {id: id,type: '牵头任务审批'}})
          return
        }else if(status == '8') {
          //牵头完成
          this.$router.push({path: '/takeLeadReportDetail',query: {id: id}})
          return
        }
      }
      if(type == '督办任务') {
        //督办任务
        if(status == '0' || status == '3') {
          //督办任务汇报
          this.$api.createTask.getCompletedDetail(id)
          .then(res=>{
            this.$router.push({path: '/addTask',query: {item: res}})
          })
          return
        }else if(status == '1' || status == '2') {
          //督办审批
          this.$router.push({path: '/takeLeadReport',query: {id: id,type: '督办任务审批'}})
          return
        }else if(status == '4') {
          //分配
          this.$router.push({path: '/missionDistributionDetail',query: {id: id,type: 'distribution'}})
          return
        }else if(status == '6') {
          //任务归档
          this.$router.push({path: '/fileMissionDetail',query: {id: id,type: 'todo'}})
          return
        }else if(status == '7') {
          //归档完成
          this.$router.push({path: '/fileMissionDetail',query: {id: id,type: 'done'}})
          return
        }
      }
      if(type == '责任任务') {
        //配合任务
        if(status == '0') {
          //配合汇报（汇报）
          this.$router.push({path: '/coordinateReport',query: {id: id}})
          return
        }else if(status == '3') {
          //配合汇报（修改）
          this.$router.push({path: '/coordinateReport',query: {id: id,pageType: 'modify'}})
          return
        }else if(status == '1' || status == '2') {
          //配合审批
          this.$router.push({path: '/takeLeadReport',query: {id: id,type: '配合任务审批'}})
          return
        }else if(status == '4') {
          //配合完成
          this.$router.push({path: '/coordinateReportDetail',query: {id: id}})
          return
        }
      }
      if(type == '指派任务') {
        //指派任务
        if(status == '0') {
          //指派任务（汇报）
          this.$api.zprwCreateTask.getCompletedDetail(id)
          .then(res=>{
            this.$router.push({path: '/addZprwNiBan',query: {item: res,id: id}})
          })
          return
        }else if(status == '2'){
          //指派任务（归档）
          this.$router.push({ path: '/zprwFileMissionDetail',query: {id: id,type: 'todo'} })
          return
        }else if(status == '3'){
          //指派任务（查看归档）
          this.$router.push({ path: '/zprwFileMissionDetail',query: {id: id,type: 'done'} })
          return
        }
      }
      if(type == '指派汇报任务') {
        //指派汇报任务
        if(status == '0') {
          //指派汇报（汇报）
          this.$router.push({path: '/zprwReport',query: {id: id,pageType: 'report'}})
          return
        }else if(status == '3') {
          //指派汇报（修改）
          this.$router.push({path: '/zprwReport',query: {id: id,pageType: 'modify'}})
          return
        }else if(status == '1' || status == '2') {
          this.$router.push({ path: '/zprwPendingApprovalDetail',query: { id: id } })
          return
        }else if(status == '4') {
          this.$router.push({ path: '/zprwReportDetail',query: { id: id } })
          return
        }
      }
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.searchMission-wrap {
  min-height: 100%;
  width: 100%;
  padding-top: 160/@size;
  box-sizing: border-box;
  background-color: rgb(249,249,249);
  .searchInput-wrap {
    width: 100%;
    padding: 10/@size 20/@size 20/@size 20/@size;
    height: 80/@size;
    box-sizing: border-box;
    background-color: #fff;
    position: fixed;
    top: 80/@size;
    -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
    -moz-box-shadow:0px 3px 3px #c8c8c8 ;
    box-shadow:0px 3px 3px #c8c8c8 ;
  }
  .oneMission-wrap {
    box-sizing: border-box;
    padding: 0 20/@size;
    width: 100%;
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