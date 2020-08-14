<template>
  <div class="approvedDetailWrap">
    <div class="approvalTitle">
      <p>办理时间</p>
      <p>{{missionDetail.reportTime}}</p>
      <p>已审核</p>
      <div style="clear: both;"></div>
    </div>
    <!-- 基本信息 -->
    <van-collapse v-model="activeNames1">
      <van-collapse-item title="基本信息" name="1">

        <!-- 基本信息 -->
        <div>
          <div class="plateWrap">
            <span>任务名称</span>
            <span @click="showPop2(missionDetail.taskName)">{{missionDetail.taskName}}</span>
          </div>
          <div class="plateWrap">
            <span>开始时间</span>
            <span>{{missionDetail.startTime}}</span>
          </div>
          <div class="plateWrap">
            <span>截止时间</span>
            <span>{{missionDetail.endTime}}</span>
          </div>
          <div @click="showPop('content')" class="plateWrap">
            <span>查看任务内容</span>
            <span><van-icon name="arrow" /></span>
          </div>
        </div>

      </van-collapse-item>
    </van-collapse>
    <!-- 任务办理情况 -->
    <van-collapse v-model="activeNames2">
      <van-collapse-item title="任务办理情况" name="1">
        <div
          @click="showPop('remarks')" 
          class="plateWrap"
        >
          <span>查看备注</span>
          <span><van-icon name="arrow" /></span>
        </div>
        <div @click="showPop('workable')" class="plateWrap">
          <span>查看工作落实情况</span>
          <span><van-icon name="arrow" /></span>
        </div>
        <div @click="goOther('seeFileBasis')" class="plateWrap">
          <span>查看文件依据</span>
          <span><van-icon name="arrow" /></span>
        </div>
        <div @click="goOther('seeEnclosure')" class="plateWrap">
          <span>查看汇报附件</span>
          <span><van-icon name="arrow" /></span>
        </div>
        <div @click="goOther('seeAuditDetails')" class="plateWrap">
          <span>查看审核详情</span>
          <span><van-icon name="arrow" /></span>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div v-if="type=='牵头任务审批'" @click="goOther('takeLeadReportList')" class="plateWrap">
      <span style="color: #259dfc">查看汇报情况</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
    <van-popup v-model="show2">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
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
      activeNames1: [],
      activeNames2: ['1'],
      missionDetail: '',
      type: '',
      show: false,
      show2: false,
      showTitle: '',
      showText: '',
      id: ''
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.id = id;
    this.$api.zprwApproval.getApprovedDetail(id)
    .then(res=>{
      this.missionDetail = res;
    })
  },
  methods: {
    showPop(where) {
      if(where == 'content') {
        this.showTitle = '任务内容';this.showText = this.missionDetail.taskContent;
      }else if(where ==  'workable') {
        this.showTitle = '工作完成情况';this.showText = this.missionDetail.taskWork;
      }else if(where == 'remarks') {
        this.showTitle = '备注';this.showText = this.missionDetail.remark;
      }
      this.show = true;
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
    goOther(where) {
      this.$router.push({ path: `/${where}`,query: { id: this.id,type: this.type,item: this.missionDetail } })
    }
  }
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.approvedDetailWrap {
  .van-collapse-item__content {
    padding: 10/@size 0/@size;
  }
  .van-collapse {
    margin-bottom: 20/@size;
  }
  .van-button--large {
    height: 100%;
  }
}
</style>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.approvedDetailWrap {
  padding-top: 80/@size;
  min-height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;

  .approvalTitle {
    padding: 15/@size 0;
    background-color: #fff;
    margin-bottom: 20/@size;
    padding-right: 20/@size;
    p { font-size: 22/@size;float: left;height: 40/@size;line-height: 40/@size; }
    p:nth-child(1) {
      padding: 0 20/@size;
      color: white;
      border-top-right-radius: 20/@size;
      border-bottom-right-radius: 20/@size;
      background-color: #f7a014;
      margin-right: 10/@size;
    }
    p:nth-child(3) {
      float: right;
      color: #fa6565;
    }
  }

  .plateWrap {
    width: 100%;
    height: 60/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15/@size;
    border-bottom: 1px solid #e5e5e5;
    span {
      display: inline-block;
      height: 60/@size;
      line-height: 60/@size;
      font-size: 20/@size;
      position: relative;
      i {
        position: relative;
        top: 3/@size;
      }
    }
  }
  .plateWrap span:nth-child(2){
    float: right;
    color: #6e6e6e;
    max-width: 350/@size;
    width: 300/@size;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #000;
  }
  .plateWrap:last-child {
    border-bottom: none;
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

  .optionWrap {
    width: 100%;
    height: 200/@size;
    box-sizing: border-box;
    padding: 20/@size 15/@size;
    p {
      color: #000;
      font-size: 22/@size;
      position: relative;
      height: 40/@size;
      line-height: 40/@size;
      margin-bottom: 10/@size;
      b {
        color: #ff0000;
        font-size: 15/@size;
        position: absolute;
        top: -5/@size;
      }
    }
    textarea {
      width: 100%;
      height: 120/@size;
      font-size: 20/@size;
      color: #000;
      box-sizing: border-box;
      padding: 5/@size;
    }
  }

  .btnGroup {
    width: 100%;
    height: 80/@size;
    position: fixed;
    bottom: 0px;
    .btnWrap {
      float: left;
      height: 100%;
      width: 50%;
    }
  }

}
</style>