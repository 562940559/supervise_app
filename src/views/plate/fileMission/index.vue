<template>
  <div class="takeLeadWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span class="setting-btn"></span>
    </div>
    <van-tabs @click="onclick" v-model="active">
      <van-tab title="待我归档">
        <div class="containerWrap">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="offset"
          >
          <div 
            class="contentWrap"
            v-for="(item,index) in todo"
            :key="index"
            @click="goDetail(item.id,'todo')"
          >
            <div class="titleWrap">
              <p>{{item.supervisoryItems}}</p>
              <p>{{item.createTime}}</p>
            </div>
          </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="我已归档">
        <div class="containerWrap">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="offset"
          >
          <div 
            class="contentWrap"
            v-for="(item,index) in done"
            :key="index"
            @click="goDetail(item.id,'done')"
          >
            <div class="titleWrap">
              <p>{{item.supervisoryItems}}</p>
              <p>{{item.createTime}}</p>
            </div>
          </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog,Toast } from 'vant';
import * as $api from '@/api';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      active: '0',
      todo: [],
      done: [],
      loading: false,
      finished: false,
      offset: 100,
      info: {
        current: 1
      }
    }
  },
  methods: {
    routerBack() {
      this.$router.replace('/');
    },
    goDetail(id,type) {
      this.$router.push({path: '/fileMissionDetail',query: {id: id,type: type}})
    },
    getTodo() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.info)),
      data = `"requestData": "${info}"`;
      this.$api.fileMission.getFileMission(data)
      .then(res=>{
        if (res.archiveds[0] == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.info.current++;
        this.todo = this.todo.concat(res.archiveds);
        this.loading = false;
      })
    },
    getDone() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.info)),
      data = `"requestData": "${info}"`;
      this.$api.fileMission.getDoneFileMission(data)
      .then(res=>{
        if (res.unfileds[0] == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.info.current++;
        this.done = this.done.concat(res.unfileds);
        this.loading = false;
      })
    },
    onclick(name,title) {
      this.info.current = 1;
      this.done = [];this.todo = [];
      this.onLoad()
    },
    onLoad() {
      if(this.active == '0') {
        this.getTodo()
      }else if(this.active == '1'){
        this.getDone()
      }
    }
  },
  mounted() { //获取列表信息
    this.getTodo();
  }
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.takeLeadWrap {
  // vant的tab样式修改
  .van-tabs,.van-tabs--line {
    z-index: 999!important;
    position: relative;
    top: 75/@size;
  }
  .van-tabs__nav--line {
    background-color: #02ac61;
  }
  .van-tab, .van-tag--large {
    font-size: 22/@size;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 80/@size;
  }
  .van-tab {
    line-height: 80/@size;
    color: #82d88f;
  }
  .van-tab--active {
    color: white;
  }
  .van-tabs__line {
    background-color: white;
    bottom: 16px;
    height: 2px;
  }
  .van-tabs__content {
    position: relative;
    top: 80/@size;
  }
  // vant的swiper-cell样式修改
  .van-cell,.van-panel__header {
    padding: 20/@size 10/@size;
  }
  .van-cell__title,.van-panel__header-value {
    font-size: 20/@size;
  }
  .van-panel__header-value>span {
    padding: 0 10/@size;
    border-radius: 10/@size;
  }
  .van-panel,.van-cell-group,.van-cell { background: none; }
  .van-swipe-cell__right>.van-button {
    width: 80px;
    height: 100/@size;
    font-size: 20/@size;
  }
  .van-cell__label { font-size: 16/@size; }
  .success .van-panel__header-value>span {
    color: #02ac61;
    background-color: #dcf7e4;
  }
  .unSuccess .van-panel__header-value>span {
    color: #ff0000;
    background-color: #f8c3c3;
  }
}
</style>
<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.takeLeadWrap {
  height: 100%;
  background-color: #f7f7f7;
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    width: 100%;
    height: 80/@size;
    background-color: #02ac61;
    color: white;
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
      font-size: 34/@size;
      width: 150/@size;
      text-align: right;
      position: relative;
      top: 5/@size;
      a {
        color: white;
      }
    }
  }
  .containerWrap {
    position: relative;
    top: -80/@size;
    background: white;
    .contentWrap {
      width: 100%;
      height: 100/@size;
      border-bottom: 10/@size solid #f7f7f7;
      .titleWrap {
        width: 100%;
        height: 100/@size;
        box-sizing: border-box;
        padding:0 20/@size;
        border-bottom: 1px solid #e5e5e5;
        p {
          width: 85%;
          height: 60/@size;
          line-height: 60/@size;
          color: #000;
          font-size: 24/@size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:last-child {
          height: 40/@size;
          line-height: 40/@size;
          color: #7a7a7a;
          font-size: 20/@size;
        }
      }
    }
  }
}
</style>