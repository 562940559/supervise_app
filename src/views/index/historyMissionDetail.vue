<template>
  <div class="fileMissionDetailWrap">
    <div class="plateOne-wrap">
      <div class="plateOne-cont">
        <div class="top">
          <div class="img-wrap">
            <img src="../../../static/img/mineMission/dbsp.png" alt="">
          </div>
          <div class="txt-wrap">
            <p v-if="this.needPara.taskType" @click="showPop2(dataList.supervisoryItems)">{{dataList.supervisoryItems}}</p>
            <p v-else @click="showPop2(dataList.taskName)">{{dataList.taskName}}</p>
            <p>{{missionStatus}}</p>
          </div>
        </div>
        <div class="cont" v-if="this.needPara.taskType">
          <p>督办任务截止时间：<span>{{dataList.endTime}}</span></p>
          <p>牵头负责人：<span>{{dataList.leadingPerson}}</span></p>
          <p>配合负责人：<span>{{dataList.responsiblePerson}}</span></p>
          <p>分管领导：<span>{{dataList.leadingName}}</span></p>
        </div>
        <div class="cont" v-else>
          <p>任务截止时间：<span>{{dataList.endTime}}</span></p>
          <p>办理人员：<span>{{dataList.transactorPerson}}</span></p>
        </div>
      </div>
    </div>
    <div class="plateTwo-wrap">
      <div class="plateTwo-cont">
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../static/img/mineMission/ckwjyj.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeFileBasis')">查看文件依据<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="this.needPara.taskType">
          <div class="img-wrap"><img src="../../../static/img/mineMission/ckbllc.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('processingProcess')">查看办理流程<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="this.needPara.taskType">
          <div class="img-wrap"><img src="../../../static/img/mineMission/ckshxq.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('fileMissionExamine')">查看审核详情<van-icon name="arrow" /></p>
          </div>
        </div>
      </div>
    </div>
    <!-- pop弹出层（备注，督办内容） -->
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
import aes from '../../utils/aes';
import { Toast,Dialog } from 'vant';
export default {
  data() {
    return {
      fileMissionId: '',
      fileMissionType: '',
      dataList: '',
      show: false,
      show2: false,
      showTitle: '',
      showText: '',
      needPara: {
        taskType: ''
      },
      missionStatus: ''
    }
  },
  methods: {
    getMissionDetail() {
      var id = this.fileMissionId;
      var info = aes.encrypt(JSON.stringify(this.needPara)),
      data = `"requestData": "${info}"`;
      this.$api.historyMission.getMissionDetail(id,data)
      .then(res=>{
        this.dataList = res;
      })
    },
    showPop(title,text) {
      this.showTitle = title;
      this.showText = text;
      this.show = true;
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
    goOther(where) {
      this.$router.push({path: `${where}`,query: {item: this.dataList,id: this.fileMissionId,type: '督办任务审批'}})
    },
  },
  mounted() {
    this.fileMissionId = this.$route.query.id;
    this.needPara.taskType = this.$route.query.type;
    this.missionStatus = this.$route.query.status;
    this.getMissionDetail();
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.fileMissionDetailWrap {
  padding-top: 80/@size;
  min-height: 100%;
  box-sizing: border-box;
  background-color: rgb(249,249,249);

  .fileBtn {
    margin-top: 30/@size;
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