<template>
  <div class="auditTzFilterPage-wrap">
    <div class="plateWrap">
      <span>计划名称</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.planName"
        placeholder="请输入计划名称"
      >
    </div>
    <div class="plateWrap">
      <span>审计报告号</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.auditReportNumber"
        placeholder="请输入审计报告号"
      >
    </div>
    <div class="plateWrap">
      <span>被审计单位</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.auditedUnit"
        placeholder="请输入被审计单位"
      >
    </div>
    <div class="plateWrap">
      <span>计划来源类别</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.planSourceCategory"
        placeholder="请输入计划来源类别"
      >
    </div>
    <div class="plateWrap">
      <span>计划年度</span>
      <span @click="showTimePicker1=true">{{form.investmentAuditAccount.planYear == '' ? '请选择' : form.investmentAuditAccount.planYear+'年'}}<van-icon name="arrow" /></span>
    </div>
    <div class="plateWrap">
      <span>开始时间</span>
      <span @click="showTimePicker2=true">{{form.investmentAuditAccount.startTime == '' ? '请选择' : form.investmentAuditAccount.startTime}}<van-icon name="arrow" /></span>
    </div>
    <div class="plateWrap">
      <span>结束时间</span>
      <span @click="showTimePicker3=true">{{form.investmentAuditAccount.endTime == '' ? '请选择' : form.investmentAuditAccount.endTime}}<van-icon name="arrow" /></span>
    </div>
    <div class="plateWrap">
      <span>组织实施单位</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.implementationUnit"
        placeholder="请输入组织实施单位"
      >
    </div>
    <div class="plateWrap">
      <span>审计内容类型</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.auditContentType"
        placeholder="请输入审计内容类型"
      >
    </div>
    <div class="plateWrap">
      <span>审计专业类别</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.auditProfessionalCategory"
        placeholder="请输入审计专业类别"
      >
    </div>
    <div class="plateWrap">
      <span>审计或调查</span>
      <input type="text" maxlength='100'
        v-model="form.investmentAuditAccount.auditOrInvestigation"
        placeholder="请输入审计或调查"
      >
    </div>
    <div class="btnGroup">
      <div class="btnWrap">
        <van-button type="default" @click="replay()" size="large">重置</van-button>
      </div>
      <div class="btnWrap">
        <van-button type="primary" @click="sureForm()" size="large">确认</van-button>
      </div>
      <div style="clear: both;"></div>
    </div>
    <!-- 时间选择器（年份） -->
    <van-popup 
      v-model="showTimePicker1"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :formatter="formatter1"
        @confirm="confirmTime1"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 时间选择器（开始时间） -->
    <van-popup 
      v-model="showTimePicker2"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate2"
        type="date"
        :min-date="minDate"
        :formatter="formatter"
        @confirm="confirmTime2"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 时间选择器（结束时间） -->
    <van-popup 
      v-model="showTimePicker3"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate3"
        type="date"
        :min-date="minDate"
        :formatter="formatter"
        @confirm="confirmTime3"
        @cancel="onCancel"
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
      showTimePicker1: false,
      showTimePicker2: false,
      showTimePicker3: false,
      currentDate: new Date(),
      currentDate2: new Date(),
      currentDate3: new Date(),
      minDate: new Date(2000,0,1),
      form: {
        current: 1, //页码
        limit: 10, //每页条数
        investmentAuditAccount: { //	筛选参数封装对象	
          planName: '', //计划名称
          auditReportNumber: '', //审计报告号
          auditedUnit: '', //被审计单位
          planSourceCategory: '', //计划来源类别
          planYear: '', //	计划年度
          startTime: '', //	开始时间
          implementationUnit: '', //组织实施单位
          auditContentType: '', //审计内容类型
          auditProfessionalCategory: '', //审计专业类别
          auditOrInvestigation: '', //审计或调查
          endTime: '', //结束时间
        },
      }
    }
  },
  methods: {
    onCancel() {
      this.showTimePicker1 = this.showTimePicker2 = this.showTimePicker3 = false;
    },
    onConfirm(value,index) {
      this.show = false;
    },
    formatter1(type, value) {
      if (type === 'year') {
        return `${value}`;
      } else if (type === 'month') {
        return '年'
      }
      return value;
    },
    formatter(type, value) {
      return value
    },
    confirmTime1(value) {
      var values = value.toString();
      this.form.investmentAuditAccount.planYear = values.slice(11,15);
      this.showTimePicker1 = false;
    },
    confirmTime2(value) {
      this.form.investmentAuditAccount.startTime = this.filterDate(value);
      this.showTimePicker2 = false;
    },
    confirmTime3(value) {
      this.form.investmentAuditAccount.endTime = this.filterDate(value);
      this.showTimePicker3 = false;
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
      return date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate
    },
    replay() { //重置
      for(const a in this.form.investmentAuditAccount) {
        this.form.investmentAuditAccount[a] = ''
      }
    },
    sureForm() {
      this.$router.replace({ path: '/auditTzIndex',query: { newData: this.form } })
    }
  },
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
//修改vant样式
.auditTzFilterPage-wrap {
  .van-button {
    height: 100%;
  }
  .calendar {
    font-size: 50/@size;
    height: 80/@size;
    line-height: 80/@size;
  }
  .van-picker__cancel, .van-picker__confirm {
    color: #20b759;
  }
}
</style>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.auditTzFilterPage-wrap {
  padding-top: 80/@size;
  padding-bottom: 80/@size;
  .plateWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 10/@size;
    border-bottom: 10/@size solid #f7f7f7; 
    span {
      display: inline-block;
      height: 80/@size;
      line-height: 80/@size;
      font-size: 20/@size;
      position: relative;
      b {
        color: #ff0000;
        font-size: 15/@size;
        position: absolute;
        top: -8/@size;
        right: -12/@size;
      }
      i {
        position: relative;
        top: 3/@size;
      }
    }
  }
  input {
    width: 400/@size;
    height: 80/@size;
    line-height: 80/@size;
    font-weight: 400;
    font-size: 20/@size;
    border: none;
    float: right;
    text-align: right;
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
  }
  .btnGroup {
    width: 100%;
    height: 80/@size;
    position: fixed;
    bottom: 0/@size;
    .btnWrap {
      float: left;
      height: 80/@size;
      width: 50%;
    }
  }
}
</style>