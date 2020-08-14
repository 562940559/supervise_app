<template>
  <div class="questionIndexWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="questionLog" @click="go('questionAnalysis')">答题记录</span>
    </div>
    <!-- 答题统计卡 -->
    <div class="questionStatisticsWrap">
      <div class="questionSta">
        <div>
          <p>答题次数</p>
          <p>{{count}}</p>
        </div>
        <div>
          <p>答题正确率</p>
          <p>{{correctRate}}%</p>
        </div>
      </div>
    </div>
    <!-- 小标题 -->
    <div class="littleTitle">
      <p>精选答题</p>
    </div>
    <!-- 选择答题类型 -->
    <div class="questionSelcetWrap">
      <div class="questionSelcet">
        <div class="oneSelect" @click="go('everydayQuestion')">
          <div class="imgWrap">
            <img src="../../../../static/img/question/questionSelectOne.png" alt="">
          </div>
          <div class="textWrap">
            <p>每日一答</p>
            <p>每天学习一点点就是领先得开始</p>
          </div>
        </div>
        <div class="oneSelect" @click="errorToast()">
          <div class="imgWrap">
            <img src="../../../../static/img/question/questionSelectTwo.png" alt="">
          </div>
          <div class="textWrap">
            <p>挑战答题</p>
            <p>周而复始，如期而至</p>
          </div>
        </div>
        <div class="oneSelect" @click="errorToast()">
          <div class="imgWrap">
            <img src="../../../../static/img/question/questionSelectThree.png" alt="">
          </div>
          <div class="textWrap">
            <p>选择答题</p>
            <p>广学而博,专一而精</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as $api from "@/api";
import { Toast } from 'vant';
export default {
  data() {
    return {
      count: "0",
      correctRate: "0",
    };
  },
  created() {
    localStorage.setItem('iaAnswerQuestion',false)
    localStorage.setItem('isIndex',false)
  },
  mounted() {
    this.getQuestionStaList();
  },
  methods: {
    routerBack() {
      this.$router.replace("/");
    },
    getQuestionStaList() {
      // 获取答题数和正确率
      this.$api.question.getQuestionStaList().then((res) => {
        if (res.code == "200") {
          this.count = res.count;
          if (res.correctRate) {
            this.correctRate = res.correctRate;
          }
        }
      });
    },
    go(where) { //其他页面跳转
      this.$router.push(where)
    },
    errorToast() {
      Toast('该功能正在开发中')
    }
  },
};
</script>

<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.questionIndexWrap {
  height: 100%;
  background-color: #f4f4f4;
  box-sizing: border-box;
  padding-top: 80 / @size;
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    width: 100%;
    height: 80 / @size;
    background-color: #f4f4f4;
    color: #323232;
    font-size: 18 / @size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 30 / @size;
    z-index: 99999;
    top: 0;
    .return-btn {
      font-size: 28 / @size;
      width: 150 / @size;
      i {
        position: relative;
        top: 5 / @size;
      }
      .text {
        position: relative;
        left: -10 / @size;
      }
    }
    .questionLog {
      font-size: 24 / @size;
      width: 150 / @size;
      text-align: right;
      position: relative;
      top: 5 / @size;
      a {
        color: white;
      }
    }
  }
  .questionStatisticsWrap {
    box-sizing: border-box;
    padding: 0 30 / @size;
    height: 233 / @size;
    margin: 30 / @size 0;
    .questionSta {
      height: 100%;
      background: url("../../../../static/img/question/questionStaBg.png")
        no-repeat;
      background-size: 100% 100%;
      color: white;
      div {
        float: left;
        height: 100%;
        width: 50%;
        p {
          text-align: center;
        }
        p:nth-child(1) {
          height: 100 / @size;
          line-height: 100 / @size;
          margin-bottom: 20 / @size;
          font-size: 22 / @size;
        }
        p:nth-child(2) {
          height: 60 / @size;
          line-height: 60 / @size;
          font-size: 34 / @size;
          font-weight: 600;
        }
      }
      div:nth-child(1) {
        p:nth-child(2) {
          border-right: 1px solid white;
        }
      }
    }
  }
  .littleTitle {
    box-sizing: border-box;
    padding: 0 30 / @size;
    p {
      height: 40 / @size;
      line-height: 40 / @size;
      text-align: center;
      font-size: 24 / @size;
    }
  }
  .questionSelcetWrap {
    box-sizing: border-box;
    padding: 0 30 / @size;
    height: 420 / @size;
    margin-top: 20 / @size;
    .questionSelcet {
      height: 100%;
      box-sizing: border-box;
      padding: 30 / @size;
      background-color: #fff;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 10/@size;
    }
    .oneSelect {
      height: 120/@size;
      border-bottom: 1px solid #E5E5E5;
      box-sizing: border-box;
      padding-top: 25/@size;
      .imgWrap {
        float: left;
        width: 66/@size;
        height: 66/@size;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .textWrap {
        float: left;
        height: 66/@size;
        box-sizing: border-box;
        padding-left: 20/@size;
        p:nth-child(1) {
          font-size: 22/@size;
          color: #323232;
          height: 40/@size;
          font-weight:600;
        }
        p:nth-child(2) {
          color: #A5A5A5;
          font-size: 18/@size;
        }
      }
    }
    .oneSelect:nth-child(3) {
      border-bottom: none;
    }
  }
}
</style>