<template>
  <div class="mineMissionWrap">
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <p>
        <router-link to="/mineMission" replace>
          <span v-if="this.power.reviewPermissions">
            审核
            <b v-show="this.allNumber.auditNumber>0"></b>
          </span>
        </router-link>
        <router-link style="color: #ABABAB" to="/mineMission_hb" replace>
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
      <div class="oneMission-cont">
        <div class="title" v-if="item.type != '数据查询申请审核'">
          <p>{{item.supervisoryItems}}</p>
          <p>{{item.reportTime}}</p>
        </div>
        <div class="content" v-if="item.type != '数据查询申请审核'">
          <p>发起人：{{item.transactor}}</p>
          <p>开始截止时间：{{item.startTime}}-{{item.endTime}}</p>
          <p>任务来源：{{item.source}}</p>
        </div>
        <div class="title" v-if="item.type == '数据查询申请审核'">
          <p>{{item.applicant}}发起的数据查询申请审核</p>
          <p>{{item.reportTime}}</p>
        </div>
        <div class="content" v-if="item.type == '数据查询申请审核'">
          <p>发起人：{{item.applicant}}</p>
          <p>申请部门：{{item.applyDept}}</p>
          <p>查询需求：{{item.dataRequirements}}</p>
        </div>
        <div class="btn" v-if="item.status == '待确认'">
          <p @click="goSure(item.id)">确认</p>
        </div>
        <div class="btn" v-else>
          <p @click="goShDetail(item.id,item.type)">审核</p>
        </div>
      </div>
    </div>
    <div style="padding: 20px 0;">
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
    goShDetail(id, type) {
      if (type == "督办审批") {
        return this.$router.push({
          path: "/pendingApprovalDetail",
          query: { id: id, type: "督办任务审批" }
        });
      } else if (type == "审批") {
        return this.$router.push({
          path: "/pendingApprovalDetail",
          query: { id: id, type: "承办任务审批" }
        });
      } else if (type == "牵头审批") {
        return this.$router.push({
          path: "/pendingApprovalDetail",
          query: { id: id, type: "牵头任务审批" }
        });
      } else if (type == "指派任务审核") {
        return this.$router.push({
          path: "/zprwPendingApprovalDetail",
          query: { id: id }
        });
      } else if (type == "数据查询申请审核") {
        if (localStorage.getItem("this_name") == "刘洋") {
          // 判断是否是审计中心领导
          return this.$router.push({
            path: "/centerQueryApproval",
            query: { id: id }
          });
        } else {
          return this.$router.push({
            path: "/dataQueryApproval",
            query: { id: id }
          });
        }
      }
    },
    goSure(id) {
      this.$router.push({path: '/feedbackDetails',query:{id:id}})
    }
  },
  created() {
    this.$api.mineMission.getMineMissionList_sh().then(res => {
      console.log(res);
      this.mineMissionList = res.auditData;
    });
    this.$api.work
      .getMineMissionPower() // 获取我的任务权限
      .then(res => {
        this.power = res;
      });
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
      border-top: 2px solid #00a0e9;
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
          font-size: 22 / @size;
        }
        p:nth-child(2) {
          color: #a4a4a4;
          text-align: right;
          font-size: 18 / @size;
        }
      }
      .content {
        width: 100%;
        height: 120 / @size;
        border-bottom: 1px solid #eee;
        p {
          height: 40 / @size;
          line-height: 40 / @size;
          color: #a4a4a4;
          font-size: 20 / @size;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
          color: #58a2ef;
          font-family: Source Han Sans CN;
        }
        i {
          font-size: 18 / @size;
          position: relative;
          padding: 2 / @size;
          left: -10 / @size;
          top: 0 / @size;
          border: 1px solid #58a2ef;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>