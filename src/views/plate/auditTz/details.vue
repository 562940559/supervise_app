<template>
  <div class="details-wrap">

    <!-- 台账信息板块 -->
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="台账信息" name="1">
        <div class="plateWrap">
          <span>计划名称</span>
          <span @click="showPop('计划名称',dataList.planName)">{{dataList.planName == '' ? '暂无' : dataList.planName}}</span>
        </div>
        <div class="plateWrap">
          <span>审计报告号</span>
          <span @click="showPop('审计报告号',dataList.auditReportNumber)">{{dataList.auditReportNumber == '' ? '暂无' : dataList.auditReportNumber}}</span>
        </div>
        <div class="plateWrap">
          <span>被审计单位</span>
          <span @click="showPop('被审计单位',dataList.auditedUnit)">{{dataList.auditedUnit == '' ? '暂无' : dataList.auditedUnit}}</span>
        </div>
        <div class="plateWrap">
          <span>计划来源类别</span>
          <span @click="showPop('计划来源类别',dataList.planSourceCategory)">{{dataList.planSourceCategory == '' ? '暂无' : dataList.planSourceCategory}}</span>
        </div>
        <div class="plateWrap">
          <span>计划年度</span>
          <span @click="showPop('计划年度',dataList.planYear)">{{dataList.planYear == '' ? '暂无' : dataList.planYear}}</span>
        </div>
        <div class="plateWrap">
          <span>开始时间</span>
          <span @click="showPop('开始时间',dataList.startTime)">{{dataList.startTime == '' ? '暂无' : dataList.startTime}}</span>
        </div>
        <div class="plateWrap">
          <span>组织实施单位</span>
          <span @click="showPop('组织实施单位',dataList.implementationUnit)">{{dataList.implementationUnit == '' ? '暂无' : dataList.implementationUnit}}</span>
        </div>
        <div class="plateWrap">
          <span>审计内容类型</span>
          <span @click="showPop('审计内容类型',dataList.auditContentType)">{{dataList.auditContentType == '' ? '暂无' : dataList.auditContentType}}</span>
        </div>
        <div class="plateWrap">
          <span>审计专业类别</span>
          <span @click="showPop('审计专业类别',dataList.auditProfessionalCategory)">{{dataList.auditProfessionalCategory == '' ? '暂无' : dataList.auditProfessionalCategory}}</span>
        </div>
        <div class="plateWrap">
          <span>审计或调查</span>
          <span @click="showPop('审计或调查',dataList.auditOrInvestigation)">{{dataList.auditOrInvestigation == '' ? '暂无' : dataList.auditOrInvestigation}}</span>
        </div>
        <div class="plateWrap">
          <span>结束时间</span>
          <span @click="showPop('结束时间',dataList.endTime)">{{dataList.endTime == '' ? '暂无' : dataList.endTime}}</span>
        </div>
        <div class="plateWrap">
          <span>审计通知书文号</span>
          <span @click="showPop('审计通知书文号',dataList.auditNoticeNumber)">{{dataList.auditNoticeNumber == '' ? '暂无' : dataList.auditNoticeNumber}}</span>
        </div>
        <div class="plateWrap">
          <span>审计通知书送达日期（印发日期）</span>
          <span @click="showPop('审计通知书送达日期（印发日期）',dataList.issuedDate)">{{dataList.issuedDate == '' ? '暂无' : dataList.issuedDate}}</span>
        </div>
        <div class="plateWrap">
          <span>审计组出具报告日期</span>
          <span @click="showPop('审计组出具报告日期',dataList.teamReportDate)">{{dataList.teamReportDate == '' ? '暂无' : dataList.teamReportDate}}</span>
        </div>
        <div class="plateWrap">
          <span>审计机关出具报告日期（印发日期）</span>
          <span @click="showPop('审计机关出具报告日期（印发日期）',dataList.auditorReportDate)">{{dataList.auditorReportDate == '' ? '暂无' : dataList.auditorReportDate}}</span>
        </div>
        <div class="plateWrap">
          <span>项目送审数</span>
          <span @click="showPop('项目送审数',dataList.itemsNumber)">{{dataList.itemsNumber == '' ? '暂无' : dataList.itemsNumber}}</span>
        </div>
      </van-collapse-item>

      <!-- 涉及金额板块 -->
      <van-collapse-item title="涉及金额" name="2">
        <div class="plateWrap">
          <span>项目投资额、其他、完成额</span>
          <span @click="showPop('项目投资额、其他、完成额',dataList.investmentAmount)">{{dataList.investmentAmount == '' ? '暂无' : dataList.investmentAmount}}</span>
        </div>
        <div class="plateWrap">
          <span>核减工程额</span>
          <span @click="showPop('核减工程额',dataList.reductionAmount)">{{dataList.reductionAmount == '' ? '暂无' : dataList.reductionAmount}}</span>
        </div>
        <div class="plateWrap">
          <span>审计查出问题金额</span>
          <span @click="showPop('审计查出问题金额',dataList.questionAmount)">{{dataList.questionAmount == '' ? '暂无' : dataList.questionAmount}}</span>
        </div>
        <div class="plateWrap">
          <span>审计后挽回（避免）损失</span>
          <span @click="showPop('审计后挽回（避免）损失',dataList.recoverAmount)">{{dataList.recoverAmount == '' ? '暂无' : dataList.recoverAmount}}</span>
        </div>
      </van-collapse-item>
    </van-collapse>

    <!-- pop弹出层 -->
    <van-popup v-model="popIsShow">
      <div class="popWrap">
        <p>{{popTitle}}</p>
        <p>{{popContent}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../../utils/aes';
import { Collapse, CollapseItem } from 'vant';
export default {
  data() {
    return {
      id: '',
      type: '',
      activeNames: '1',
      dataList: '',
      popIsShow: false,
      popTitle: '',
      popContent: '',
    }
  },
  methods: {
    getList() {
      var id = this.id;
      this.$api.auditTz.getDetails(id)
      .then(res=>{
        console.log(res)
        this.dataList = res.data;
      })
    },
    showPop(title,content) {
      this.popIsShow = true;
      this.popTitle = title;
      this.popContent = content;
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getList();
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.details-wrap {
  padding-top: 80/@size;
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
}
</style>