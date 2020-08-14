<template>
  <div class="selectLibrary-wrap">
    
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="back()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span @click="showPop()" class="setting-btn">
        筛选 
        <van-icon name="filter-o" />
      </span>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
    >
      <div class="descriptionWrap"
        v-for="(file, index) in fileList"
        :key="index"
        @click="addFile(file)"
      >
        <span class="imgWrap">
          <img 
            src="../../assets/img/plate/createTask/default.png" alt="default"
          >
        </span>
        <span>
          <b>{{file.fileName}}</b>
          <b>{{file.createDate}}   来自：<font>{{file.creator}}</font></b>
        </span>
      </div>
    </van-list>

    <!-- 顶部弹出层 -->
    <van-popup v-model="show.top" position="top">
      <div class="condition">
        <p class="title">文件名称</p>
        <input type="text" v-model="mustParams.title" placeholder="请输入文件名称" class="fileNameInput">
      </div>
      <div class="condition">
        <p class="title">时间区间</p>
        <p class="timeSelect">
          <span @click="clickStartTime()">{{this.selectStartTime == '' ? '开始时间' : this.selectStartTime}}</span>
          —
          <span @click="clickEndTime()">{{this.selectEndTime == '' ? '截止时间' : this.selectEndTime}}</span>
        </p>
      </div>
      <div style="clear: both;"></div>
      <div class="btnGroup">
        <span @click="reset()">重置</span>
        <span @click="sureRange()">确定</span>
      </div>
    </van-popup>

    <!-- 时间选择器（开始时间） -->
    <van-popup v-model="show.showStartTime" position="bottom">
      <van-datetime-picker
        v-model="libraryStartTime"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="sureStartTime()"
        @cancel="cancelSelect()"
      />
    </van-popup>

    <!-- 时间选择器（截止时间） -->
    <van-popup v-model="show.showEndTime" position="bottom">
      <van-datetime-picker
        v-model="libraryEndTime"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="sureEndTime()"
        @cancel="cancelSelect()"
      />
    </van-popup>
    
  </div>
</template>

<script>
import { Popup, Toast } from 'vant';
import * as $api from '@/api';
import aes from '../../utils/aes.js';
export default {
  data() {
    return {
      show: {
        top: false,
        showStartTime: false,
        showEndTime: false,
      },
      minDate: new Date(2000, 0, 1), // 时间选择器最小值和最大值
      maxDate: new Date(),
      libraryStartTime: new Date(), 
      libraryEndTime: new Date(),
      selectStartTime: '',
      selectEndTime: '',
      mustParams: { // 传参
        current: 1,
        limit: 10,
        title: '',
        createDate: ''
      },
      fileList: [],
      loading: false,
      finished: false,
      offset: 100,
    }
  },
  methods: {
    back() {
      this.$router.back('-1')
    },
    showPop() {
      this.show.top = !this.show.top
    },
    clickStartTime() {
      this.show.showStartTime = !this.show.showStartTime;
    },
    clickEndTime() {
      this.show.showEndTime = !this.show.showEndTime;
    },
    sureStartTime() { // 确定开始时间
      this.selectStartTime = this.filterDate(this.libraryStartTime)
      this.show.showStartTime = !this.show.showStartTime;
    },
    sureEndTime() { // 确定结束时间
      this.selectEndTime = this.filterDate(this.libraryEndTime)
      this.show.showEndTime = !this.show.showEndTime;
    },
    cancelSelect() { // 取消选择时间
      this.show.showStartTime = false;
      this.show.showEndTime = false;
      this.libraryStartTime = new Date();
      this.libraryEndTime = new Date();
    },
    filterDate(selectDate) { //将时间重新转换
      var date = selectDate
      var seperator = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      selectDate = 
        date.getFullYear() +
        seperator +
        month +
        seperator +
        strDate
      return selectDate
    },
    reset() { // 重置选择
      this.mustParams.title = '';
      this.cancelSelect();
      this.selectStartTime = this.selectEndTime = '';
    },
    sureRange() { // 确认选择提交
      if(this.selectStartTime == '' && this.selectEndTime != '' || this.selectStartTime != '' && this.selectEndTime == '' ) {
        Toast('筛选时间不能只选一项')
        return false
      }
      if(this.selectStartTime == '' && this.selectEndTime == '') {
        this.mustParams.createDate = ''
      }else {
        this.mustParams.createDate = `${this.selectStartTime}~${this.selectEndTime}`;
      }
      this.mustParams.current = 1;
      this.fileList = [];
      this.getDocumentList();
    },
    getDocumentList() {
      let info = aes.encrypt(JSON.stringify(this.mustParams));
      let mustParams = `"requestData": "${info}"`;
      this.loading = true;
      this.finished = false;
      this.$api.mineMission.getDocumentList(mustParams)
      .then(res=>{
        console.log(res,this.mustParams)
        if (res.documents[0] == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.fileList = this.fileList.concat(res.documents);
        this.loading = false;
        this.mustParams.current ++;
      })
    },
    addFile(file) {
      let thisSelect = [{
        fileName : file.fileName,
        filePath : file.filePath
      }]
      let mustParams = {
        documents: thisSelect,
        message: this.$route.query.item
      }
      let info = aes.encrypt(JSON.stringify(mustParams));
      let data = `"requestData": "${info}"`;
      if(this.$route.query.targetType == 'person') {
        this.$api.chat.sendSelectLibrary(data)
        .then(res=>{
          if(res.code == '200') {
            Toast('添加成功！')
            this.$router.back('-1')
            return
          }
        })
      }else if(this.$route.query.targetType == 'group') {
        this.$api.chat.sendGroupSelectLibrary(data)
        .then(res=>{
          if(res.code == '200') {
            Toast('添加成功！')
            this.$router.back('-1')
            return
          }
        })
      }
      
    },
    onLoad() {
      this.getDocumentList();
    }
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style lang="less" type="text/less">
@import '../../assets/less/common.less';
.selectLibrary-wrap {
  .van-popup--top {
    position: fixed;
    top: 80/@size;
    .condition {
      width: 100%;
      height: 80/@size;
      box-sizing: border-box;
      padding: 0 20/@size;
      border-bottom: 1px solid #DCDCDC;
      background-color: #fff;
      .title {
        height: 80/@size;
        line-height: 80/@size;
        float: left;
        font-size: 20/@size;
        color: #333;
      }
      .fileNameInput {
        float: right;
        height: 78/@size;
        width: 250/@size;
        line-height: 78/@size;
        font-size: 20/@size;
        border: none;
        background-color: #fff;
        text-align: right;
      }
      .timeSelect {
        float: right;
        height: 80/@size;
        box-sizing: border-box;
        padding: 20/@size 0;
        span {
          display: inline-block;
          font-size: 20/@size;
          background-color: #EEEEEE;
          border-radius: 30/@size;
          box-sizing: border-box;
          padding: 0 30/@size;
          color: #C3C3C3;
          height: 40/@size;
          line-height: 40/@size;
        }
        span:nth-child(1) {
          margin-right: 5/@size;
        }
        span:nth-child(2) {
          margin-left: 5/@size;
        }
      }
      input::-webkit-input-placeholder{
        color:#ccc;
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#ccc;
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#ccc;
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#ccc;
      }
    }
    .btnGroup {
      width: 100%;
      height: 100/@size;
      box-sizing: border-box;
      padding: 20/@size;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
        height: 60/@size;
        line-height: 60/@size;
        font-size: 20/@size;
        text-align: center;
      }
      span:nth-child(1) {
        width: 180/@size;
        border: 1px solid rgb(191,191,191);
      }
      span:nth-child(2) {
        width: 280/@size;
        background-color: #4EC690;
        color: white;
        border: 1px solid #4EC690;
      }
    }
  }
}
</style>
<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.selectLibrary-wrap {
  padding-top: 80/@size;
  min-height: 100%;
  box-sizing: border-box;
  .top-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
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
      font-size: 22/@size;
      font-weight: 400;
      width: 150/@size;
      text-align: right;
      position: relative;
      top: 2/@size;
      i {
        top: 2/@size;
        font-size: 24/@size;
      }
      a {
        color: white;
      }
    }
  }
  .descriptionWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 0 40/@size;
    border-bottom: 1/@size solid #dcdcdc;
    span {
      display: inline-block;
      width: 400/@size;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 100/@size;
      font-size: 20/@size;
      box-sizing: border-box;
      padding: 10/@size 0;
      b {
        display: inline-block;
        width: 100%;
        height: 40/@size;
        line-height: 40/@size;
        font-size: 20/@size;
        font-weight: 400;
        box-sizing: border-box;
        padding: 0/@size 20/@size;
        font {
          color: #148DDA;
        }
      }
     
    }
    .imgWrap {
      width: 50/@size;
      margin-right: 10/@size;
      text-align: center;
      box-sizing: border-box;
      padding-top: 20/@size;
      line-height: 100/@size;
      img {
        width: 50/@size;
        height: 60/@size;
      }
    }
  }
}
</style>