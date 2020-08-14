<template>
  <div class="everydayQuestionWrap">
    <!-- 返回按钮 -->
    <span class="return-btn">
      <van-icon name="arrow-left" @click="routerBack()"></van-icon>
    </span>
    <div class="answerPageWrap">
      <!-- 当前提数及正确与否 -->
      <div class="questionCount">
        <span>{{nowCount+1}}</span>/10&nbsp;&nbsp;单选题
      </div>
      <div class="answerIsRight">
        <span class="right" v-if="answerIsRight == 'right'">回答正确</span>
        <span class="wrong" v-if="answerIsRight == 'wrong'">回答错误</span>
      </div>
      <!-- 题目 -->
      <div class="questionTitle">
        <p>{{nowAnalysisDetail.problem}}</p>
      </div>
      <!-- 选项 -->
      <div
        :class="{'wrongActive':nowAnalysisDetail.answer==index&&nowAnalysisDetail.answer!=nowAnalysisDetail.correctAnswer,'rightActive':nowAnalysisDetail.correctAnswer==index }"
        class="answerSelect"
        v-for="(item,index) in answerList"
        :key="index"
      >
        {{index}}&nbsp;&nbsp;{{answerList[index]}}
        <span
          class="rightIcon"
          v-if="nowAnalysisDetail.correctAnswer==index"
        >
          <van-icon name="success" />
        </span>
        <span
          class="wrongIcon"
          v-if="nowAnalysisDetail.answer==index&&nowAnalysisDetail.answer!=nowAnalysisDetail.correctAnswer"
        >
          <van-icon name="cross" />
        </span>
      </div>
      <!-- 出题人 -->
      <div class="questionFrom">
        <span>出题：{{nowAnalysisDetail.source == null ? '无' : nowAnalysisDetail.source}}</span>
      </div>
      <!-- 答案解析 -->
      <div class="resultAnalysis">
        <p>答案解析</p>
        <p>正确答案：{{nowAnalysisDetail.correctAnswer}}</p>
        <div class="analysis">
          <p>【解析】</p>
          <p>{{nowAnalysisDetail.answerParse == '' ? '无' : nowAnalysisDetail.answerParse}}</p>
        </div>
      </div>
      <!-- 按钮组 -->
      <div class="buttonWrap">
        <p @click="routerBack()" v-if="isFinish">返回</p>
        <p @click="seeNextQuestion()" v-if="!isFinish">下一题</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as $api from "@/api";
import { Toast, Dialog } from "vant";
import aes from "../../../utils/aes";
export default {
  data() {
    return {
      nowCount: 0, // 当前第几题
      answerIsRight: "", // 回答是否正确 为空则不显示结果
      isFinish: false, // 是否看完了十道题
      // 答案列表
      answerList: {
        A: "1",
        B: "2",
        C: "3",
        D: "4",
      },
      type: "0", // 题目类型 0单选 1多选 2填空
      rightActive: "",
      wrongActive: "",
      nowAnalysisDetail: {
        problem: "", // 问题题目
        correctAnswer: "", // 正确答案
        source: "无", // 问题来源
        answerParse: "无", // 答案解析
      },
      allAnalysisDetail: "",
    };
  },
  created() {
    this.getQuestionLogDetail();
  },
  mounted() {},
  methods: {
    routerBack() {
      this.$router.back(-1);
    },
    getQuestionLogDetail() {
      var items = {
        topicId: this.$route.query.analysisTopicId,
      };
      var info = aes.encrypt(JSON.stringify(items)),
        data = `"requestData": "${info}"`;
      // 获取答题记录详情
      this.$api.question.getQuestionLogDetail(data).then((res) => {
        if (res.code == "200") {
          this.allAnalysisDetail = res.answerRecordList;
          this.nowAnalysisDetail = res.answerRecordList[0];
          this.answerList["A"] = res.answerRecordList[0].optionA;
          this.answerList["B"] = res.answerRecordList[0].optionB;
          this.answerList["C"] = res.answerRecordList[0].optionC;
          this.answerList["D"] = res.answerRecordList[0].optionD;
          if (this.nowCount + 1 == this.allAnalysisDetail.length) {
            return (this.isFinish = true);
          }
        }
      });
    },
    seeNextQuestion() {
      // 看下一道题
      this.nowCount = this.nowCount + 1;
      this.nowAnalysisDetail = this.allAnalysisDetail[this.nowCount];
      this.answerList["A"] = this.allAnalysisDetail[this.nowCount].optionA;
      this.answerList["B"] = this.allAnalysisDetail[this.nowCount].optionB;
      this.answerList["C"] = this.allAnalysisDetail[this.nowCount].optionC;
      this.answerList["D"] = this.allAnalysisDetail[this.nowCount].optionD;
      if (this.nowCount + 1 == this.allAnalysisDetail.length) {
        return (this.isFinish = true);
      }
    },
  },
};
</script>
<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.everydayQuestionWrap {
  min-height: 100%;
  box-sizing: border-box;
  padding: 100 / @size 30 / @size 30 / @size 30 / @size;
  background: url("../../../../static/img/question/everydayQsPageBg.png")
    no-repeat;
  background-size: 100% 100%;
  font-family: Source Han Sans CN;
  .return-btn {
    font-size: 28 / @size;
    width: 150 / @size;
    position: fixed;
    top: 30 / @size;
    left: 30 / @size;
    i {
      position: relative;
      top: 5 / @size;
      color: white;
    }
  }
  .pageTitle {
    color: white;
    width: 200 / @size;
    height: 40 / @size;
    position: fixed;
    font-size: 28 / @size;
    top: 30 / @size;
    left: 50%;
    margin-left: -100 / @size;
    text-align: center;
  }
  .answerPageWrap {
    width: 100%;
    border-radius: 5 / @size;
    background: white;
    position: relative;
    box-sizing: border-box;
    padding: 80 / @size 50 / @size 50 / @size 30 / @size;
    .questionCount {
      position: absolute;
      left: 50 / @size;
      top: 30 / @size;
      height: 30 / @size;
      line-height: 30 / @size;
      color: #a1a1a1;
      font-size: 20 / @size;
      span {
        color: #000;
        font-size: 24 / @size;
      }
    }
    .answerIsRight {
      position: absolute;
      right: 50 / @size;
      top: 30 / @size;
      height: 30 / @size;
      line-height: 30 / @size;
      font-size: 20 / @size;
      .right {
        color: #00bd43;
      }
      .wrong {
        color: #ff0000;
      }
    }
    .questionTitle {
      color: #5e73ed;
      font-size: 22 / @size;
      font-weight: 600;
      margin-bottom: 30 / @size;
      p {
        text-align: center;
      }
    }
    .answerSelect {
      background: white;
      border-radius: 20 / @size;
      text-align: center;
      color: #000;
      font-size: 20 / @size;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
      margin-bottom: 20 / @size;
      padding: 10 / @size 20 / @size;
      position: relative;
      span {
        position: absolute;
        right: -20 / @size;
        bottom: -15 / @size;
        font-size: 30 / @size;
      }
      .rightIcon {
        color: #00bd43;
      }
      .wrongIcon {
        color: #c62f2f;
      }
    }
    .rightActive {
      color: white;
      background: #5d7bed;
    }
    .wrongActive {
      color: white;
      background: #e5e5e5;
    }
    .questionFrom {
      margin-bottom: 30 / @size;
      span {
        display: inline-block;
        padding: 8 / @size 30 / @size;
        border-radius: 20 / @size;
        color: #00bd43;
        background: #ade7c6;
        text-align: center;
        font-size: 16 / @size;
      }
    }
    .resultAnalysis {
      margin-bottom: 30 / @size;
      > p:nth-child(1) {
        padding-left: 20 / @size;
        color: #5e70ec;
        font-size: 24 / @size;
        text-align: left;
        font-family: Source Han Sans CN;
        margin-bottom: 20 / @size;
        border-left: 1px solid #5e70ec;
      }
      > p:nth-child(2) {
        color: #000000;
        font-size: 18 / @size;
      }
      .analysis {
        color: #747474;
        font-size: 16 / @size;
        p:nth-child(1) {
          margin: 10 / @size 0;
        }
        p:nth-child(2) {
          height: 100 / @size;
          overflow-y: auto;
        }
      }
    }
    .buttonWrap {
      height: 60 / @size;
      p {
        height: 100%;
        line-height: 60 / @size;
        color: white;
        text-align: center;
        font-size: 20 / @size;
        background: linear-gradient(
          180deg,
          rgba(93, 150, 241, 1) 0%,
          rgba(95, 85, 233, 1) 100%
        );
        border-radius: 35 / @size;
      }
    }
  }
}
</style>