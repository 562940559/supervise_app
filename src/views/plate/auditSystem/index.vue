<template>
  <div class="auditSystemWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="goIndex()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span @click="goOther('auditSystemFilter')" class="setting-btn">
        筛选 
        <van-icon name="filter-o" />
      </span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
    >
      <!-- 内容部分 -->
      <div 
        class="contentWrap"
        v-for="(item,index) in dataList"
        :key="index"
      >
        <div 
          class="left-wrap"
        >
          <p class="title">{{item.projectName}}</p>
          <p>开始竣工时间：{{item.actualStartTime}} - {{item.actualCompletionTime}}</p>
          <p>项目业主：{{item.projectOwners}}</p>
          <p>审计方式：{{item.auditApproach}}</p>
          <p>审计费用：{{item.reportAuditFee == '' ? '暂无' : item.reportAuditFee}}</p>
          <p>中介机构：{{item.intermediaryName == '' ? '暂无' : item.intermediaryName}}</p>
          <p @click="getPhone(item.contactNumberOwner)"><van-icon name="phone-o" />{{item.contactNumberOwner == '' ? '暂无' : item.contactNumberOwner}}</p>
        </div>
        <div class="right-wrap">
          <p @click="goOther('auditSystemDetail',item.id,item.auditApproach)" class="detail-btn">详情</p>  
        </div>
        <div style="clear: both;"></div>
        <div class="bottom-wrap">
          <p>项目状态：<span>{{item.status}}</span></p>
          <p>项目类型：{{item.projectType}}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    </van-list>
  </div>
</template>

<script>
var refreshFlag = true;
import * as $api from '@/api';
import aes from '../../../utils/aes';
import { Dialog } from 'vant';
export default {
  data() {
    return {
      dataList: [],
      loading: false,
      finished: false,
      offset: 100,
      form: {
        current: 1, //页码
        limit: 10, //每页条数
        projectName: '', //项目名称
        projectOwners: '', //项目业主
        projectType: '', //项目类型
        status: '', //审计项目阶段状态
        status2: '', //审计项目具体状态
        auditApproach: '', //审计方式
        chooseIntermediaryOrgan: '', //中介机构
      }
    }
  },
  created() {
    localStorage.setItem('isIndex',false)
  },
  methods: {
    routerBack() {
      this.$router.back('-1')
    },
    goIndex() {
      this.$router.push('/')
    },
    goOther(where,id,type) {
      var id = id;
      this.$router.push({path:`/${where}`,query: {id: id,type: type}})
    },
    onLoad() {
      this.getList();
    },
    getPhone(phone) {
      if(phone == '') { return }
      Dialog.confirm({
        title: '拨打电话',
        message: `确认要拨打电话给${phone}吗？`
      }).then(() => {
        if (window.plus) {
          plus.device.dial(phone, true);
        }else {
          console.log(phone)
        }
      }).catch(() => {
      });
    },
    getList() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.form)),
      data = `"requestData": "${info}"`;
      this.$api.auditSystem.getAuditList(data)
      .then(res=>{
        if (JSON.stringify(res.data[0]) == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.form.current++;
        this.dataList = this.dataList.concat(res.data);
        this.loading = false;
      })
    }
  },
  mounted() {

  },
  beforeRouteEnter (to, from, next) {
    if (from.name === '工作页面' || from.name === '审计项目筛选页面') {
      refreshFlag = true
    } else {
      refreshFlag = false
    }
    next()
  },
  activated() {
    localStorage.setItem('isIndex',false)
    if(refreshFlag) {
      //如果从主页跳转过来则重置数据，其他页面跳转过来不变，避免用户输入信息丢失
      if(this.$route.query.newData) {
        this.form = this.$route.query.newData;
      }else {
        this.form = {
          current: 1, //页码
          limit: 10, //每页条数
          projectName: '', //项目名称
          projectOwners: '', //项目业主
          projectType: '', //项目类型
          status: '', //审计项目阶段状态
          status2: '', //审计项目具体状态
          auditApproach: '', //审计方式
          chooseIntermediaryOrgan: '', //中介机构
        };
      }
      this.dataList = [];
      this.onLoad();
    }
  },
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
// 对vant样式进行修改
.van-list {
  padding-top: 80/@size;
}
</style>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.auditSystemWrap {
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
    font-size: 18/@size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20/@size;
    z-index: 99999;
    .return-btn {
      font-size: 28/@size;
      width: 150/@size;
      i {
        position: relative;
        top: 5/@size;
      }
      .text {
        position: relative;
        left: -10/@size;
      }
    }
    .route-title {
      font-size: 32/@size;
      text-align: center;
    }
    .setting-btn {
      font-size: 22/@size;
      font-weight: 400;
      width: 150/@size;
      text-align: right;
      position: relative;
      top: 2/@size;
      i {
        top: 2/@size;
        font-size: 24/@size;
      }
      a {
        color: white;
      }
    }
  }
  .contentWrap {
    width: 100%;
    box-sizing: border-box;
    padding-top: 15/@size;
    .left-wrap {
      width: 80%;
      box-sizing: border-box;
      padding-left: 20/@size;
      float: left;
      p {
        color: #9c9c9c;
        font-size: 18/@size;
        margin: 15/@size 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        i {
          color: #686868;
          font-size: 22/@size;
          position: relative;
          top: 5/@size;
        }
      }
      .title {
        font-size: 24/@size;
        color: #000;
        width: 95%;
        height: 30/@size;
        line-height: 30/@size;
      }
    }
    .right-wrap {
      width: 20%;
      padding-right: 20/@size;
      padding-top: 10/@size;
      box-sizing: border-box;
      float: left;
      .detail-btn {
        width: 100%;
        height: 50/@size;
        border-radius: 15/@size;
        line-height: 50/@size;
        color: white;
        text-align: center;
        font-size: 26/@size;
        background-color: #6adac9;
      }
    }
    .bottom-wrap {
      width: 100%;
      height: 40/@size;
      line-height: 40/@size;
      background-color: #f6fafe;
      box-sizing: border-box;
      padding: 0 20/@size;
      p {
        float: left;
        width: 50%;
        color: #000;
        font-size: 18/@size;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        span {
          color: #ff955b;
        }
      }
    }
  }
}
</style>