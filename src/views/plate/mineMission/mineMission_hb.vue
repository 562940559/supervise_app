<template>
  <div class="mineMissionWrap">
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <p>
        <router-link style="color: #ABABAB" to="/mineMission" replace>
          <span v-if="this.power.reviewPermissions">
            审核
            <b v-show="this.allNumber.auditNumber>0"></b>
          </span>
        </router-link>
        <router-link to="/mineMission_hb" replace>
          <span v-if="this.power.reportPermissions">
            汇报
            <b v-show="this.allNumber.reportNumber>0"></b>
          </span>
        </router-link>
        <router-link style="color: #ABABAB" to="/mineMission_gd" replace>
          <span v-if="this.power.filePermissions">
            归档
            <b v-show="this.allNumber.archiveNumber>0"></b>
          </span>
        </router-link>
        <router-link style="color: #ABABAB" to="/mineMission_fp" replace>
          <span v-if="this.power.assignPermissions">
            分配
            <b v-show="this.allNumber.distributionNumber>0"></b>
          </span>
        </router-link>
      </p>
    </div>
    <div class="oneMission-wrap" v-for="(item,index) in mineMissionList" :key="index">
      <div class="oneMission-cont" v-if="item.type != '数据查询申请' && item.status == '待汇报'">
        <div class="title">
          <p>{{item.supervisoryItems}}</p>
          <p>{{item.reportTime}}</p>
        </div>
        <div class="content">
          <p>汇报截止时间：{{item.appointedTaskReportTime}}</p>
          <p>状态：{{item.status}}</p>
        </div>
        <div @click="goHbDetail(item.id,item.type,item.status)" class="btn">
          <p>汇报</p>
        </div>
      </div>
      <div class="oneMission-cont modify" v-if="item.type == '数据查询申请' && (item.status == '审核不通过'||item.status == '待反馈')">
        <div class="title">
          <p>{{item.applicant}}发起的数据查询申请审核</p>
          <p>{{item.reportTime}}</p>
        </div>
        <div class="content">
          <p>发起人：{{item.applicant}}</p>
          <p>状态：{{item.status}}</p>
        </div>
        <div @click="goQuery(item.id,item.status)" class="btn" v-if="item.status == '审核不通过'">
          <p>修改</p>
        </div>
        <div @click="goQuery(item.id,item.status)" class="btn" v-if="item.status == '待反馈'">
          <p>反馈</p>
        </div>
      </div>
      <div class="oneMission-cont modify" v-if="item.type != '数据查询申请' && item.status != '待汇报'">
        <div class="title">
          <p>{{item.supervisoryItems}}</p>
          <p>{{item.reportTime}}</p>
        </div>
        <div class="content">
          <p>汇报截止时间：{{item.appointedTaskReportTime}}</p>
          <p>状态：{{item.status}}</p>
        </div>
        <div @click="goHbDetail(item.id,item.type,item.status)" class="btn">
          <p>修改</p>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <van-divider>无更多信息</van-divider>
    </div>
  </div>
</template>

<script>
import * as $api from "@/api";
export default {
  data() {
    return {
      mineMissionList: "",
      power: "",
      allNumber: {
        auditNumber: "", // 待审核数量
        reportNumber: "", //待汇报数量
        distributionNumber: "", //待分配数量
        archiveNumber: "" //待归档数量
      }
    };
  },
  methods: {
    routerBack() {
      this.$router.push("/");
    },
    goHbDetail(id, type, status) {
      if (type == "牵头任务") {
        if (status == "审核不通过") {
          this.$router.push({
            path: "/takeLeadReport",
            query: { takeLeadId: id, pageType: "modify" }
          });
          return;
        } else {
          this.$router.push({
            path: "/takeLeadReport",
            query: { takeLeadId: id, pageType: "report" }
          });
          return;
        }
      } else if (type == "我的任务") {
        if (status == "审核不通过") {
          this.$router.push({
            path: "/undertakeReport",
            query: { undertakeId: id, pageType: "modify" }
          });
          return;
        } else {
          this.$router.push({
            path: "/undertakeReport",
            query: { undertakeId: id, pageType: "report" }
          });
          return;
        }
      } else if (type == "配合任务") {
        if (status == "审核不通过") {
          this.$router.push({
            path: "/coordinateReport",
            query: { coordinateId: id, pageType: "modify" }
          });
          return;
        } else {
          this.$router.push({
            path: "/coordinateReport",
            query: { coordinateId: id, pageType: "report" }
          });
          return;
        }
      } else if (type == "任务拟办") {
        this.$api.createTask.getCompletedDetail(id).then(res => {
          this.$router.push({ path: "/addTask", query: { id: id, item: res } });
        });
        return;
      } else if (type == "指派任务拟办") {
        this.$api.zprwCreateTask.getCompletedDetail(id).then(res => {
          this.$router.push({
            path: "/addZprwNiBan",
            query: { item: res, id: id }
          });
        });
        return;
      } else if (type == "汇报指派任务") {
        if (status == "审核不通过") {
          this.$router.push({
            path: "/zprwReport",
            query: { ZprwNiBanid: id, pageType: "modify" }
          });
          return;
        } else {
          this.$router.push({
            path: "/zprwReport",
            query: { ZprwNiBanid: id, pageType: "report" }
          });
          return;
        }
      }
    },
    goQuery(id, status) {
      if (status == "审核不通过") {
        this.$router.push({ path: "editQuery", query: { id: id } });
      }if(status == '待反馈') {
        this.$router.push({ path: "feedback", query: { id: id } });
      }
    }
  },
  created() {
    this.$api.mineMission.getMineMissionList_hb().then(res => {
      console.log(res);
      this.mineMissionList = res.reportData;
    });
    this.$api.work
      .getMineMissionPower() // 获取我的任务权限
      .then(res => {
        this.power = res;
      }),
      this.$api.work.getWorkCount().then(res => {
        this.allNumber = res.myTaskNum;
      });
    localStorage.setItem("isIndex", false);
  },
  mounted() {}
};
</script>

<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.mineMissionWrap {
  padding-top: 80 / @size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  .top-wrap {
    width: 100%;
    height: 80 / @size;
    background-color: white;
    color: #323232;
    font-family: SourceHanSansCN;
    font-size: 18 / @size;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20 / @size;
    position: fixed;
    z-index: 9999;
    top: 0;
    .return-btn {
      font-size: 28 / @size;
      float: left;
      i {
        position: relative;
        top: 5 / @size;
      }
    }
    a {
      color: #323232;
    }
    p {
      width: 100%;
      float: left;
      text-align: center;
      font-size: 24 / @size;
      span {
        margin: 0 10 / @size;
        position: relative;
        b {
          width: 12 / @size;
          height: 12 / @size;
          background-color: #ff0000;
          display: inline-block;
          position: absolute;
          border-radius: 50%;
        }
      }
    }
  }
  .oneMission-wrap {
    box-sizing: border-box;
    padding: 0 20 / @size;
    width: 100%;
    height: 240 / @size;
    margin-top: 20 / @size;

    .oneMission-cont {
      background-color: #fff;
      border-top: 2px solid #02ac61;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 20 / @size;
      .title {
        height: 60 / @size;
        width: 100%;
        border-bottom: 1px solid #eee;
        p {
          width: 50%;
          height: 60 / @size;
          line-height: 60 / @size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
          font-family: Source Han Sans CN;
        }
        p:nth-child(1) {
          color: #323232;
          text-align: left;
          font-size: 24 / @size;
        }
        p:nth-child(2) {
          color: #a4a4a4;
          text-align: right;
          font-size: 20 / @size;
        }
      }
      .content {
        width: 100%;
        height: 120 / @size;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 20 / @size 0;
        p {
          height: 40 / @size;
          line-height: 40 / @size;
          color: #a4a4a4;
          font-size: 20 / @size;
        }
      }
      .btn {
        width: 100%;
        height: 60 / @size;
        text-align: center;
        p {
          width: 100%;
          height: 60 / @size;
          font-size: 24 / @size;
          line-height: 60 / @size;
          font-family: Source Han Sans CN;
          color: #02ac61;
        }
        i {
          font-size: 18 / @size;
          position: relative;
          padding: 2 / @size;
          left: -10 / @size;
          top: 2 / @size;
          border: 1px solid #02ac61;
          border-radius: 50%;
        }
      }
    }
  }
  .modify {
    border-top: 2px solid #ea5b72 !important;
    .btn {
      p {
        color: #ea5b72 !important;
      }
      i {
        border: 1px solid #ea5b72 !important;
      }
    }
  }
}
</style>