<template>
  <div class="pendingApprovalDetailWrap">
    <div class="plateOne-wrap">
      <div class="plateOne-cont">
        <div class="top">
          <div class="img-wrap">
            <img src="../../../../static/img/mineMission/dbsp.png" alt="">
          </div>
          <div class="txt-wrap">
            <p v-if="type == '督办任务审批'" @click="showPop2(missionDetail.supervisoryItems)">{{missionDetail.supervisoryItems}}</p>
            <p v-if="type == '牵头任务审批'" @click="showPop2(missionDetail.reportTime)">{{missionDetail.reportTime}}</p>
            <p v-if="type == '配合任务审批' || type == '承办任务审批'" @click="showPop2(missionDetail.superviseHandleMatter)">{{missionDetail.superviseHandleMatter}}</p>
            <p>等待审核</p>
          </div>
        </div>
        <div class="cont" v-if="type == '督办任务审批'">
          <p>开始截止时间：<span>{{missionDetail.startTime}}-{{missionDetail.endTime}}</span></p>
          <p @click="showPop2(missionDetail.source)">任务来源：<span>{{missionDetail.source}}</span></p>
          <p>牵头处室：<span>{{missionDetail.takeleadSectionName}}</span></p>
          <p>配合处室：<span>{{missionDetail.responsibilitySectionName == null ? '暂未选择' : missionDetail.responsibilitySectionName}}</span></p>
          <p>分管领导：<span>{{missionDetail.leadingName}}</span></p>
          <p>牵头负责人：<span>{{missionDetail.leadingPerson}}</span></p>
          <p>配合处室负责人：<span>{{missionDetail.responsiblePerson}}</span></p>
          <p>提醒模板：<span>{{missionDetail.templateName}}</span></p>
        </div>
        <div class="cont" v-if="type == '牵头任务审批'">
          <p>督办截止时间：<span>{{missionDetail.appointedTaskReportTime}}</span></p>
          <p @click="showPop2(missionDetail.source)">任务来源：<span>{{missionDetail.source}}</span></p>
          <p>牵头处室：<span>{{missionDetail.initiatorDepartmentName}}</span></p>
          <p>配合处室：<span>{{missionDetail.personLiableDepartmentName == null ? '暂未选择' : missionDetail.personLiableDepartmentName}}</span></p>
          <p>分管领导：<span>{{missionDetail.leadershipName}}</span></p>
          <p>牵头负责人：<span>{{missionDetail.leadingPerson}}</span></p>
          <p>办理人：<span>{{missionDetail.reporterName}}</span></p>
          <p>配合处室负责人：<span>{{missionDetail.responsiblePerson}}</span></p>
          <p>是否超期：<span>{{missionDetail.ifOverdue}}</span></p>
          <p>办理时间：<span>{{missionDetail.reportTime}}</span></p>
          <p>工作完成情况：<span>{{missionDetail.completionWork}}%</span></p>
        </div>
        <div class="cont" v-if="type == '配合任务审批' || type == '承办任务审批'">
          <p>督办截止时间：<span>{{missionDetail.appointedTaskReportTime}}</span></p>
          <p @click="showPop2(missionDetail.source)">任务来源：<span>{{missionDetail.source}}</span></p>
          <p>牵头处室：<span>{{missionDetail.initiatorDepartmentName}}</span></p>
          <p>配合处室：<span>{{missionDetail.personLiableDepartmentName == null ? '暂未选择' : missionDetail.personLiableDepartmentName}}</span></p>
          <p>分管领导：<span>{{missionDetail.leadershipName}}</span></p>
          <p>牵头负责人：<span>{{missionDetail.leadingPerson}}</span></p>
          <p>配合处室负责人：<span>{{missionDetail.responsiblePerson}}</span></p>
          <p>办理人：<span>{{missionDetail.reporterName}}</span></p>
          <p>是否超期：<span>{{missionDetail.ifOverdue}}</span></p>
          <p>办理时间：<span>{{missionDetail.reportTime}}</span></p>
          <p>工作完成情况：<span>{{missionDetail.completionWork}}%</span></p>
        </div>
      </div>
    </div>
    <div class="plateTwo-wrap">
      <div class="plateTwo-cont">
        <div class="onePlate" v-if="type=='督办任务审批'">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckdcdb.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('content')">查看督查督办任务<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="type!='督办任务审批'">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckdcdb.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('workable')">查看工作落实情况<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="type=='督办任务审批'">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbz.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('remarks')">查看备注<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckwjyj.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeFileBasis')">查看文件依据<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="type=='督办任务审批'">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckhbzq.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeCycle')">查看汇报周期<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="type!='督办任务审批'">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckhbzq.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeEnclosure')">查看汇报附件<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbllc.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('processingProcess')">查看办理流程<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckshxq.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeAuditDetails')">查看审核详情<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="type=='牵头任务审批'" >
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckhbqk.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('takeLeadReportList')">查看汇报情况<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="optionWrap">
          <p>审核意见<b>*</b></p>
          <textarea maxlength="500" rows="10" cols="50" v-model="form.auditOpinion"></textarea>
        </div>
      </div>
    </div>
    <div class="btnGroup">
      <div class="btnWrap">
        <van-button @click="approvalBtn('1')" type="default" size="large">审核不通过</van-button>
      </div>
      <div class="btnWrap">
        <van-button @click="approvalBtn('0')" type="primary" size="large">审核通过</van-button>
      </div>
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
import aes from '../../../utils/aes';
import { Popup,Toast } from 'vant';
export default {
  data() {
    return {
      id: '',
      activeNames1: [],
      activeNames2: ['1'],
      missionDetail: '',
      type: '',
      show: false,
      show2: false,
      showTitle: '',
      showText: '',
      form: {
        auditOpinion: '无意见',
        id: '',
        whetherThrough: '',
        isPass: ''
      },
    }
  },
  mounted() {
    var type = this.$route.query.type, id = this.$route.query.id;
    this.type = type;
    this.id = id;
    if(type == '牵头任务审批') {
     type = 'qthbsp'
    }else if(type == '督办任务审批') {
     type = 'dbrwsp'
    }else if(type == '承办任务审批' || type == '配合任务审批') {
     type = 'cbhbsp'
    }else {
      return false;
    }
    this.$api.approval.getPendingApprovalDetail(type,id)
    .then(res=>{
      this.missionDetail = res;
    })
  },
  methods: {
    showPop(where) {
      if(where == 'content') {
        this.showTitle = '督办内容';this.showText = this.missionDetail.supervisoryContent;
      }else if(where ==  'workable') {
        this.showTitle = '工作落实情况';this.showText = this.missionDetail.implementationWork;
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
      var _this = this;
      var type = this.$route.query.type;
      this.$router.push({ path: `/${where}`,query: { type: type,id: _this.id,item: _this.missionDetail } })
    },
    approvalBtn(whetherThrough) { //审批按钮执行操作
      this.form.isPass = this.form.whetherThrough = whetherThrough,
      this.form.id = this.$route.query.id;
      var info = aes.encrypt(JSON.stringify(this.form)),
        id = this.$route.query.id,
        type = '';
      let data = `"requestData": "${info}"`;
      if(this.type == '牵头任务审批') {
        type = 'qthbsp'
        delete this.form.isPass;
      }else if(this.type == '督办任务审批') {
        type = 'dbrwsp';
        delete this.form.whetherThrough;
      }else if(this.type == '承办任务审批' || '配合任务审批') {
        type = 'cbhbsp';
        delete this.form.isPass;
      }else {
        return false;
      }
      if(this.form.auditOpinion == '') {
        Toast('请输入审批意见！')
        return false;
      }
      //提交
      this.$api.approval.approvalBtnHandle(type,id,data)
      .then(res=>{
        if(res.code == '200') {
          Toast.success('审批成功');
          window.setTimeout(()=>{
            this.$router.back(-1)
          },500)
        }else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.pendingApprovalDetailWrap {
  padding: 80/@size 0/@size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  .van-button--large {
    height: 100%;
  }

  .plateOne-wrap {
    margin: 20/@size 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20/@size;
    .plateOne-cont {
      width: 100%;
      padding: 0 20/@size 10/@size 20/@size;
      box-sizing: border-box;
      background-color: #fff;
      min-height: 250/@size;
      .top {
        width: 100%;
        height: 100/@size;
        border-bottom: 1px solid #eee;
        .img-wrap {
          float: left;
          width: 80/@size;
          height: 100/@size;
          display: flex;
          align-items: center;
          img {
            width: 60/@size;
            height: 60/@size;
          }
        }
        .txt-wrap {
          float: left;
          max-width: 350/@size;
          height: 100/@size;
          p {
            overflow: hidden;
            height: 50/@size;
            line-height: 50/@size;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family:Source Han Sans CN;
          }
          p:nth-child(1) {
            line-height: 70/@size;
            font-size: 24/@size;
            font-weight: 600;
          }
          p:nth-child(2) {
            font-size: 18/@size;
            line-height: 40/@size;
            color: #59A3F0;
          }
        }
      }
      .cont {
        p {
          width: 100%;
          height: 40/@size;
          line-height: 40/@size;
          font-size: 18/@size;
          color: #A4A4A4;
          span {
            color: #323232;
          }
        }
      }
    }
  }

  .plateTwo-wrap {
    padding: 0 20/@size;
    .plateTwo-cont {
      background-color: #fff;
      padding: 0 20/@size;
      .onePlate {
        width: 100%;
        height: 60/@size;
        border-bottom: 1px solid #eee;
        .img-wrap {
          width: 50/@size;
          height: 60/@size;
          display: flex;
          align-items: center;
          float: left;
          img {
            width: 30/@size;
            height: 30/@size;
          }
        }
        .text-wrap {
          p {
            font-size: 20/@size;
            height: 60/@size;
            width: 100%;
            line-height: 60/@size;
            color: #323232;
          }
          i {
            position: relative;
            top: 23/@size;
            float: right;
          }
        }
      }
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
    box-sizing: border-box;
    padding: 20/@size 0; 
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
      border: 1px solid #eee;
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