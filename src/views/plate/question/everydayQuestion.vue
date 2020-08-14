<template>
  <div class="everydayQuestionWrap">
    <!-- 返回按钮 -->
    <span class="return-btn">
      <van-icon name="arrow-left" @click="routerBack()"></van-icon>
    </span>
    <span class="pageTitle">每日一答</span>
    <div class="answerPageWrap">
      <!-- 当前提数及正确与否 -->
      <div class="questionCount">
        <span>{{nowCount}}</span>/10&nbsp;&nbsp;单选题
      </div>
      <div class="answerIsRight">
        <span class="right" v-if="answerIsRight == 'right'">回答正确</span>
        <span class="wrong" v-if="answerIsRight == 'wrong'">回答错误</span>
      </div>
      <!-- 题目 -->
      <div class="questionTitle">
        <p>{{problem}}</p>
      </div>
      <!-- 选项 -->
      <div
        :class="{'wrongActive':wrongActive==index,'rightActive':rightActive==index }"
        class="answerSelect"
        v-for="(item,index) in answerList"
        :key="index"
        @click="choiceThis(index)"
      >
        {{index}}&nbsp;&nbsp;{{answerList[index]}}
        <span
          class="rightIcon"
          v-if="isChoice&&rightActive==index"
        >
          <van-icon name="success" />
        </span>
        <span class="wrongIcon" v-if="wrongActive==index">
          <van-icon name="cross" />
        </span>
      </div>
      <!-- 出题人 -->
      <div class="questionFrom">
        <span>出题：{{source == null ? '无' : source}}</span>
      </div>
      <!-- 答案解析 -->
      <div class="resultAnalysis" v-if="isChoice">
        <p>答案解析</p>
        <p>正确答案：{{requireItem.correctAnswer}}</p>
        <div class="analysis">
          <p>【解析】</p>
          <p>{{answerParse == '' ? '无' : answerParse}}</p>
        </div>
      </div>
      <!-- 按钮组 -->
      <div class="buttonWrap">
        <p v-if="!isChoice" @click="sureChoice()">确定</p>
        <p v-if="isChoice" @click="saveQuestion()">下一题</p>
      </div>
    </div>
    <van-popup v-model="showPop">
      <div class="popWrap">
        <div class="imgWrap">
          <img src="../../../../static/img/question/everydayQuestionSuccessBg.png" alt />
        </div>
        <p>答题成功</p>
        <p>
          答题数:
          <span>10</span>
        </p>
        <p>
          答对数:
          <span>{{rightCount}}</span>
        </p>
        <p>
          正确率:
          <span>{{rightCount}}0%</span>
        </p>
        <div class="btn">
          <p @click="backIndex()">返回首页</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as $api from "@/api";
import { Toast, Dialog } from "vant";
import aes from "../../../utils/aes";
export default {
  data() {
    return {
      nowCount: 1, // 当前第几题
      problem: "", // 问题题目
      answerIsRight: "", // 回答是否正确 为空则不显示结果
      // 答案列表
      answerList: {
        A: "1",
        B: "2",
        C: "3",
        D: "4",
      },
      rightCount: "", // 答对了多少题
      source: "无", // 问题来源
      isChoice: false, // 是否已经选择
      answerParse: "无", // 答案解析
      type: "0", // 题目类型 0单选 1多选 2填空
      rightActive: "",
      wrongActive: "",
      requireItem: {
        topicId: "", // 专项id
        answer: "", // 用户答案
        correctAnswer: "", //正确答案
        questionId: "", // 题目id
      },
      showPop: false, // 是否显示弹出层
    };
  },
  created() {
    this.createNewQuestion();
    localStorage.setItem("iaAnswerQuestion", true);
  },
  mounted() {},
  methods: {
    routerBack() {
      Dialog.confirm({
        title: "提示",
        message: "确认退出答题吗？",
      })
        .then(() => {
          this.$router.back(-1);
        })
        .catch(() => {});
    },
    backIndex() {
      this.$router.back(-1);
    },
    choiceThis(item) {
      //做选择
      if (this.isChoice) {
        // 如果确定了 就拦截选择
        return false;
      }
      this.rightActive = item;
      this.requireItem.answer = item;
    },
    createNewQuestion() {
      // 生成新的每日一答
      this.$api.question.createEverydayQuestion().then((res) => {
        if (res.code == "200") {
          this.requireItem.topicId = res.topicId;
          this.problem = res.randomQuestions.problem;
          this.requireItem.questionId = res.randomQuestions.id;
          this.answerList["A"] = res.randomQuestions.optionA;
          this.answerList["B"] = res.randomQuestions.optionB;
          this.answerList["C"] = res.randomQuestions.optionC;
          this.answerList["D"] = res.randomQuestions.optionD;
          this.requireItem.correctAnswer = res.randomQuestions.correctAnswer;
          this.answerParse = res.randomQuestions.answerParse;
          this.type = res.randomQuestions.type;
          this.source = res.randomQuestions.source;
        }
      });
    },
    sureChoice() {
      // 确认答案
      if (this.requireItem.answer == "") {
        return Toast("请做出选择！");
      }
      this.isChoice = true;
      this.rightActive = this.requireItem.correctAnswer;
      if (this.requireItem.correctAnswer != this.requireItem.answer) {
        // 如果用户的选择不同于正确答案 显示选错的选项
        this.wrongActive = this.requireItem.answer;
      }
    },
    saveQuestion() {
      // 保存题目
      if (this.nowCount == 10) {
        //当前是第十题就没有下一题了
        var info = "",
          data = "";
        this.requireItem["endTime"] = new Date();
        info = aes.encrypt(JSON.stringify(this.requireItem));
        data = `"requestData": "${info}"`;
        console.log(this.requireItem)
        this.$api.question.saveQuestion(data).then((res) => {
          //成功保存后获取下一道题
          console.log(res);
          if (res.code == "200") {
            this.showPop = true;
            this.rightCount = res.rightCount;
          }
        });
      } else {
        var info = aes.encrypt(JSON.stringify(this.requireItem)),
          data = `"requestData": "${info}"`;
        this.$api.question.saveQuestion(data).then((res) => {
          //成功保存后获取下一道题
          if (res.code == "200") {
            this.nextQuestion();
          }
        });
      }
    },
    nextQuestion() {
      // 下一题
      this.$api.question.getNextQuestion().then((res) => {
        // 重新赋值 当前题数加一 清空上一题的选择
        this.nowCount = this.nowCount + 1;
        this.isChoice = false;
        this.problem = res.randomQuestions.problem;
        this.requireItem.questionId = res.randomQuestions.id;
        this.answerList["A"] = res.randomQuestions.optionA;
        this.answerList["B"] = res.randomQuestions.optionB;
        this.answerList["C"] = res.randomQuestions.optionC;
        this.answerList["D"] = res.randomQuestions.optionD;
        this.requireItem.correctAnswer = res.randomQuestions.correctAnswer;
        this.answerParse = res.randomQuestions.answerParse;
        this.type = res.randomQuestions.type;
        this.source = res.randomQuestions.source;
        this.rightActive = "";
        this.wrongActive = "";
        this.requireItem.answer = "";
      });
    },
  },
};
</script>
<style lang="less" type="text/less">
@import "../../../assets/less/common.less";
.everydayQuestionWrap {
  .van-popup {
    background: none;
    width: 100%;
    box-sizing: border-box;
    padding: 30 / @size;
  }
}
</style>
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
  .popWrap {
    // 弹窗界面样式
    background: none;
    width: 100%;
    background: white;
    border-radius: 10 / @size;
    box-sizing: border-box;
    padding-bottom: 20 / @size;
    .imgWrap {
      width: 200 / @size;
      height: 200 / @size;
      margin: 0 auto;
      padding: 10 / @size 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    > p {
      text-align: center;
      position: relative;
      top: -30 / @size;
      color: #747474;
      font-size: 20 / @size;
      margin: 10 / @size 0;
      span {
        margin-left: 5 / @size;
        color: #000;
      }
    }
    > p:nth-child(2) {
      color: #000000;
      font-size: 40 / @size;
      font-weight: 600;
      margin: 10 / @size 0;
    }
    .btn {
      text-align: center;
      position: relative;
      top: -10 / @size;
      p {
        display: inline-block;
        width: 200 / @size;
        height: 60 / @size;
        line-height: 60 / @size;
        color: white;
        border-radius: 25 / @size;
        margin: 0 10 / @size;
        font-size: 24 / @size;
        text-align: center;
        background-color: #bfbfbf;
      }
    }
  }
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