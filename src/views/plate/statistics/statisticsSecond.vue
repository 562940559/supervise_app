<template>
  <div class="statisticsWrap">
    <div class="screenTimeWrap">
      <ul>
        <li>
          <input type="text" 
            v-model="info.startTime" 
            readonly 
            placeholder="开始时间"
            @click="selectTime('start')"
          >
        </li>
        <li>
          <input type="text" 
            v-model="info.endTime" 
            readonly
            placeholder="截止时间"
            @click="selectTime('end')"
          >
        </li>
      </ul>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
    >
      <div 
        class="missionWrap"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="content-F">
          <div class="left">
            <p
              :style="{color:(item.expire == true ? '#f00' : '#323232')}"
              ><span v-show="item.expire">（超期）</span>{{item.superviseHandleMatter}}</p>
            <p>开始截止时间：{{item.startTime}} / {{item.endTime}}</p>
          </div>
          <div class="right">
            <p @click="goDetail(item)">详情</p>
          </div>
        </div>
        <div class="content-S">
          <p>任务状态：<span>{{item.status}}</span></p>
          <p>汇报类型：{{item.recordType}}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    </van-list>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="timePickerCancel"
        @confirm="timePickerConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      show: false,
      type: '',
      info: {
        current: 1,
        departmentId: '',
        startTime: '',
        endTime: ''
      },
      currentDate: new Date(),
      minDate: new Date(1999,0,1),
      dataList: [],
      loading: false,
      finished: false,
      offset: 100,
      curTime: ''
    }
  },
  methods: {
    selectTime(type) {
      this.show = true;
      this.type = type;
    },
    query() { //调用查询数据接口
      this.info.departmentId = this.$route.query.id;
      this.loading = true;
      var info = aes.encrypt(JSON.stringify(this.info)),
      data = `"requestData": "${info}"`;
      this.$api.statistics.getStatisticsSecondList(data)
      .then(res=>{
        if (res.data[0] == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.dataList = this.dataList.concat(res.data);
        this.loading = false;
      })
    },
    onLoad() {
      this.query();
      this.info.current++;
    },
    goDetail(item) {
      if(item.recordType == '指派汇报任务') {
        this.$router.push({path: '/zprwStatisticsDetail',query: {id: item.id,recordType: item.recordType}})
        return
      }else {
        this.$router.push({path: '/statisticsDetail',query: {id: item.id,recordType: item.recordType}})
        return
      }
    },
    timePickerCancel() { //关闭pop
      this.show = false;
      this.currentDate = new Date();
    },
    timePickerConfirm() { //确定时间选择
      if(this.type == 'start') {
        this.info.startTime = this.filterDate(this.currentDate)
      }else if(this.type == 'end') {
        this.info.endTime = this.filterDate(this.currentDate)
      }
      this.info.current = 1;
      this.dataList = [];
      this.query();
      this.show = false;
    },
    filterDate(date) { //将时间重新转换
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var resetDate = 
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate;
      return resetDate;
    },
  },
  created() {
    
  },
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.statisticsWrap {
  padding-top: 80/@size;
  min-height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;
  .screenTimeWrap {
    width: 100%;
    height: 60/@size;
    background-color: #fff;
    box-shadow: 0 0 10/@size 0 rgba(0,0,0,.1);
    box-sizing: border-box;
    margin-bottom: 1/@size;
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        float: left;
        padding: 10/@size 20/@size;
        position: relative;
        input {
          width: 100%;
          font-size: 20/@size;
          color: #000;
          display: inline-block;
          border: none;
          height: 100%;
          text-align: center;
          position: relative;
        }
      }
      li:first-child::after {
        content: '';
        position: absolute;
        top: 15/@size;
        right: 0;
        width: 1/@size;
        height: 35/@size;
        background-color: #bfbfbf;
      }
    }
  }
  .missionWrap {
    width: 100%;
    height: 160/@size;
    .content-F {
      width: 100%;
      height: 110/@size;
      background-color: #fff;
      div { float: left; }
      .left {
        width: 80%;
        height: 100%;
        box-sizing: border-box;
        padding: 10/@size 20/@size;
        p:nth-child(1) {
          max-width: 100%;
          height: 50/@size;
          line-height: 50/@size;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 26/@size;
          color: rgb(0, 0, 0)
        }
        p:nth-child(2) {
          color: #9c9c9c;
          font-size: 18/@size;
          line-height: 40/@size;
          height: 40/@size;
        }
      }
      .right {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding-right: 20/@size;
        p {
          width: 100%;
          height: 50/@size;
          background-color: #6adac9;
          text-align: center;
          line-height: 50/@size;
          color: white;
          font-size: 20/@size;
          border-radius: 5px;
        }
      }
    }
    .content-S {
      width: 100%;
      height: 50/@size;
      background-color: #f6fafe;
      box-sizing: border-box;
      padding: 0 20/@size;
      p {
        float: left;
        width: 50%;
        height: 50/@size;
        line-height: 50/@size;
        color:rgb(0, 0, 0);
        font-size: 18/@size;
        span {
          color: #ffa776;
        }
      }
    }
  }
}

</style>