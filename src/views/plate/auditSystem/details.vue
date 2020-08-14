<template>
  <div class="details-wrap">
    <div class="topStatus-wrap">
      <!-- 审核准备阶段 -->
      <div class="auditReady">
        <p class="left">审核准备阶段</p>
        <p class="right">
          <span>项目报送<b> > </b></span>
          <span v-if="status >= 2">项目审核<b> > </b></span>
          <span v-if="status >= 6">确认审计方式<b> > </b></span>
        </p>
        <p style="clear: both;"></p>
      </div>
      <!-- 审核实施阶段 -->
      <div v-if="stage == '2' || stage == '3'" class="auditImplement">
        <p class="left">审计实施阶段</p>
        <p v-if="type == '备案审计'" class="right">
          <span v-if="status >= 7">确认中介机构<b> > </b></span>
          <span v-if="status >= 8">审计组织通知书<b> > </b></span>
        </p>
        <p v-if="type == '直接审计'" class="right">
          <span v-if="status >= 6">任务通知书下发<b> > </b></span>
          <span v-if="status >= 15">资料审核<b> > </b></span>
          <span v-if="status >= 23">审计通知书下发<b> > </b></span>
          <span v-if="status >= 25">上传工程量<b> > </b></span>
          <span v-if="status >= 26">现场查看<b> > </b></span>
          <span v-if="status >= 27">核对工程量<b> > </b></span>
          <span v-if="status >= 28">争议问题<b> > </b></span>
          <span v-if="status >= 29">三级复核<b> > </b></span>
          <span v-if="status >= 30">审计初稿<b> > </b></span>
          <span v-if="status >= 32">质量复核<b> > </b></span>
          <span v-if="status >= 35">审计结果定案<b> > </b></span>
          <span v-if="status >= 36">审计结果盖章<b> > </b></span>
        </p>
        <p style="clear: both;"></p>
      </div>
      <!-- 审核结果阶段 -->
      <div v-if="stage == '3'" class="auditResult">
        <p class="left">审计结果阶段</p>
        <p v-if="type == '备案审计'" class="right">
          <span v-if="status >= 9">上传审计报告<b> > </b></span>
          <span v-if="status >= 12">备案文书反馈<b> > </b></span>
          <span v-if="status >= 45">项目归档<b> > </b></span>
        </p>
        <p v-if="type == '直接审计'" class="right">
          <span v-if="status >= 37">上传审核报告<b> > </b></span>
          <span v-if="status >= 48">审计报告代拟稿<b> > </b></span>
          <span v-if="status >= 41">出具征求意见书<b> > </b></span>
          <span v-if="status >= 43">编制审计报告<b> > </b></span>
          <span v-if="status >= 45">项目归档<b> > </b></span>
        </p>
        <p style="clear: both;"></p>
      </div>
    </div>

    <!-- 项目报送板块 -->
    <van-collapse v-model="activeNames1" accordion>
      <van-collapse-item title="项目报送" name="1">
        <div class="plateWrap">
          <span>项目名称</span>
          <span @click="showPop('项目名称',dataList.projectName)">{{dataList.projectName == '' ? '暂无' : dataList.projectName}}</span>
        </div>
        <div class="plateWrap">
          <span>项目业主</span>
          <span>{{dataList.projectOwners == '' ? '暂无' : dataList.projectOwners}}</span>
        </div>
        <div class="plateWrap">
          <span>项目类型</span>
          <span>{{dataList.projectType == '' ? '暂无' : dataList.projectType}}</span>
        </div>
        <div class="plateWrap">
          <span>立项金额（单位：元）</span>
          <span>{{dataList.projectAmount == '' ? '暂无' : dataList.projectAmount}}</span>
        </div>
        <div class="plateWrap">
          <span>招标控制价（单位：元）</span>
          <span>{{dataList.tenderControlPrice == '' ? '暂无' : dataList.tenderControlPrice}}</span>
        </div>
        <div class="plateWrap">
          <span>合同金额（单位：元）</span>
          <span>{{dataList.contractAmount == '' ? '暂无' : dataList.contractAmount}}</span>
        </div>
        <div class="plateWrap">
          <span>实际开工时间</span>
          <span>{{dataList.actualStartTime == '' ? '暂无' : dataList.actualStartTime}}</span>
        </div>
        <div class="plateWrap">
          <span>实际竣工时间</span>
          <span>{{dataList.actualCompletionTime == '' ? '暂无' : dataList.actualCompletionTime}}</span>
        </div>
        <div class="plateWrap">
          <span>建安工程费（单位：元）</span>
          <span>{{dataList.constructionCost == '' ? '暂无' : dataList.constructionCost}}</span>
        </div>
        <div class="plateWrap">
          <span>立项依据</span>
          <span>{{dataList.projectBasis == '' ? '暂无' : dataList.projectBasis}}</span>
        </div>
        <div class="plateWrap">
          <span>中标金额（单位：元）</span>
          <span>{{dataList.bidPrice == '' ? '暂无' : dataList.bidPrice}}</span>
        </div>
        <div class="plateWrap">
          <span>送审金额（单位：元）</span>
          <span>{{dataList.reviewTheAmount == '' ? '暂无' : dataList.reviewTheAmount}}</span>
        </div>
        <div class="plateWrap">
          <span>是否在年度计划内</span>
          <span>{{dataList.isAnnualPlan == '' ? '暂无' : dataList.isAnnualPlan}}</span>
        </div>
        <div class="plateWrap">
          <span>招标方式</span>
          <span>{{dataList.biddingMethod == '' ? '暂无' : dataList.biddingMethod}}</span>
        </div>
        <div class="plateWrap">
          <span>招标组织</span>
          <span>{{dataList.tenderOrganization == '' ? '暂无' : dataList.tenderOrganization}}</span>
        </div>
        <div class="plateWrap">
          <span>立项依据</span>
          <span v-if="dataList.projectBasisFile == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.projectBasisFile)"><van-icon name="arrow" /></span>
        </div>
        <div class="plateWrap">
          <span>送审结算书</span>
          <span v-if="dataList.submissionOfSettlement == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.submissionOfSettlement)"><van-icon name="arrow" /></span>
        </div>
        <div class="plateWrap">
          <span>中标通知书</span>
          <span v-if="dataList.letterOfAcceptance == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.letterOfAcceptance)"><van-icon name="arrow" /></span>
        </div>
        <div class="plateWrap">
          <span>施工合同</span>
          <span v-if="dataList.invitationForBids == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.invitationForBids)"><van-icon name="arrow" /></span>
        </div>
        <div class="plateWrap">
          <span>其他附件</span>
          <span v-if="dataList.otherAttachments == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.otherAttachments)"><van-icon name="arrow" /></span>
        </div>
        <div class="plateWrap">
          <span>备注</span>
          <span @click="showPop('备注',dataList.remark)">{{dataList.remark == '' ? '暂无' : dataList.remark}}</span>
        </div>
      </van-collapse-item>

      <!-- 确认审计方式板块 -->
      <van-collapse-item v-if="status >= 6" title="确认审计方式" name="2">
        <!-- 暂未选择 -->
        <div v-if="type == '暂未选择'">
          <div class="plateWrap">
            <span>暂未选择</span>
          </div>
        </div>
        <!-- 直接审计方式 -->
        <div v-if="type == '直接审计'">
          <div class="plateWrap">
            <span>审计方式</span>
            <span>{{dataList.auditApproach == '' ? '暂无' : dataList.auditApproach}}</span>
          </div>
          <div class="plateWrap">
            <span>中介机构</span>
            <span>{{dataList2.intermediaryOrgan == '' ? '暂无' : dataList2.intermediaryOrgan}}</span>
          </div>
          <div class="plateWrap">
            <span>副审中介机构</span>
            <span>{{dataList2.deputyIntermediarys == '' ? '暂无' : dataList2.deputyIntermediarys}}</span>
          </div>
          <div class="plateWrap">
            <span>审计组长</span>
            <span>{{dataList2.chiefAuditor == '' ? '暂无' : dataList2.chiefAuditor}}</span>
          </div>
        </div>
        <!-- 备案审计方式 -->
        <div v-if="type == '备案审计'">
          <div class="plateWrap">
            <span>审计方式</span>
            <span>{{dataList.auditApproach == '' ? '暂无' : dataList.auditApproach}}</span>
          </div>
        </div>
      </van-collapse-item>

      <!-- 项目审核板块 -->
      <van-collapse-item v-if="status >= 2" title="项目审核" name="3">
        <div class="plateWrap">
          <span>初审审核详情</span>
          <span v-if="dataList2.firstTrial == ''">暂无</span>
          <span v-else @click="goDataGather(dataList2.firstTrial)"><van-icon name="arrow" /></span>
        </div>
        <div v-if="status >= 3" class="plateWrap">
          <span>复核审核详情</span>
          <span v-if="dataList2.review == ''">暂无</span>
          <span v-else @click="goDataGather(dataList2.review)"><van-icon name="arrow" /></span>
        </div>
      </van-collapse-item>

      <!-- 备案审计板块 -->
      <div v-if="stage>=2&&type=='备案审计'">
        <van-collapse-item title="确认中介机构" name="4">
          <div class="plateWrap">
            <span>中介机构</span>
            <span>{{dataList2.intermediaryOrgan == '' ? '暂无' : dataList2.intermediaryOrgan}}</span>
          </div>
          <div class="plateWrap">
            <span>副审中介机构</span>
            <span>{{dataList2.deputyIntermediarys == '' ? '暂无' : dataList2.deputyIntermediarys}}</span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="审计组织通知书" name="5">
          <div class="plateWrap">
            <span>组织方式通知书关联附件</span>
            <span v-if="dataList.notificationOfOrganization == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.notificationOfOrganization)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="上传审计报告" name="6">
          <div class="plateWrap">
            <span>审减金额</span>
            <span>{{dataList.reportTheAmountReduction == '' ? '暂无' : dataList.reportTheAmountReduction}}</span>
          </div>
          <div class="plateWrap">
            <span>审增金额</span>
            <span>{{dataList.reportForAdditionalAmount == '' ? '暂无' : dataList.reportForAdditionalAmount}}</span>
          </div>
          <div class="plateWrap">
            <span>净审金额</span>
            <span>{{dataList.reportTheNetAuditAmount == '' ? '暂无' : dataList.reportTheNetAuditAmount}}</span>
          </div>
          <div class="plateWrap">
            <span>审减率</span>
            <span>{{dataList.reportReductionRate == '暂无' ? dataList.reportReductionRate : dataList.reportReductionRate+'%'}}</span>
          </div>
          <div class="plateWrap">
            <span>审计费</span>
            <span>{{dataList.reportAuditFee == '' ? '暂无' : dataList.reportAuditFee}}</span>
          </div>
          <div class="plateWrap">
            <span>实际审减率</span>
            <span>{{dataList.actualReductionRate == '暂无' ? dataList.actualReductionRate : dataList.actualReductionRate+'%'}}</span>
          </div>
          <div class="plateWrap">
            <span>审计开始时间</span>
            <span>{{dataList.auditStartTime == '' ? '暂无' : dataList.auditStartTime}}</span>
          </div>
          <div class="plateWrap">
            <span>审计结束时间</span>
            <span>{{dataList.auditEndTime == '' ? '暂无' : dataList.auditEndTime}}</span>
          </div>
          <div class="plateWrap">
            <span>审减原因</span>
            <span>{{dataList.reportShenjianReason == '' ? '暂无' : dataList.reportShenjianReason}}</span>
          </div>
          <div class="plateWrap">
            <span>备注</span>
            <span>{{dataList.note == '' ? '暂无' : dataList.note}}</span>
          </div>
          <div class="plateWrap">
            <span>审计报告</span>
            <span v-if="dataList.auditReport == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.auditReport)"><van-icon name="arrow" /></span>
          </div>
          <div class="plateWrap">
            <span>GCF文件</span>
            <span v-if="dataList.gcfFile == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.gcfFile)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
      </div>

      <!-- 备案审计板块 -->
      <div v-if="stage>=2&&type=='直接审计'">
        <van-collapse-item title="任务通知书下发" name="4">
          <div class="plateWrap">
            <span>任务通知书</span>
            <span v-if="dataList.auditAssignmentNotification == ''">暂无</span>
          <span v-else @click="goFileDownload(dataList2.auditAssignmentNotification)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="资料审核" name="5">
          <div class="plateWrap">
            <span>资料交接清单</span>
            <span v-if="dataList.billOfExchange == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.billOfExchange)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="审计通知书下发" name="6">
          <div class="plateWrap">
            <span>审计通知书关联附件</span>
            <span v-if="dataList.auditNotificationAttachments == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.auditNotificationAttachments)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="上传工程量" name="7">
          <div class="plateWrap">
            <span>工程量</span>
            <span v-if="dataList.quantityFile == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.quantityFile)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="现场查看" name="8">
          <div class="plateWrap">
            <span>现场图片</span>
            <span v-if="dataList.quantityFile == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.quantityFile)"><van-icon name="arrow" /></span>
          </div>
          <div class="plateWrap">
            <span>工程量拟对稿</span>
            <span v-if="dataList.quantityToDraft == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.quantityToDraft)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="核对工程量" name="9">
          <div class="plateWrap">
            <span>核对工程量时间</span>
            <span>{{dataList.checkUpTime == '' ? '暂无' : dataList.checkUpTime}}</span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="争议问题" name="10">
          <div class="plateWrap">
            <span>争议问题协调处理PDF文件</span>
            <span v-if="dataList.controversialFile == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.controversialFile)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="三级复核" name="11">
          <div class="plateWrap">
            <span>三级复核表格</span>
            <span v-if="dataList.tertiaryReviewForm == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.tertiaryReviewForm)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="审计初稿" name="12">
          <div class="plateWrap">
            <span>审计初稿</span>
            <span v-if="dataList.auditFirstDraft == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.auditFirstDraft)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="质量复核" name="13">
          <div class="plateWrap">
            <span>审计初稿问题反馈详情</span>
            <span v-if="dataList2.auditQuestionsFeedbacks == ''">暂无</span>
            <span v-else @click="goDataGather(dataList2.auditQuestionsFeedbacks)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="审计结果定案" name="14">
          <div class="plateWrap">
            <span>审定金额(单位：元)</span>
            <span>{{dataList.authorizedAmount == '' ? '暂无' : dataList.authorizedAmount}}</span>
          </div>
          <div class="plateWrap">
            <span>审减金额(单位：元)</span>
            <span>{{dataList.shenjianAmount == '' ? '暂无' : dataList.shenjianAmount}}</span>
          </div>
          <div class="plateWrap">
            <span>审减率</span>
            <span>{{dataList.shenjianRate == '暂无' ? dataList.shenjianRate : dataList.shenjianRate+'%'}}</span>
          </div>
          <div class="plateWrap">
            <span>审减主要内容及理由</span>
            <span>{{dataList.shenjianMainContent == '' ? '暂无' : dataList.shenjianMainContent}}</span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="审计结果盖章" name="15">
          <div class="plateWrap">
            <span>审计结果盖章送出时间</span>
            <span>{{dataList.stampDeliveryTime == '' ? '暂无' : dataList.stampDeliveryTime}}</span>
          </div>
          <div class="plateWrap">
            <span>审计结果盖章送回时间</span>
            <span>{{dataList.sealReturnTime == '' ? '暂无' : dataList.sealReturnTime}}</span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="上传审核报告" name="16">
          <div class="plateWrap">
            <span>审核报告</span>
            <span v-if="dataList.auditReportl == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.auditReportl)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="审计报告代拟稿" name="17">
          <div class="plateWrap">
            <span>审计报告代拟稿</span>
            <span v-if="dataList.auditDraft == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.auditDraft)"><van-icon name="arrow" /></span>
          </div>
          <div class="plateWrap">
            <span>审计结果发现问题</span>
            <span>{{dataList.auditResultsIssue == '' ? '暂无' : dataList.auditResultsIssue}}</span>
          </div>
          <div class="plateWrap">
            <span>审计结果发现问题附件</span>
            <span v-if="dataList.auditResultsIssueFile == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.auditResultsIssueFile)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="出具征求意见书" name="18">
          <div class="plateWrap">
            <span>征求意见书关联附件</span>
            <span v-if="dataList.requestCommentAttachments == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.requestCommentAttachments)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="编制审计报告" name="19">
          <div class="plateWrap">
            <span>审计报告关联附件</span>
            <span v-if="dataList.auditReportAttachments == ''">暂无</span>
            <span v-else @click="goFileDownload(dataList2.auditReportAttachments)"><van-icon name="arrow" /></span>
          </div>
        </van-collapse-item>
      </div>

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
export default {
  data() {
    return {
      id: '',
      type: '',
      status: '', //当前任务到什么阶段了
      activeNames1: '1',
      dataList: '',
      dataList2: '',
      stage: '1',
      popIsShow: false,
      popTitle: '',
      popContent: '',
    }
  },
  methods: {
    getList() {
      var id = this.id;
      this.$api.auditSystem.getDetails(id)
      .then(res=>{
        this.dataList = res.projectImplementation;
        this.dataList2 = res;
        this.status = res.projectImplementation.status;
        if(this.type == '备案审计') {
          if(this.status == 7 || this.status == 8) {
            this.stage = '2';
          }else if(this.status >= 9) {
            this.stage = '3';
          }
        }else if(this.type == '直接审计') {
          if(this.status >= 6 && this.status <= 36) {
            this.stage = '3';
          }else if(this.status >= 37) {
            this.stage = '3';
          }
        }
      })
    },
    showPop(title,content) {
      this.popIsShow = true;
      this.popTitle = title;
      this.popContent = content;
    },
    goDataGather(data) {
      this.$router.push({path: '/auditDataGather',query: {item: data}})
    },
    goFileDownload(data) {
      this.$router.push({path: '/auditFile',query: {file: data}})
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getList();
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.details-wrap {
  padding-top: 80/@size;
  .topStatus-wrap {
    div {
      border-bottom: 1px solid #ccc;
      width: 100%;
      padding: 20/@size;
      box-sizing: border-box;
      p span:last-child b {
        display: none;
      }
      b {
        position: relative;
        top: -2/@size;
      }
    }
    .left {
      width: 30%;
      float: left;
      color: #888;
      font-size: 22/@size;
    }
    .right {
      width: 70%;
      float: left;
      color: #017FFF;
      font-size: 22/@size;
      text-align: right;
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