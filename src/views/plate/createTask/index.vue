<template>
  <div class="createTaskWrap">
    <div class="imgSwipeWrap">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="title">
      <p>督查督办</p>
    </div>
    <div class="all-wrap">
      <div @click="go('supervisedTasksProposed')" class="one-wrap">
        <img src="../../../../static/img/createTask/duban.png" alt="">
        <p>督办任务<span>新任务的汇报</span></p>
      </div>
      <div @click="go('assignment')" class="one-wrap">
        <img src="../../../../static/img/createTask/zhipai.png" alt="">
        <p>指派任务<span>根据内容进行汇报</span></p>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="title" style="background-color: #fbfbf8;">
      <p>数据查询</p>
    </div>
    <div class="all-wrap">
      <div @click="go('addQueryApply')" class="one-wrap">
        <img src="../../../../static/img/createTask/chaxun.png" alt="">
        <p>查询申请<span>新增/修改数据查询</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Toast } from 'vant';
export default {
  data() {
    return {
      images: [
        './static/img/index/bannar3.png',
        './static/img/index/bannar1.png',
        './static/img/index/bannar2.png',
      ],
      power: ''
    }
  },
  methods: {
    getPower() {
      this.$api.work.getWorkCount()
      .then(res=>{
        this.power = res.permissionMap;
      })
    },
    go(where) {
      if(where == 'addQueryApply') {
        this.$router.push('/addQueryApply')
      }
      if(this.power[where]) {
        if(where == 'supervisedTasksProposed') {
          this.$router.push('/addTask')
        }else if(where == 'assignment') {
          this.$router.push('/addZprwNiBan')
        }
      }
      if(!this.power[where] && where != 'addQueryApply') {
        Toast('请联系管理员')
      }
      
    }
  },
  mounted() {
    
  },
  created() {
    this.getPower();
    localStorage.setItem('isIndex',false)
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.createTaskWrap {
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 80/@size;
  background-color: rgb(251,251,248);
  .imgSwipeWrap {
    width: 100%;
    padding: 0 20/@size;
    height: 240/@size;
    box-sizing: border-box;
    background-color: #fff;
    img {
      width: 100%;
      height: 240/@size;
    }
  }
  .title {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20/@size;
    background-color: #fff;
    p {
      line-height: 60/@size;
      height: 60/@size;
      font-size: 24/@size;
      color: #323232;
      font-family: '微软雅黑'
    }
  }
  .all-wrap {
    width: 100%;
    padding: 10/@size 20/@size;
    box-sizing: border-box;
    .one-wrap {
      width: 255/@size;
      height: 130/@size;
      background-color: #fff;
      box-sizing: border-box;
      padding: 30/@size 10/@size;
      img {
        width: 70/@size;
        height: 70/@size;
        float: left;
        margin-right: 10/@size;
      }
      p {
        box-sizing: border-box;
        font-size: 24/@size;
        height: 80/@size;
        padding-top: 5/@size;
        font-family:SourceHanSansCN;
        span {
          color: #BABABA;
          font-size: 18/@size;
          display: inline-block;
          max-width: 2rem;
          overflow: hidden;
        }
      }
    }
    .one-wrap:nth-child(1) {
      float: left;
    }
    .one-wrap:nth-child(2) {
      float: right;
    }
  }
}
</style>