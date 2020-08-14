<template>
  <div class="pendingApprovalDetailWrap">
    <div class="plateOne-wrap">
      <div class="plateOne-cont">
        <div class="top">
          <div class="img-wrap">
            <img src="../../../../static/img/mineMission/zp.png" alt="">
          </div>
          <div class="txt-wrap">
            <p @click="showPop2(missionDetail.taskName)">{{missionDetail.taskName}}</p>
            <p>等待审核</p>
          </div>
        </div>
        <div class="cont">
          <p>开始时间：<span>{{missionDetail.startTime}}</span></p>
          <p>截止时间：<span>{{missionDetail.endTime}}</span></p>
          <p>办理时间：<span>{{missionDetail.reportTime}}</span></p>
        </div>
      </div>
    </div>
    <div class="plateTwo-wrap">
      <div class="plateTwo-cont">
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckdcdb.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('content')">查看任务内容<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbz.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('remarks')">查看备注<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbllc.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('workable')">查看工作落实情况<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbz.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeFileBasis')">查看文件依据<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckhbqk.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeEnclosure')">查看汇报附件<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckshxq.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeAuditDetails')">查看审核详情<van-icon name="arrow" /></p>
          </div>
        </div>
      </div>
    </div>
    <div class="optionWrap">
      <p>审核意见<b>*</b></p>
      <div class="textWrap">
        <textarea maxlength="500" placeholder="请填写审核意见" v-model="form.auditOpinion"></textarea>
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
      },
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.id = id;
    this.$api.zprwApproval.getPendingApprovalDetail(id)
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
      var _this = this;
      var type = this.$route.query.type;
      this.$router.push({ path: `/${where}`,query: { type: type,id: _this.id,item: _this.missionDetail } })
    },
    approvalBtn(whetherThrough) { //审批按钮执行操作
      this.form.whetherThrough = whetherThrough,
      this.form.id = this.$route.query.id;
      var info = aes.encrypt(JSON.stringify(this.form)),
        id = this.$route.query.id,
        type = '';
      let data = `"requestData": "${info}"`;
      if(this.form.auditOpinion == '') {
        Toast('请输入审批意见！')
        return false;
      }
      //提交
      this.$api.zprwApproval.approvalBtnHandle(id,data)
      .then(res=>{
        if(res.code == '200') {
          Toast.success('审核成功');
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

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.pendingApprovalDetailWrap {
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
.pendingApprovalDetailWrap {
  padding: 80/@size 0;
  min-height: calc(~'100% - 2.14rem');
  background-color: #f7f7f7;

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
    padding: 20/@size;
    p {
      color: #323232;
      font-size: 22/@size;
      position: relative;
      height: 60/@size;
      line-height: 60/@size;
      background-color: #fff;
      box-sizing: border-box;
      padding-left: 20/@size;
      b {
        color: #ff0000;
        font-size: 15/@size;
        position: absolute;
        top: -5/@size;
      }
    }
    .textWrap {
      background-color: #fff;
      box-sizing: border-box;
      padding: 0/@size 20/@size 20/@size 20/@size;
      textarea {
        width: 100%;
        height: 120/@size;
        font-size: 20/@size;
        color: #000;
        box-sizing: border-box;
        padding: 5/@size;
        border-color: #eee;
      }
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
}
</style>