<template>
  <div class="handleReportWrap">
    <div 
      class="partWrap"
      v-for="(item,index) in list"
      :key="index"
    >
      <div class="title">{{item.superviseHandleMatter}}</div>
      <div class="content">
        <p>汇报截止日期：{{item.appointedTaskReportTime}}</p>
        <p>{{item.status}}</p>
        <span style="clear:both;"></span>
      </div>
      <div class="seeDetail" @click="toHandleReportDetail(item.id)">
        <van-icon name="info-o" />
        查看详情
      </div>
    </div>
    <div style="margin-top: 20px">
      <van-divider>无更多信息</van-divider>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      list: ''
    }
  },
  methods: {
    toHandleReportDetail(id) {
      this.$router.push({path:'/handleReportDetail',query:{id: id}})
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.$api.mineMission.getHandleReport(id)
    .then(res=>{
      this.list = res.undertakerReports
    })
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.handleReportWrap {
  width: 100%;
  padding-top: 80/@size;
  min-height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;
  .partWrap {
    width: 100%;
    height: 190/@size;
    box-sizing: border-box;
    padding: 0 10/@size;
    background-color: #fff;
    margin-bottom: 20/@size;
    .title {
      width: 100%;
      height: 60/@size;
      line-height: 60/@size;
      color: #333;
      font-size: 22/@size;
      border-bottom: 1px solid #ccc;
    }
    .content {
      height: 80/@size;
      width: 100%;
      font-size: 20/@size;
      line-height: 80/@size;
      p { 
        float: left;
        color: #888;
      }
      p:nth-child(2) { 
        float: right; 
        color: #ff9600;
      }
    }
    .seeDetail {
      font-size: 20/@size;
      color: #02ac61;
      display: flex;
      align-items: center;
      i {
        margin-right: 10/@size;
      }
    }
  }
}

</style>