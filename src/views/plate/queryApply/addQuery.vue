<template>
  <div class="addQueryWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span class="setting-btn">
        <!-- <van-icon name="exchange" /><span>流程</span> -->
      </span>
    </div>
    <!-- 查询条件 -->
    <div class="addQueryBody">
      <!-- 查询标题 -->
      <div class="title-wrap">
        <div class="img-wrap">
          <span>申</span>
        </div>
        <div class="text-wrap" @click="moreExplain()">
          <div class="title">天府新区审计中心数据查询申请</div>
          <div class="explain">
            <span>说明</span>天府新区审计中心查询、分析涉及...
          </div>
        </div>
        <van-icon name="arrow" />
      </div>
      <!-- part-one -->
      <div class="partOne-wrap">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/applyDepartment.png" alt />
          </div>
          <div class="plateName">
            <p>
              申请处室
              <span>{{personInfo.applyDept}}</span>
            </p>
          </div>
        </div>
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/applyPerson.png" alt />
          </div>
          <div class="plateName">
            <p>
              申请人
              <span>{{personInfo.applicant}}</span>
            </p>
          </div>
        </div>
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/applyPersonContact.png" alt />
          </div>
          <div class="plateName">
            <p>
              申请人联系方式
              <span>{{personInfo.phone == '' ? '暂无' : personInfo.phone}}</span>
            </p>
          </div>
        </div>
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/opinion.png" alt />
          </div>
          <div class="plateName">
            <p>
              数据查询需求
              <b>*</b>
              <span @click="goOtherPage('dataQueryProject',para.dataRequirements)">
                {{para.dataRequirements}}
                <van-icon name="arrow" />
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- part-two -->
      <div class="partTwo-wrap">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/dataQuery.png" alt />
          </div>
          <div class="plateName">
            <p>
              数据查询项目
              <b>*</b>
            </p>
          </div>
        </div>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写数据查询项目"
          v-model="para.queryProject"
        ></textarea>
      </div>
    </div>
    <!-- 提交按钮 -->
    <van-button type="primary" size="large" @click="submitForm()">提交</van-button>
    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
let refreshFlag = "";
import { Toast } from "vant";
import * as $api from "@/api";
export default {
  data() {
    return {
      show: false,
      refreshFlag: "", // 判断是否刷新数据
      showTitle: "",
      showText: "",
      personInfo: {
        applyDept: "", // 申请部门
        applicant: "", // 申请人
        phone: "" // 联系方式
      },
      para: {
        dataRequirements: "请选择", // 办案核查
        queryProject: "" // 查询企业相关信息
      }
    };
  },
  created() {
    this.$api.queryApply.getPersonInfo().then(res => {
      this.personInfo = res.data;
    });
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    if (from.name === "任务拟办首页") {
      refreshFlag = true;
    } else {
      refreshFlag = false;
    }
    next();
  },
  activated() {
    if (refreshFlag) {
      // 从首页进入就刷新页面
      this.para.dataRequirements = "请选择";
      this.para.queryProject = "";
    } else {
      return (this.para.dataRequirements = this.$route.query.haveSelected);
    }
  },
  methods: {
    routerBack() {
      this.$router.back("-1");
    },
    moreExplain() {
      // 更多说明
      this.showTitle = "说明";
      this.showText =
        "天府新区审计中心查询、分析涉及个人隐私，包含但不仅限于房管、车管、社保、公积金、个人所得税、关联关系人、身份证号、银行流水等信息或疑点不得作为审计、办案取证的直接依据，如有取证需求，请申请处室报纪工委书记签批盖章。各处室取得的数据查询分析结果必须严格保密，如果出现数据丢失、泄密等情况，由此引发的一切后果和责任，由申请处室自行负责。";
      this.show = true;
    },
    goOtherPage(where, item) {
      // 跳转
      this.$router.replace({ path: where, query: { item: item } });
    },
    submitForm() {
      // 提交表单
      for (let a in this.para) {
        if (this.para[a] == "请选择" || this.para[a] == "") {
          return Toast("请完整填写表单！");
        }
      }
      this.$api.queryApply.submitApply(this.para).then(res => {
        if (res.code == "200") {
          Toast("申请提交成功！");
          setTimeout(() => {
            this.$router.back("-1");
          }, 500);
        }
      });
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.addQueryWrap {
  min-height: 100%;
  box-sizing: border-box;
  background-color: rgb(249, 249, 249);
  padding-bottom: 60 / @size;
  .van-button {
    position: fixed;
    bottom: 0;
  }
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    width: 100%;
    height: 80 / @size;
    background-color: #fff;
    color: #323232;
    font-size: 18 / @size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20 / @size;
    z-index: 99999;
    overflow: hidden;
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
    .route-title {
      font-size: 32 / @size;
      text-align: center;
    }
    .setting-btn {
      font-size: 34 / @size;
      width: 150 / @size;
      height: 35 / @size;
      text-align: right;
      i {
        font-size: 28 / @size;
      }
      span {
        font-size: 20 / @size;
        position: relative;
        top: -8 / @size;
      }
    }
  }
  .addQueryBody {
    box-sizing: border-box;
    padding: 0 20 / @size;
    padding-top: 100 / @size;
    .title-wrap {
      background-color: #fff;
      width: 100%;
      height: 147 / @size;
      box-sizing: border-box;
      padding: 10 / @size 40 / @size 0 / @size 100 / @size;
      position: relative;
      i {
        position: absolute;
        right: 10 / @size;
        top: 60 / @size;
        color: #a5a5a5;
        font-size: 22 / @size;
      }
      .img-wrap {
        width: 100 / @size;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        margin-left: -100 / @size;
        span {
          display: inline-block;
          width: 80 / @size;
          height: 80 / @size;
          font-size: 30 / @size;
          text-align: center;
          line-height: 80 / @size;
          color: #fff;
          background-color: rgb(140, 151, 203);
          border-radius: 50%;
        }
      }
      .text-wrap {
        float: left;
        width: 100%;
        height: 100%;
        .title {
          width: 100%;
          height: 60 / @size;
          line-height: 60 / @size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 24 / @size;
          font-weight: 600;
          color: #323232;
        }
        .explain {
          margin-top: 10 / @size;
          height: 40 / @size;
          font-size: 22 / @size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #909090;
          span {
            display: inline-block;
            height: 30 / @size;
            font-size: 18 / @size;
            text-align: center;
            line-height: 30 / @size;
            padding: 0 15 / @size;
            background-color: #eeeeee;
            margin-right: 5 / @size;
            border-radius: 15 / @size;
          }
        }
      }
    }
    .partOne-wrap {
      margin-top: 20 / @size;
      background-color: #fff;
      width: 100%;
      .plate {
        width: 100%;
        height: 80 / @size;
        box-sizing: border-box;
        padding: 0 10 / @size;
        padding-left: 60 / @size;
        border-bottom: 1px solid #eeeeee;
        .img-wrap {
          width: 60 / @size;
          height: 80 / @size;
          margin-left: -60 / @size;
          display: flex;
          justify-content: center;
          align-items: center;
          float: left;
          img {
            width: 30 / @size;
            height: 30 / @size;
          }
        }
        .plateName {
          float: left;
          width: 100%;
          p {
            height: 80 / @size;
            line-height: 80 / @size;
            font-size: 22 / @size;
            color: #323232;
            b {
              color: #ff0000;
              position: relative;
              right: -2px;
              top: -2px;
            }
            span {
              color: #b0b0b0;
              float: right;
              max-width: 280 / @size;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            i {
              position: relative;
              top: 3 / @size;
            }
          }
        }
      }
    }
    .partTwo-wrap {
      margin-top: 20 / @size;
      background-color: #fff;
      width: 100%;
      .plate {
        width: 100%;
        height: 80 / @size;
        box-sizing: border-box;
        padding: 0 10 / @size;
        padding-left: 60 / @size;
        border-bottom: 1px solid #eeeeee;
        .img-wrap {
          width: 60 / @size;
          height: 80 / @size;
          margin-left: -60 / @size;
          display: flex;
          justify-content: center;
          align-items: center;
          float: left;
          img {
            width: 24 / @size;
            height: 34 / @size;
          }
        }
        .plateName {
          float: left;
          width: 100%;
          p {
            height: 80 / @size;
            line-height: 80 / @size;
            font-size: 22 / @size;
            color: #323232;
            b {
              color: #ff0000;
              position: relative;
              right: -2px;
              top: -2px;
            }
          }
        }
      }
    }
    textarea {
      width: 100%;
      height: 150 / @size;
      border: 0;
      box-sizing: border-box;
      padding: 20 / @size 40 / @size;
      color: #323232;
      font-size: 20 / @size;
    }
  }

  .popWrap {
    background-color: #fff;
    padding: 50 / @size;
    position: relative;
    border-radius: 50 / @size;
    p {
      width: 300 / @size;
    }
  }
  .popWrap p:nth-child(1) {
    text-align: center;
    font-size: 22 / @size;
    color: #000;
    margin-bottom: 20 / @size;
  }
  .popWrap p:nth-child(2) {
    word-wrap: break-word;
    color: #737373;
    font-size: 20 / @size;
  }
}
</style>