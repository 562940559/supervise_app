<template>
  <div class="addQueryWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span class="setting-btn" @click="goProcess()">
        <van-icon name="exchange" />
        <span>流程</span>
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
              <span>{{applyInfo.applyDept}}</span>
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
              <span>{{applyInfo.applicant}}</span>
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
              <span>{{applyInfo.phone}}</span>
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
              <span @click="showPop('数据查询需求',applyInfo.dataRequirements)">
                {{applyInfo.dataRequirements}}
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
            <p>数据查询项目</p>
          </div>
        </div>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写数据查询项目"
          v-model="applyInfo.queryProject"
          style="color: #ccc;"
          readonly
        ></textarea>
      </div>
      <!-- part-two -->
      <div class="partTwo-wrap opinion">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/opinion.png" alt />
          </div>
          <div class="plateName">
            <p>
              申请处室意见
              <b>*</b>
            </p>
          </div>
        </div>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写意见"
          v-model="para.opinion"
        ></textarea>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="submitBtn-wrap">
      <van-button type="primary" size="large" @click="submitForm('fail')">审核不通过</van-button>
      <van-button type="primary" size="large" @click="submitForm('adopt')">审核通过</van-button>
    </div>

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
import { Toast } from "vant";
import * as $api from "@/api";
export default {
  data() {
    return {
      show: false,
      applyId: "", // 申请ID
      showTitle: "",
      showText: "",
      applyInfo: {
        applyDept: "", // 申请部门
        applicant: "", // 申请人
        phone: "", // 联系方式
        dataRequirements: "", // 数据查询需求
        queryProject: "" // 查询企业相关信息
      },
      para: {
        opinion: "无意见", // 申请处室意见
        isPass: "" // 是否通过
      }
    };
  },
  created() {
    this.applyId = this.$route.query.id;
    this.getApplyDetails(this.applyId);
  },
  mounted() {},
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
    showPop(title, content) {
      // 显示弹窗
      this.showTitle = title;
      this.showText = content;
      this.show = true;
    },
    getApplyDetails(id) {
      this.$api.queryApply.getApplyDetails(id).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.applyInfo = res.data;
        }
      });
    },
    approval() {
      // 审核操作
      this.$api.queryApply
        .departmentApproval(this.applyId, this.para)
        .then(res => {
          if (res.code == "200") {
            if (this.para.isPass == "1") {
              Toast("操作成功，审核不通过！");
            } else if (this.para.isPass == "0") {
              Toast("操作成功，审核通过！");
            }
            setTimeout(() => {
              this.$router.back("-1");
            }, 500);
          }
        });
    },
    submitForm(select) {
      // 提交表单
      if (this.para.opinion == "") {
        return Toast("请输入审核意见！");
      }
      if (select == "fail") {
        this.para.isPass = "1";
      } else if (select == "adopt") {
        this.para.isPass = "0";
      }
      return this.approval();
    },
    goProcess() {
      let id = this.applyId;
      this.$router.push({path: '/approvalProcess',query: {id: id}})
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
  padding-bottom: 90 / @size;
  .submitBtn-wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70 / @size;
    .van-button {
      width: 50%;
      height: 100%;
      float: left;
      border: none;
    }
    .van-button:nth-child(1) {
      background-color: #fff;
      color: #323232;
    }
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
    .opinion {
      .plate {
        .img-wrap {
          img {
            width: 30 / @size;
            height: 30 / @size;
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