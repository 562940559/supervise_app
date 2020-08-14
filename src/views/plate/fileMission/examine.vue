<template>
  <div class="examineWrap">
    <van-collapse v-model="activeNames">
      <van-collapse-item
        v-for="(item,index) in dataList.auditComments"
        :name="index"
        :key="index"
      >
        <div class="collapseTitle" slot="title">
          <img src="../../../../static/img/createTask/cycle.png" alt="">
          <b>汇报周期</b>
          <span>{{item.reportingPeriod}}</span>
        </div>
        <div @click="goOther('/seeAuditDetails',item.leadTaskAudit)" class="plateWrap">
          <span>牵头任务审批</span>
          <span><van-icon name="arrow" /></span>
        </div>
        <div @click="goOther('/seeAuditDetails',item.cooperateTaskAudit)" class="plateWrap">
          <span>配合任务审批</span>
          <span><van-icon name="arrow" /></span>
        </div>
        <div @click="goOther('/seeAuditDetails',item.conductTaskAudit)" class="plateWrap">
          <span>办理人员审批</span>
          <span><van-icon name="arrow" /></span>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      dataList: '',
      fileMissionId: '',
      activeNames: ['1']
    }
  },
  mounted() {
    this.fileMissionId = this.$route.query.id;
    this.getTodoMissionDetail();
  },
  methods: {
    getTodoMissionDetail() {
      var id = this.fileMissionId;
      this.$api.fileMission.getTodoMissionDetail(id)
      .then(res=>{
        this.dataList = res;
      })
    },
    goOther(where,item) {
      var reportAuditComments = {
        reportAuditComments: item
      };
      this.$router.push({path: `${where}`,query: {item: reportAuditComments}})
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.examineWrap {
  padding-top: 80/@size;

  .collapseTitle {
    display: flex;
    align-items: center;
    font-size: 22/@size;
    b {
      display: inline-block;
      flex: 1;
      margin-left: 20/@size;
      color: #000;
      font-weight: 400;
    }
  }
  
  img {
    width: 50/@size;height: 45/@size;
  }
  
  .plateWrap {
    width: 100%;
    height: 80/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 10/@size;
    span {
      display: inline-block;
      height: 80/@size;
      line-height: 80/@size;
      font-size: 20/@size;
      color: #000;
      input {
        text-align: right;
        padding: 0;
        height: 90%;
      }
      input::placeholder{
        color:#0490e9;
      }
    }
    span:nth-child(2){
      float: right;
      color: #bfbfbf;
      max-width: 350/@size;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>