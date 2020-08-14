<template>
  <div class="takeLeadWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span @click="refresh()" class="setting-btn">  
        <van-icon name="replay"></van-icon>
      </span>
    </div>
    <van-tabs @click="onclick" v-model="active">
      <van-tab title="待我汇报">
        <div class="containerWrap">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="offset"
          >
          <div 
            class="contentWrap"
            v-for="(item,index) in inReport"
            :key="index"
          >
            <div class="titleWrap">
              <p>任务名称：{{item.taskName}}</p>
              <span 
                @click="goOther('/zprwReport',item.id,'report')" 
                v-if="item.performOperations == '汇报'">
                <b class="report">汇报</b>
              </span>
              <span
                @click="goOther('/zprwReport',item.id,'modify')"
                v-else
              ><b class="modify">修改</b></span>
            </div>
            <div @click="goOther('/zprwReportDetail',item.id,'detail')" class="content">
              <p><span>汇报截止时间：</span><b>{{item.endTime}}</b></p>
              <p><span>状态：</span><b>{{item.status}}</b></p>
            </div>
          </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="我已汇报">
        <div class="containerWrap">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="offset"
          >
          <div 
            class="contentWrap"
            v-for="(item,index) in reported"
            :key="index"
          >
            <div class="titleWrap">
              <p>任务名称：{{item.taskName}}</p>
              <span
                v-if="item.status == '待审核'"
                @click="reportBack(item.id,index)"
              >
                <b class="back">撤回</b>
              </span>
            </div>
            <div @click="goOther('/zprwReportDetail',item.id,'detail')" class="content">
              <p><span>汇报截止时间：</span><b>{{item.endTime}}</b></p>
              <p><span>状态：</span><b>{{item.status}}</b></p>
            </div>
          </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog,Toast } from 'vant';
import * as $api from '@/api';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      active: '0',
      inReport: [],
      reported: [],
      loading: false,
      finished: false,
      offset: 100,
      info: {
        current: 1
      }
    }
  },
  methods: {
    routerBack() {
      this.$router.replace('/');
    },
    goOther(where,id,pageType) {
      this.$router.push({path: `${where}`,query: {id: id,pageType: pageType}})
    },
    refresh() {
      this.$router.replace('/refreshPage')
    },
    reportBack(id,index) {
      this.$api.zprwReport.reportBack(id)
      .then(res=>{
        if(res.code == '200') {
          this.reported.splice(index,1)
          Toast('撤回成功')
        }else {
          return false
        }
      })
    },
    getInReport() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.info)),
      data = `"requestData": "${info}"`;
      this.$api.zprwReport.getInReport(data)
      .then(res=>{
        if (res.data[0] == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.info.current++;
        this.inReport = this.inReport.concat(res.data);
        this.loading = false;
      })
    },
    getReported() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.info)),
      data = `"requestData": "${info}"`;
      this.$api.zprwReport.getReported(data)
      .then(res=>{
        if (res.data[0] == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.info.current++;
        this.reported = this.reported.concat(res.data);
        this.loading = false;
      })
    },
    onclick(name,title) {
      this.info.current = 1;
      this.reported = [];this.inReport = [];
      this.onLoad()
    },
    onLoad() {
      if(this.active == '0') {
        this.getInReport()
      }else if(this.active == '1'){
        this.getReported()
      }
    }
  },
  mounted() { //获取列表信息
    this.getInReport();
  }
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.takeLeadWrap {
  // vant的tab样式修改
  .van-tabs,.van-tabs--line {
    z-index: 999!important;
    position: relative;
    top: 75/@size;
  }
  .van-tabs__nav--line {
    background-color: #02ac61;
  }
  .van-tab, .van-tag--large {
    font-size: 22/@size;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 80/@size;
  }
  .van-tab {
    line-height: 80/@size;
    color: #82d88f;
  }
  .van-tab--active {
    color: white;
  }
  .van-tabs__line {
    background-color: white;
    bottom: 16px;
    height: 2px;
  }
  .van-tabs__content {
    position: relative;
    top: 80/@size;
  }
  // vant的swiper-cell样式修改
  .van-cell,.van-panel__header {
    padding: 20/@size 10/@size;
  }
  .van-cell__title,.van-panel__header-value {
    font-size: 20/@size;
  }
  .van-panel__header-value>span {
    padding: 0 10/@size;
    border-radius: 10/@size;
  }
  .van-panel,.van-cell-group,.van-cell { background: none; }
  .van-swipe-cell__right>.van-button {
    width: 80px;
    height: 100/@size;
    font-size: 20/@size;
  }
  .van-cell__label { font-size: 16/@size; }
  .success .van-panel__header-value>span {
    color: #02ac61;
    background-color: #dcf7e4;
  }
  .unSuccess .van-panel__header-value>span {
    color: #ff0000;
    background-color: #f8c3c3;
  }
}
</style>
<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.takeLeadWrap {
  height: 100%;
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    width: 100%;
    height: 80/@size;
    background-color: #02ac61;
    color: white;
    font-size: 18/@size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20/@size;
    z-index: 99999;
    .return-btn {
      font-size: 28/@size;
      width: 150/@size;
      i {
        position: relative;
        top: 5/@size;
      }
      .text {
        position: relative;
        left: -10/@size;
      }
    }
    .route-title {
      font-size: 32/@size;
      text-align: center;
    }
    .setting-btn {
      font-size: 34/@size;
      width: 150/@size;
      text-align: right;
      position: relative;
      top: 5/@size;
      a {
        color: white;
      }
    }
  }
  .containerWrap {
    position: relative;
    top: -80/@size;
    background: white;
    .contentWrap {
      width: 100%;
      height: 150/@size;
      border-bottom: 10/@size solid #f7f7f7;
      .titleWrap {
        width: 100%;
        height: 70/@size;
        box-sizing: border-box;
        padding:0 20/@size;
        border-bottom: 1px solid #e5e5e5;
        p, span {
          float: left;
        }
        p {
          width: 85%;
          height: 70/@size;
          line-height: 70/@size;
          color: #000;
          font-size: 22/@size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          display: flex;
          width: 15%;
          height: 70/@size;
          justify-content: center;
          align-items: center;
          b {
            padding: 5/@size 15/@size;
            font-weight: 400;
            font-size: 20/@size;
            border-radius: 15/@size;
          }
          .modify {
            background-color: #b5e4f9;
            color: #0078FF;
          }
          .report {
            color: #25dcdb;
            background-color: #ccfcfb;
          }
          .back {
            color: #ff8400;
            background-color: #ffd7c5;
          }
        }
      }
      .content {
        width: 100%;
        height: 80/@size;
        box-sizing: border-box;
        padding: 0 20/@size;
        p {
          height: 40/@size;
          line-height: 40/@size;
          font-size: 20/@size;
          color: #000;
          span,b {float: left;}
          span {
            display: inline-block;
            width: 150/@size;
            text-align: right;
          }
          b { font-weight: 400; }
        }
        p:first-child b {
          color: #ff1516;
        }
      }
    }
  }
}
</style>