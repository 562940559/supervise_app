<template>
<div class="processingProcessWrap">
  <div v-show="missionOver == 'true'" style="margin: 10px 0;">
    <van-divider>任务已完结</van-divider>
  </div>
  <div 
    class="processWrap"
    v-for="(item, index) in processList"
    :key="index"
  >
    <div class="stepsWrap">
      <van-icon name="checked" color="#6adac9" />
    </div>
    <div class="contentWrap">
      <div class="content" @click="showPop(item)">
        <p>
          <span>办理人：{{item.dealer}}</span>
          <span>{{item.processingTime}}</span>
        </p>
        <p>
          <span>流程节点：{{item.processLink}}</span>
        </p>
        <p>
          <span>下一办理人：{{item.nextHandler}}</span>
          <span :style="{background:(item.linkOpinions=='未通过' ? '#eb6100' : '#6adac9')}">
            {{item.linkOpinions}}
          </span>
        </p>
      </div>
      <div 
        class="seeResult"
        v-if="item.linkOpinions == '已完成汇报'"
        @click="goReportDetail(item.processLink,item)"
      >
        <p>查看汇报结果<span>>></span></p>
      </div>
    </div>
    <div style="clear: both;"></div>
  </div>
  <div style="margin: 20px 0;">
    <van-divider>没有更多内容了</van-divider>
  </div>
  <!-- pop弹出层 -->
  <van-popup v-model="show">
    <div class="popWrap">
      <p>办理人：{{popContent.dealer}}</p>
      <p>办理时间：{{popContent.processingTime}}</p>
      <p>流程节点：{{popContent.processLink}}</p>
      <p>下一办理人：{{popContent.nextHandler}}</p>
      <p>任务状态：{{popContent.linkOpinions}}</p>
    </div>
  </van-popup>
</div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      active: 1,
      processList: '',
      show: false,
      popContent: '',
      missionOver: false
    }
  },
  mounted() {
    var type = this.$route.query.type, id = this.$route.query.id;
    if(type == '牵头任务审批') {
     type = 'qtrw'
    }else if(type == '督办任务审批') {
     type = 'dbrw'
    }else if(type == '承办任务审批' || type == '配合任务审批') {
     type = 'zxrw'
    }else if(type == '牵头人任务') {
     type = 'qtrw'
    }else if(type == '执行人任务') {
     type = 'zxrw'
    }else {
      return false;
    }
    this.$api.approval.getHandleProcess(type,id)
    .then(res=>{
      this.missionOver = res.missionOver;
      this.processList = res.processRecordData;
    })
  },
  methods: {
    showPop(item) {
      this.popContent = item;
      this.show = true;
    },
    goReportDetail(where,item) {
      if(where == '牵头任务汇报') {
        var id = item.initiatorId;
        return this.$router.push({ path: '/takeLeadReportDetail',query: {id: id} })
      }else if(where == '配合任务汇报') {
        var id = item.executorId;
        return this.$router.push({ path: '/coordinateReportDetail',query: {id: id} })
      }else if(where == '承办任务汇报') {
        var id = item.executorId;
        return this.$router.push({ path: '/undertakeReportDetail',query: {id: id} })
      }
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.processingProcessWrap {
  padding-top: 80/@size;
  min-height: 100%;
  background-color: #f7f7f7;
  box-sizing: border-box;
  overflow: hidden;
  .processWrap {
    padding: 0 10/@size;
    box-sizing: border-box;
    min-height: 150/@size;
    font-size: 0;
    overflow: hidden;
    position: relative;
    div { float: left; }
    .stepsWrap {
      font-size: 40/@size;
      width: .8rem;
      height: 50/@size;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      margin-top: -25/@size;
      i {
        z-index: 999;
        background-color: #f7f7f7;
      }
    }
    .stepsWrap:after {
      position: absolute;
      z-index: 1;
      top: 50%;
      width: 5/@size;
      height: 200/@size;
      background-color: #dcdcdc;
      content: ''
    }
    .stepsWrap:before {
      position: absolute;
      width: 5/@size;
      height: 300/@size;
      background-color: #dcdcdc;
      content: ''
    }
    .contentWrap {
      font-size: 20/@size;
      min-height: 130/@size;
      width: calc(~'100% - 1.1rem');
      margin-left: .9rem;
      padding: 10/@size 0;
      .seeResult {
        width: 100%;
        height: 50/@size;
        background-color: #eee;
        box-sizing: border-box;
        padding: 10/@size;
        p {
          font-size: 20/@size;
          color: #868686;
          width: 100%;
          span {
            float: right;
            font-size: 18/@size;
          }
        }
      }
      .content {
        width: 100%;
        height: 130/@size;
        background-color: #fff;
        box-sizing: border-box;
        padding: 10/@size;
        p {
          width: 100%;
          height: 30/@size;
          margin-bottom: 10/@size;
          span {
            display: inline-block;
            height: 30/@size;
            line-height: 30/@size;
            color: #767676;
            font-size: 20/@size;
          }
        }
        p:nth-child(1) {
          span:first-child {
            font-size: 22/@size;
            color: rgb(107, 107, 107);
          }
          span:last-child {
            float: right;
          }
        }
        p:nth-child(3) {
          margin-bottom: 0;
          span:last-child {
            float: right;
            width: 120/@size;
            color: white;
            text-align: center;
            border-radius: 5/@size;
            font-size: 18/@size;
          }
        }
      }
      .seeResult {
        width: 100%;
        height: 50/@size;
        background-color: #eee;
      }
    }
  }
}
.processingProcessWrap .processWrap:nth-child(2) .stepsWrap:before,
.processingProcessWrap .processWrap:nth-last-child(2) .stepsWrap:after {
  display: none;
}
.processingProcessWrap .processWrap:nth-last-child(2) .stepsWrap:before {
  height: 120/@size;
  position: absolute;
  width: 5/@size;
  top: -100/@size;
  background-color: #dcdcdc;
  content: ''
}
.popWrap {
  background-color: #fff;
  width: 400/@size;
  height: 250/@size;
  padding: 20/@size;
  box-sizing: border-box;
  p {
    font-size: 20/@size;
    height: 40/@size;
    line-height: 40/@size;
  }
}
</style>