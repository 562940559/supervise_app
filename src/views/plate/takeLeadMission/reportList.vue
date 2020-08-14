<template>
  <div class="reportListWrap">
    <div class="nowCycle">
      <p><span>当前周期</span>{{dataList.appointedTaskReportTime}}</p>
    </div>
    <div 
      class="contentWrap"
      v-for="item in dataList.cbhbData"
      :key="item.reporterName"
    >
      <p class="title">汇报人：{{item.reporterName}}</p>
      <div class="content">
        <ul>
          <li>工作完成情况：{{item.completionWork == null ? '暂无' : item.completionWork+'%'}}</li>
          <li>汇报类型：{{item.reportType}}</li>
        </ul>
        <ul>
          <li @click="seeFileBasis(item.fileData)">查看汇报附件：<span>查看详情</span></li>
          <li @click="showPop('work',item)">工作落实情况：<span>查看详情</span></li>
        </ul>
        <p @click="showPop('distribution',item)" v-if="item.reportType == '办理人员汇报'">查看分配说明<span><van-icon name="arrow" /></span></p>
      </div>
    </div>
    <div 
      class="contentWrap"
      v-for="(item,index) in dataList.zrhbData"
      :key="index"
    >
      <p class="title">汇报人：{{item.reporterName}}</p>
      <div class="content">
        <ul>
          <li>工作完成情况：{{item.completionWork == null ? '暂无' : item.completionWork+'%'}}</li>
          <li>汇报类型：{{item.reportType}}</li>
        </ul>
        <ul>
          <li @click="seeFileBasis(item.fileData)">查看汇报附件：<span>查看详情</span></li>
          <li @click="showPop('work',item)">工作落实情况：<span>查看详情</span></li>
        </ul>
        <p @click="showPop('distribution',item)" v-if="item.reportType == '办理人员汇报'">查看分配说明<span><van-icon name="arrow" /></span></p>
      </div>
    </div>
    <div v-if="!isNull" style="margin-top: 20px">
      <van-divider>无更多信息</van-divider>
    </div>
    <div v-else style="margin-top: 20px">
      <van-divider>暂无汇报记录</van-divider>
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
export default {
  data() {
    return {
      dataList: '',
      show: false,
      popTitle: '',
      popContent: '',
      isNull: false
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.$api.takeLeadMission.getReportList(id)
    .then(res=>{
      if(res.cbhbData[0] == undefined) {
        this.isNull = true;
      }
      this.dataList = res;
    })
  },
  methods: {
    showPop(where,item) {
      if(where == 'work') {
        this.popTitle = '工作落实情况';this.popContent = item.implementationWork;
      }else if(where == 'distribution') {
        this.popTitle = '分配说明';this.popContent = item.distributionExplain;
      }else {
        return false;
      }
      this.show = true;
    },
    seeFileBasis(file) {
      var item = {
        taskFileData: file
      }
      this.$router.push({path: '/seeFileBasis',query: {item: item}})
    }
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
  .nowCycle {
    width: 100%;
    padding: 20/@size 0;
    background-color: #fff;
    margin-top: 10/@size;
    span {
      display: inline-block;
      width: 130/@size;
      height: 40/@size;
      line-height: 40/@size;
      background-color: #ff9f00;
      border-top-right-radius: 20/@size;
      border-bottom-right-radius: 20/@size;
      text-align: center;
      color: white;
      margin-right: 10/@size;
      font-size: 22/@size;
    }
  }
  .contentWrap {
    margin-top: 10/@size;
    .title {
      box-sizing: border-box;
      padding: 0 20/@size;
      width: 100%;
      height: 50/@size;
      line-height: 50/@size;
      background-color: #eff4fa;
      font-size: 20/@size;
    }
    .content {
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
      padding: 10/@size 20/@size;
      ul {
        width: 100%;
        height: 50/@size;
        color: #888;
        li {
          float: left;
          height: 50/@size;
          line-height: 50/@size;
          width: 50%;
          font-size: 20/@size;
          span {
            padding: 5/@size 10/@size;
            color: #02ac61;
            background-color: #dcf7e4;
            border-radius: 20/@size;
            font-size: 18/@size;
          }
        }
      }
      p {
        width: 100%;
        height: 50/@size;
        line-height: 50/@size;
        font-size: 22/@size;
        border-top: 1px solid #dcdcdc;
        margin-top: 10/@size;
        span {
          float: right;
        }
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