<template>
  <div class="completedDetailWrap">
    <div class="plateOne-wrap">
      <div class="plateOne-cont">
        <div class="top">
          <div class="img-wrap">
            <img src="../../../../static/img/mineMission/dbsp.png" alt="">
          </div>
          <div class="txt-wrap">
            <p @click="showPop2(detailInfo.superviseHandleMatter)">{{detailInfo.superviseHandleMatter}}</p>
          </div>
        </div>
        <div class="cont">
          <p>开始截止时间：<span>{{detailInfo.startTime}}-{{detailInfo.endTime}}</span></p>
          <p @click="showPop2(detailInfo.source)">来源于：<span>{{detailInfo.source}}</span></p>
          <p>牵头处室：<span>{{detailInfo.initiatorDepartmentName}}</span></p>
          <p>责任处室：<span>{{detailInfo.personLiableDepartmentName}}</span></p>
          <p>分管领导：<span>{{detailInfo.leadershipName}}</span></p>
          <p>汇报人：<span>{{detailInfo.reporterName}}</span></p>
        </div>
      </div>
    </div>
    <div class="plateTwo-wrap">
      <div class="plateTwo-cont">
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckdcdb.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('content')">查看督办内容<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbllc.png" alt=""></div>
          <div class="text-wrap">
            <p @click="routerPush('processingProcess')">查看办理流程<van-icon name="arrow" /></p>
          </div>
        </div>
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
import { Popup } from 'vant';
export default {
  data() {
    return {
      detailInfo: {},
      show: false,
      show2: false,
      showTitle: '',
      showText: '',
    }
  },
  mounted() {
    let id = this.$route.query.id,
      type = {
        recordType : this.$route.query.recordType
      };
    var info = aes.encrypt(JSON.stringify(type)),
    data = `"requestData": "${info}"`;
    this.$api.statistics.getStatisticsDetail(id,data)
    .then(res=>{
      this.detailInfo = res;
    })
  },
  methods: {
    showPop(where) {
      this.showTitle = '督办内容';
      this.showText = this.detailInfo.superviseHandleContent
      this.show = true;
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
    routerPush(where) {
      var id = this.$route.query.id,
        item = this.detailInfo,
        type = this.$route.query.recordType;
      this.$router.push({
        path: `/${where}`,
        query: {
          id: id,
          item: item,
          type: type
        }
      })
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.completedDetailWrap {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding-top: 80/@size;
  
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
            height: 100/@size;
            line-height: 100/@size;
            font-size: 24/@size;
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family:Source Han Sans CN;
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
      .onePlate:last-child{
        border-bottom: none;
      }
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

}
</style>