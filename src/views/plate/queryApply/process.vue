<template>
  <div class="approvalProcess-wrap">
    <div class="personInfo-wrap">
      <div class="head">
        <p>{{process.applicant.substring(1,process.applicant[0]) }}</p>
      </div>
      <div class="body">
        <p>
          {{process.applicant}}
          <span>{{process.applyTime}}</span>
        </p>
        <p>{{process.applyDept}}&nbsp;&nbsp;&nbsp;&nbsp;{{process.phone}}</p>
      </div>
      <div class="foot">
        <p>
          <van-icon name="more-o" />
        </p>
        <p>{{process.processStatus}}</p>
      </div>
    </div>
    <div class="quertInfo-wrap">
      <div class="title">数据查询申请</div>
      <div class="content">数据查询项目： {{process.dataRequirements}}</div>
      <div class="content">数据查询需求： {{process.queryProject}}</div>
    </div>
    <div class="processWrap" v-for="(item, index) in process.reviewData" :key="index">
      <div class="stepsWrap">
        <van-icon name="checked" color="#6adac9" v-if="item.isThrough == 0" />
        <van-icon name="close" color="#fd5f5a" v-if="item.isThrough == 1" />
      </div>
      <div class="contentWrap">
        <div class="content">
          <p>
            <span>办理人：{{item.reviewer}}</span>
            <span>{{item.reviewerTime}}</span>
          </p>
          <p>
            <span>审核意见：{{item.opinion}}</span>
          </p>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import * as $api from "@/api";
export default {
  data() {
    return {
      applyId: "",
      process: {
        applicant: ""
      }
    };
  },
  methods: {
    getDetails(id) {
      this.$api.queryApply.getProcessDetails(id).then(res => {
        console.log(res);
        this.process = res.data;
        this.process.reviewData.reverse();
      });
    }
  },
  mounted() {
    this.applyId = this.$route.query.id;
    return this.getDetails(this.applyId);
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.approvalProcess-wrap {
  min-height: 100%;
  box-sizing: border-box;
  background-color: rgb(249, 249, 249);
  padding-top: 100 / @size;
  padding-left: 20 / @size;
  padding-right: 20 / @size;
  .processWrap {
    padding: 0 10 / @size;
    box-sizing: border-box;
    min-height: 150 / @size;
    font-size: 0;
    overflow: hidden;
    position: relative;
    div {
      float: left;
    }
    .stepsWrap {
      font-size: 40 / @size;
      width: 0.8rem;
      height: 50 / @size;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      margin-top: -25 / @size;
      i {
        z-index: 999;
        background-color: #f7f7f7;
      }
    }
    // .stepsWrap:after {
    //   position: absolute;
    //   z-index: 1;
    //   top: 50%;
    //   width: 5 / @size;
    //   height: 200 / @size;
    //   background-color: #dcdcdc;
    //   content: "";
    // }
    // .stepsWrap:before {
    //   position: absolute;
    //   width: 5 / @size;
    //   height: 300 / @size;
    //   background-color: #dcdcdc;
    //   content: "";
    // }
    .contentWrap {
      font-size: 20 / @size;
      min-height: 130 / @size;
      width: calc(~"100% - 1.1rem");
      margin-left: 0.9rem;
      padding: 10 / @size 0;
      .content {
        width: 100%;
        min-height: 130 / @size;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20 / @size  10 / @size;
        p {
          width: 100%;
          margin-bottom: 10 / @size;
          span {
            display: inline-block;
            height: 30 / @size;
            line-height: 30 / @size;
            color: #767676;
            font-size: 20 / @size;
          }
        }
        p:nth-child(2) {
          margin-bottom: 0;
        }
        p:nth-child(1) {
          span:first-child {
            font-size: 22 / @size;
            color: rgb(107, 107, 107);
          }
          span:last-child {
            float: right;
          }
        }
      }
    }
  }
  .personInfo-wrap {
    width: 100%;
    height: 100 / @size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10 / @size 10 / @size 10 / @size 430 / @size;
    .head {
      float: left;
      width: 80 / @size;
      height: 80 / @size;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: -420 / @size;
      p {
        width: 70 / @size;
        height: 70 / @size;
        background-color: rgb(132, 204, 201);
        color: white;
        font-size: 28 / @size;
        text-align: center;
        line-height: 70 / @size;
        border-radius: 35 / @size;
      }
    }
    .body {
      float: left;
      width: 340 / @size;
      height: 80 / @size;
      margin-left: -330 / @size;
      p {
        font-size: 20 / @size;
        height: 40 / @size;
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          margin-left: 20 / @size;
          color: #4065aa;
          font-size: 18 / @size;
        }
      }
    }
    .foot {
      float: left;
      height: 80 / @size;
      p {
        height: 40 / @size;
        text-align: center;
        line-height: 40 / @size;
        font-size: 20 / @size;
        color: #4065aa;
      }
      i {
        color: rgb(115, 213, 190);
        font-size: 28 / @size;
        position: relative;
        top: 15 / @size;
      }
    }
  }
  .quertInfo-wrap {
    margin-top: 20 / @size;
    width: 100%;
    min-height: 120 / @size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10 / @size;
    margin-bottom: 10/@size;
    .title {
      height: 40 / @size;
      line-height: 40 / @size;
      color: #4065aa;
      font-size: 24 / @size;
    }
    .content {
      font-size: 20 / @size;
      margin: 20 / @size 0;
    }
  }
}
</style>