<template>
  <div class="mineWrap">
    <div class="topWrap">
      <p class="userHeadImg">{{formatUserHeadImg(userInfo.name)}}</p>
      <p>{{userInfo.name}}</p>
      <p style="color: #999999">{{userInfo.roleName}}</p>
    </div>
    <router-link to="/setting" class="optionWrap">
      <van-icon name="setting-o" />
      <p>设置</p>
      <img src="../../assets/img/mine/go.png" alt="前往">
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue';
import * as $api from '@/api';
import * as SockJS from '../../../static/sockjs.js';
import { Stomp } from '../../../static/stomp.js';
import store from '../../store';
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    formatUserHeadImg(name) {
      if(name) {
        if(name.length <= 2) {
          return name.substring(0, 2)
        }if(name.length == 3) {
          return name.substring(1,3)
        }if(name.length > 3) {
          return name.substring(2,4)
        }
      }
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
    getGroupChatUnRead() {
      // 获取群聊聊天未读
      this.$api.mailList.getGroupChatList()
      .then(res=>{
        // 获取群聊列表
        for(let a in res.groupDetail) {
          let groupId = res.groupDetail[a].id;
          this.$api.chat.getGroupChatNoRead(groupId) //获取未读消息
          .then(res=>{
            // 获取未读消息总数量
            var unreadMessagesLength = 0;
            unreadMessagesLength = unreadMessagesLength + res.unreadMessagesNumber
            if(res.unreadMessages[0] == undefined && !this.$store.state.unReadLength) {
              this.$store.commit('set_unReadLength', unreadMessagesLength);
            }else {
              unreadMessagesLength = unreadMessagesLength + this.$store.state.unReadLength
              this.$store.commit('set_unReadLength', unreadMessagesLength);
            }
          })
        }
        setTimeout(() => {
          if(this.$store.state.unReadLength == 0) {
            this.$store.commit('set_unReadLength', '');
          } 
        }, 500);
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

        that.$api.mailList.getGroupChatList()
        .then(res=>{
          that.groupChatList = res.groupDetail;
          for(let a in res.groupDetail) {
            let groupId = res.groupDetail[a].id
            that.stompClient.subscribe('/chat/group/'+groupId, function(result) {
              that.$store.commit('unReadLengthUp',1)
            })
          }
        })
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
  created() {
    this.$api.mine.getUserInfo()
      .then(res=>{
        this.userInfo = res;
      })
    this.getNoRead();
    this.getGroupChatUnRead();
    this.connection();
    localStorage.setItem('isIndex',true)
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
  },
}
</script>

<style lang="less" type="text/less">
@import '../../assets/less/common.less';
.mineWrap {
  width: 100%;
  min-height: 100%;
  position: relative;
  top: -10px;
  padding-top: 80/@size;
  box-sizing: border-box;
  background-color: rgb(249,249,251);
  .topWrap {
    width: 100%;
    height: 250/@size;
    background-color: white;
    box-sizing: border-box;
    padding-top: 30/@size;
    text-align: center;
    .userHeadImg {
      width: 100/@size;
      height: 100/@size;
      text-align: center;
      line-height: 100/@size;
      font-size: 30/@size;
      background-color: rgb(51,150,251);
      color: white;
      border-radius: 50%;
      margin: 0 auto;
    }
    p {
      font-size: 22/@size;
      height: 40/@size;
      line-height: 40/@size;
      color: #323232;
      font-family:Source Han Sans CN;
    }
  }
  .optionWrap {
    height: 100/@size;
    width: 100%;
    background-color: #fff;
    border-top: 10/@size solid #f7f7f7;
    box-sizing: border-box;
    padding: 0 20/@size;
    display: flex;
    align-items: center;
    i {
      font-size: 30/@size;
      color: rgb(0,156,255);
    }
    img:first-child {
      width: 40/@size;
      height: 40/@size;
    }
    img:nth-child(3) {
      width: 10/@size;
      height: 20/@size;
    }
    p {
      width: 100%;
      color: black;
      font-size: 24/@size;
      box-sizing: border-box;
      padding-left: 20/@size;
    }
  }
}
</style>