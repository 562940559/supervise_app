<template>
  <div class="needToDoWrap">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
    >
      <div 
        class="container-wrap"
        v-for="(item,index) in dataList"
        :key="index"
        @click="go(item.type,item.id)"
      >
        <div class="img-wrap">
          <img v-if="item.type == '我的任务'" src="../../../static/img/todo/wode.png" alt="">
          <img v-if="item.type == '督办审批'" src="../../../static/img/todo/duban.png" alt="">
          <img v-if="item.type == '分配任务'" src="../../../static/img/todo/fenpei.png" alt="">
          <img v-if="item.type == '归档任务'" src="../../../static/img/todo/guidang.png" alt="">
          <img v-if="item.type == '任务拟办'" src="../../../static/img/todo/niban.png" alt="">
          <img v-if="item.type == '配合任务'" src="../../../static/img/todo/peihe.png" alt="">
          <img v-if="item.type == '牵头任务'" src="../../../static/img/todo/qiantourenwu.png" alt="">
          <img v-if="item.type == '牵头审批'" src="../../../static/img/todo/qiantoushenpi.png" alt="">
          <img v-if="item.type == '审批'" src="../../../static/img/todo/shenpi.png" alt="">
          <img v-if="item.type == '指派任务拟办'" src="../../../static/img/todo/zprwNiban.png" alt="">
          <img v-if="item.type == '指派任务审核'" src="../../../static/img/todo/zprwShenhe.png" alt="">
          <img v-if="item.type == '指派任务归档'" src="../../../static/img/todo/zprwGuidang.png" alt="">
          <img v-if="item.type == '汇报指派任务'" src="../../../static/img/todo/zprwHuibao.png" alt="">
        </div>
        <div class="content-wrap">
          <p class="title">{{item.supervisoryItems}}</p>
          <p class="people">处理人：{{item.transactor}}</p>
        </div>
        <div class="another-wrap">
          <p>{{item.reportTime}}</p>
          <p><span>{{item.type}}</span></p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../utils/aes';
import * as SockJS from '../../../static/sockjs.js';
import { Stomp } from '../../../static/stomp.js';
import store from '../../store';
export default {
  data() {
    return {
      dataList: [],
      loading: false,
      finished: false,
      offset: 100,
      info: {
        current: 1
      }
    }
  },
  mounted() {
    this.getNoRead();
    this.connection();
    this.getTodoList();
  },
  methods: {
    getTodoList() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.info)),
      data = `"requestData": "${info}"`;
      this.$api.work.getTodoList(data)
      .then(res=>{
        if (res.code != '200') {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.info.current++;
        this.dataList = this.dataList.concat(res.pendingData);
        this.loading = false;
      })
    },
    go(type,id) {
      if(type == '我的任务') {
        return this.$router.push({ path: '/missionDetail',query: { id: id } })
      }if(type == '分配任务') {
        return this.$router.push({ path: '/missionDistributionDetail',query:{id: id,type: 'distribution'} })
      }if(type == '归档任务') {
        return this.$router.push({ path: '/fileMissionDetail',query: {id: id,type: 'todo'} })
      }if(type == '任务拟办') {
        this.$api.createTask.getInCompleteMissionDetail(id)
        .then(res=>{
          this.$router.push({ path: '/addTask',query: {item: res,id: id} })
        })
        return
      }if(type == '牵头审批') {
        return this.$router.push({ path: '/pendingApprovalDetail',query: {id: id,type: '牵头任务审批'} })
      }if(type == '督办审批') {
        return this.$router.push({ path: '/pendingApprovalDetail',query: {id: id,type: '督办任务审批'} })
      }if(type == '配合任务') {
        return this.$router.push({ path: '/coordinateReport' })
      }if(type == '确认指派任务') {
        return this.$router.push({ path: '/zprwFileMissionDetail',query: {id: id,type: 'todo'} })
      }if(type == '指派任务拟办') {
        this.$api.zprwCreateTask.getCompletedDetail(id)
        .then(res=>{
          this.$router.push({ path: '/addZprwNiBan',query: {item: res,id: id} })
        })
      }if(type == '汇报指派任务') {
        return this.$router.push({ path: '/zprwReport',query: {id: id,pageType: 'report'} })
      }if(type == '指派任务审核') {
        return this.$router.push({ path: '/zprwPendingApprovalDetail',query: { id: id } })
      }
    },
    onLoad() {
      this.getTodoList()
    },
    getNoRead() {
      var data = {
        account: localStorage.getItem("account")
      };
      this.$api.chat.getNoRead(data) //获取未读消息
      .then(res=>{
        if(JSON.stringify(res.unreadMessages) == '{}') {
          this.$store.commit('set_unReadLength', '');
          return
        }
        // 获取未读消息总数量
        var unreadMessagesLength = 0;
        for(var a in res.unreadMessages) {
          unreadMessagesLength = unreadMessagesLength + res.unreadMessages[a].length
        }
        this.$store.commit('set_unReadLength', unreadMessagesLength);
      })
    },
    connection() {
      // 建立连接对象
      let socket = new SockJS(this.$api.base.connectUrl);
      var that = this;
      var this_account = localStorage.getItem('account')
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 向服务器发起websocket连接
      this.stompClient.connect({userAccount:this_account},function() {
        //订阅单对单消息
        that.stompClient.subscribe('/chat/single/'+this_account, function(result) {
          that.$store.commit('unReadLengthUp',1)
        });
      },function errorCallBack(result) {
        console.log('失去在线聊天连接' + result);
      });
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    }, 
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
  },
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.needToDoWrap {
  min-height: 100%;
  padding-top: 80/@size;
  box-sizing: border-box;
  .container-wrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 10/@size 15/@size;
    border-bottom: 15/@size solid rgb(247,247,247);
    div{ 
      float: left;
    }
    .img-wrap {
      width: 75/@size;
      height: 65/@size;
      box-sizing: border-box;
      padding-right: 10/@size;
    }
    .img-wrap img {
      width: 65/@size;
      height: 65/@size;
    }
    .another-wrap {
      float: right;
      width: 120/@size;
      height: 65/@size;
      p:nth-child(1) {
        color: #7c7c7c;
        font-size: 18/@size;
        height: 35/@size;
        line-height: 35/@size;
        text-align: center;
      }
      p:nth-child(2) {
        background-color: #84dfb7;
        color: white;
        text-align: center;
        height: 30/@size;
        line-height: 30/@size;
        font-size: 16/@size;
        border-radius: 10/@size;
      }
    }
    .content-wrap {
      width: 300/@size;
      height: 65/@size;
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nrh-child(1) {
        height: 35/@size;
        line-height: 35/@size;
        font-size: 24/@size;
      }
      p:nth-child(2) {
        height: 30/@size;
        line-height: 35/@size;
        font-size: 20/@size;
        color: #7a7a7a;
      }
    }
  }
}
</style>