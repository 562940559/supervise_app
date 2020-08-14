<template>
  <div class="questionAnalysisWrap">
    <div class="oneQuestionLogWrap" v-for="(item,index) in questionLogList" :key="index">
      <span>{{choiceTitle(item.type)}}</span>
      <span>
        <b>{{item.answersNumber}}</b>/10题 {{resetTime(item.startTime)}}
      </span>
      <span @click="goDetail(item.topicId)">查看解析</span>
    </div>
  </div>
</template>

<script>
import * as $api from "@/api";
import aes from "../../../utils/aes";
export default {
  data() {
    return {
      questionLogList: [],
    };
  },
  created() {},
  mounted() {
    this.getQuestionLogList();
  },
  methods: {
    choiceTitle(type) {
      if (type == "0") {
        return "每日一答";
      }
      if (type == "1") {
        return "挑战答题";
      }
      if (type == "2") {
        return "专项答题";
      }
    },
    getQuestionLogList() {  // 获取答题列表
      this.$api.question.getQuestionLogList().then((res) => {
        var that = this;
        if (res.code == "200") {
          for(let a in res.topicRecordDTOList) {
            if(res.topicRecordDTOList[a].answersNumber != 0) {
              that.questionLogList.unshift(res.topicRecordDTOList[a])
            }
          }
          return console.log(that.questionLogList)
        }
      });
    },
    resetTime(time) { // 重置化时间戳
      var time = new Date(time);
      return time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 5)
    },
    goDetail(item) { // 查看详情
      this.$router.push({path: '/questionAnalysisDetail',query: {analysisTopicId: item}})
    },
  },
};
</script>

<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.questionAnalysisWrap {
  box-sizing: border-box;
  padding-top: 80 / @size;
  padding-left: 30 / @size;
  padding-right: 30 / @size;
  overflow-y: auto;
  .oneQuestionLogWrap {
    margin: 10 / @size 0;
    width: 100%;
    height: 90 / @size;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10 / @size;
    box-sizing: border-box;
    padding: 25 / @size 10 / @size;
    span {
      float: left;
      height: 40 / @size;
      line-height: 40 / @size;
      text-align: center;
      font-size: 18 / @size;
    }
    span:nth-child(1) {
      color: #323232;
      font-size: 24 / @size;
    }
    span:nth-child(2) {
      padding-left: 10/@size;
      color: #868686;
      b {
        color: #000;
      }
    }
    span:nth-child(3) {
      padding: 0 15 / @size;
      background: linear-gradient(
        180deg,
        rgba(49, 147, 244, 1) 0%,
        rgba(95, 86, 233, 1) 100%
      );
      border-radius: 20 / @size;
      color: white;
      float: right;
    }
  }
}
</style>