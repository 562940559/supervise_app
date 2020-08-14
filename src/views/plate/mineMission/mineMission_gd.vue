<template>
  <div class="mineMissionWrap">
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <p>
        <router-link style="color: #ABABAB"  to="/mineMission" replace>
          <span v-if="this.power.reviewPermissions">审核<b v-show="this.allNumber.auditNumber>0"></b></span>
        </router-link>
        <router-link style="color: #ABABAB" to="/mineMission_hb" replace>
          <span v-if="this.power.reportPermissions">汇报<b v-show="this.allNumber.reportNumber>0"></b></span>
        </router-link>
        <router-link to="/mineMission_gd" replace>
          <span v-if="this.power.filePermissions">归档<b v-show="this.allNumber.archiveNumber>0"></b></span>
        </router-link>
        <router-link style="color: #ABABAB" to="/mineMission_fp" replace>
          <span v-if="this.power.assignPermissions">分配<b v-show="this.allNumber.distributionNumber>0"></b></span>
        </router-link>
      </p>
    </div>
    <div 
      class="oneMission-wrap"
      v-for="(item,index) in mineMissionList"
      :key="index"
    >
      <div class="oneMission-cont">
        <div class="title">
          <p>{{item.supervisoryItems}}</p>
          <p>{{item.reportTime}}</p>
        </div>
        <div class="content">
          <p>汇报截止时间：{{item.endTime}}</p>
          <p>任务来源：{{item.source}}</p>
        </div>
        <div @click="goGdDetail(item.id,'todo',item.type)" class="btn">
          <p>归档</p>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <van-divider>无更多信息</van-divider>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      mineMissionList: '',
      power: '',
      allNumber: {
        auditNumber: '', // 待审核数量
        reportNumber: '', //待汇报数量
        distributionNumber: '', //待分配数量
        archiveNumber: '', //待归档数量
      }
    }
  },
  methods: {
    routerBack() {
      this.$router.push('/')
    },
    goGdDetail(id,type,asd) {
      if(asd == '归档任务') {
        this.$router.push({path: '/fileMissionDetail',query: {id: id,type: type}})
        return
      }else if(asd == '确认指派任务') {
        this.$router.push({path: '/zprwFileMissionDetail',query: {id: id,type: type}})
        return
      }
    }
  },
  created() {
    this.$api.mineMission.getMineMissionList_gd()
    .then(res=>{
      this.mineMissionList = res.archiveData;
    })
    this.$api.work.getMineMissionPower() // 获取我的任务权限
    .then(res=>{
      this.power = res;
    }),
    this.$api.work.getWorkCount()
    .then(res=>{
      this.allNumber = res.myTaskNum;
    })
    localStorage.setItem('isIndex',false)
  },
  mounted() {
    
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.mineMissionWrap {
  padding-top: 80/@size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  .top-wrap {
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
    font-family: SourceHanSansCN;
    font-size: 18/@size;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20/@size;
    position: fixed;
    z-index: 9999;
    top: 0;
    .return-btn {
      font-size: 28/@size;
      float: left;
      i {
        position: relative;
        top: 5/@size;
      }
    }
    a {
      color: #323232;
    }
    p {
      width: 100%;
      float: left;
      text-align: center;
      font-size: 24/@size;
      span {
        margin: 0 10/@size;
        position: relative;
        b {
          width: 12/@size;
          height: 12/@size;
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
    padding: 0 20/@size;
    width: 100%;
    height: 240/@size;
    margin-top: 20/@size;
    
    .oneMission-cont {
      background-color: #fff;
      border-top: 2px solid #EC6941;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 20/@size;
      .title {
        height: 60/@size;
        width: 100%;
        border-bottom: 1px solid #eee;
        p {
          width: 50%;
          height: 60/@size;
          line-height: 60/@size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
          font-family:Source Han Sans CN;
        }
        p:nth-child(1) {
          color: #323232;
          text-align: left;
          font-size: 24/@size;
        }
        p:nth-child(2) {
          color: #A4A4A4;
          text-align: right;
          font-size: 20/@size;
        }
      }
      .content {
        width: 100%;
        height: 120/@size;
        box-sizing: border-box;
        padding: 20/@size 0;
        border-bottom: 1px solid #eee;
        p {
          height: 40/@size;
          line-height: 40/@size;
          color: #A4A4A4;
          font-size: 20/@size;
        }
      }
      .btn {
        width: 100%;
        height: 60/@size;
        text-align: center;
        p {
          width: 100%;
          height: 60/@size;
          font-size: 24/@size;
          line-height: 60/@size;
          font-family:Source Han Sans CN;
          color: #EC6941;
        }
        i {
          font-size: 18/@size;
          position: relative;
          padding: 2/@size;
          left: -10/@size;
          top: 2/@size;
          border: 1px solid #EC6941;
          border-radius: 50%;
        }
      }
    }
  }
}

</style>