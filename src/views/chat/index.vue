<template>
  <div class="chatListWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="route-title">{{$route.meta.title}}</span>
      <van-icon name="add-o" @click="addGroupChat()" />
    </div>
    <div class="searchInput-wrap">
      <van-icon name="search" /><input type="text" readonly @click="goSearch()" placeholder="请输入关键字">
    </div>
    <div class="sec-department">
      <div class="img-wrap">
        <img style="width: 54%;height: 35%;" src="../../../static/img/mailList/groupChat.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-cell
          :title="'群聊'+' ( '+groupChatNumber+' ) '" 
          is-link 
          @click="goGroupChatList()"
        />
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="oneChat"
      v-for="(item,index) in this.dataList"
      :key="index"
      @click="goDetail(item[item.length-1])"
    >
      <div class="imgWrap">
        <p class="userHeadImg" v-show="item[item.length-1].targetType == 'person'">{{formatUserHeadImg(item[item.length-1].sender)}}</p>
        <p class="userHeadImg" v-show="item[item.length-1].targetType == 'group'"><van-icon name="friends" /></p>
        <span v-if="!item[item.length-1].haveRead">{{item.length}}</span>
      </div>
      <div class="textWrap">
        <div class="line-one">
          <span v-show="item[item.length-1].targetType == 'person'">{{item[item.length-1].sender}}</span>
          <span v-show="item[item.length-1].targetType == 'group'">{{item[item.length-1].groupName}}</span>
          <b>{{item[item.length-1].sendTime}}</b>
        </div>
        <div class="line-two">
          <span v-show="item[item.length-1].targetType == 'group' && item[item.length-1].sender != '' && item[item.length-1].senderAccount != account">{{item[item.length-1].sender+' ： '}}</span>
          <span v-show="item[item.length-1].type == '0'">{{item[item.length-1].content}}</span>
          <span v-show="item[item.length-1].type == '2'">[图片]</span>
          <span v-show="item[item.length-1].type == '1'">[文件]</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import * as SockJS from '../../../static/sockjs.js';
import { Stomp } from '../../../static/stomp.js';
import store from '../../store';
import aes from '../../utils/aes.js';
export default {
  data () {
    return {
      dataList: [],
      now: '',
      account: localStorage.getItem('account'),
      groupChatNumber: ''
    }
  },
  methods: {
    addGroupChat() {
      this.$router.push('/addGroupChat')
    },
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
    goSearch() {
      this.$router.push('/searchMail')
    },
    judgeTime() {
      //今天的时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var Hours = date.getHours();
      var Minutes = date.getMinutes();
      var Seconds = date.getSeconds();

      if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
      }
      if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
      }
      if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + Hours + seperator2 + Minutes
      + seperator2 + Seconds;
      let item = this.dataList;
      for(let a in item) {
        //获取最新一条消息的时间进行判断
        let sendTime = item[a][item[a].length-1].sendTime.substring(0, 10);
        let sendTime_day = item[a][item[a].length-1].sendTime.substring(6,10);
        let sendTime_time = item[a][item[a].length-1].sendTime.substring(11,16);
        if(new Date(sendTime).getTime() - new Date(currentdate.substring(0, 10)).getTime() == 0){
          item[a][item[a].length-1].sendTime = sendTime_time
        }else{
          item[a][item[a].length-1].sendTime = sendTime_day
        }
        if(aes.decrypt(item[a][item[a].length-1].content) == '') {
          
        }else {
          item[a][item[a].length-1].content = aes.decrypt(item[a][item[a].length-1].content)
        }
        
      }
    },
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var Hours = date.getHours();
      var Minutes = date.getMinutes();
      var Seconds = date.getSeconds();

      if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
      }
      if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
      }
      if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + Hours + seperator2 + Minutes
      + seperator2 + Seconds;
      return currentdate
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
          var result = JSON.parse(result.body);
          let thisItem1;
          that.now = that.getTime();
          if(result.type == '0') {
            // 如果对方传输的是文字
            thisItem1 = [{
              haveRead: 0,
              content: result.content,
              receiver: result.receiver,
              recipientAccount: result.recipientAccount,
              sendTime: that.now,
              sender: result.sender,
              senderAccount: result.senderAccount,
              type: '0',
              targetType: 'person'
            }]
          }if(result.type == '1') {
            // 如果对方传输的是图片
            thisItem1 = [{
              haveRead: 0,
              content: '[文件]',
              receiver: result.receiver,
              recipientAccount: result.recipientAccount,
              sendTime: that.now,
              sender: result.sender,
              senderAccount: result.senderAccount,
              type: '1',
              targetType: 'person'
            }]
          }if(result.type == '2') {
            // 如果对方传输的是图片
            thisItem1 = [{
              haveRead: 0,
              content: '[图片]',
              receiver: result.receiver,
              recipientAccount: result.recipientAccount,
              sendTime: that.now,
              sender: result.sender,
              senderAccount: result.senderAccount,
              type: '2',
              targetType: 'person'
            }]
          }
          var evenItem1 = JSON.parse(localStorage.getItem('list'))
          if(JSON.stringify(evenItem1) == '{}' || evenItem1[result.sender] == undefined) {
            evenItem1[result.sender] = thisItem1;
          }else if(evenItem1 == null){
            evenItem1 = {};
            evenItem1[result.sender] = thisItem1;
          }else if(evenItem1[result.sender][evenItem1[result.sender].length - 1].haveRead == 0) {
            evenItem1[result.sender] = evenItem1[result.sender].concat(thisItem1)
          }else {
            evenItem1[result.sender] = thisItem1;
          }
          that.$store.commit('unReadLengthUp',1)
          localStorage.setItem('list',JSON.stringify(evenItem1))
          that.dataList = JSON.parse(localStorage.getItem('list'))
          that.judgeTime();
        });

        // 获取用户所有群聊
        // 根据群聊数量遍历订阅
        that.$api.mailList.getGroupChatList()
        .then(res=>{
          that.groupChatList = res.groupDetail;
          for(let a in res.groupDetail) {
            let groupId = res.groupDetail[a].id
            that.stompClient.subscribe('/chat/group/'+groupId, function(result) {
              var result = JSON.parse(result.body);
              let thisItem1;
              that.now = that.getTime();
              if(result.type == '0') {
                // 如果对方传输的是文字
                thisItem1 = [{
                  haveRead: 0,
                  content: result.content,
                  sendTime: that.now,
                  sender: result.sender,
                  senderAccount: result.senderAccount,
                  type: '0',
                  targetType: 'group',
                  id: result.groupId,
                  groupName: result.groupName,
                  groupNumber: result.groupNumber
                }]
              }if(result.type == '1') {
                // 如果对方传输的是图片
                thisItem1 = [{
                  haveRead: 0,
                  content: '[文件]',
                  sendTime: that.now,
                  sender: result.sender,
                  senderAccount: result.senderAccount,
                  type: '1',
                  targetType: 'group',
                  id: result.groupId,
                  groupName: result.groupName,
                  groupNumber: result.groupNumber
                }]
              }if(result.type == '2') {
                // 如果对方传输的是图片
                thisItem1 = [{
                  haveRead: 0,
                  content: '[图片]',
                  sendTime: that.now,
                  sender: result.sender,
                  senderAccount: result.senderAccount,
                  type: '2',
                  targetType: 'group',
                  id: result.groupId,
                  groupName: result.groupName,
                  groupNumber: result.groupNumber
                }]
              }
              let evenItem1 = JSON.parse(localStorage.getItem('list'))
              if(JSON.stringify(evenItem1) == '{}' || evenItem1['groupId'+result.groupId] == undefined) {
                evenItem1['groupId'+result.groupId] = thisItem1;
              }if(evenItem1 == null){
                evenItem1 = {};
                evenItem1['groupId'+result.groupId] = thisItem1;
              }if(evenItem1['groupId'+result.groupId][0].haveRead == 0) {
                evenItem1['groupId'+result.groupId] = evenItem1['groupId'+result.groupId].concat(thisItem1)
              }else{
                evenItem1['groupId'+result.groupId] = thisItem1;
              }
              that.$store.commit('unReadLengthUp',1)
              localStorage.setItem('list',JSON.stringify(evenItem1))
              that.dataList = JSON.parse(localStorage.getItem('list'))
              that.judgeTime();
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
    },  // 断开连接
    getNoRead() {
      // 获取单对单聊天未读
      var data = {
        account: localStorage.getItem("account")
      };
      this.$api.chat.getNoRead(data) //获取未读消息
      .then(res=>{
        if(JSON.parse(localStorage.getItem('list')) == undefined) {
          var locals = {};
          locals = res.unreadMessages
        }else {
          var locals = JSON.parse(localStorage.getItem('list'))
        }
        for(var a in res.unreadMessages) {
          locals[a] = res.unreadMessages[a]
          locals[a][locals[a].length-1]['targetType'] = 'person'
        }
        // 获取未读消息总数量
        var unreadMessagesLength = 0;
        for(var a in res.unreadMessages) {
          unreadMessagesLength = unreadMessagesLength + res.unreadMessages[a].length
        }
        if(JSON.stringify(res.unreadMessages) == '{}') {
          this.$store.commit('set_unReadLength', '');
        }else {
          this.$store.commit('set_unReadLength', unreadMessagesLength);
        }
        localStorage.setItem('list',JSON.stringify(locals))
        this.dataList = JSON.parse(localStorage.getItem('list'))
        this.judgeTime();
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
            if(res.unreadMessages[0] == undefined && this.$store.state.unReadLength == 0) {
              this.$store.commit('set_unReadLength', '');
            }
            else {
              if(JSON.parse(localStorage.getItem('list')) == undefined) {
                var locals = {};
              }else {
                var locals = JSON.parse(localStorage.getItem('list'))
              }
              locals['groupId'+groupId] = res.unreadMessages
              let thisItem1 = {
                haveRead: 0,
                content: res.unreadMessages[res.unreadMessages.length-1].content,
                sendTime: res.unreadMessages[res.unreadMessages.length-1].sendTime,
                sender: res.unreadMessages[res.unreadMessages.length-1].sender,
                senderAccount: res.unreadMessages[res.unreadMessages.length-1].senderAccount,
                type: '0',
                targetType: 'group',
                id: res.unreadMessages[res.unreadMessages.length-1].groupId,
                groupName: res.unreadMessages[res.unreadMessages.length-1].groupName,
              }
              let thisItem2 = {
                haveRead: 0,
                content: '[文件]',
                sendTime: res.unreadMessages[res.unreadMessages.length-1].sendTime,
                sender: res.unreadMessages[res.unreadMessages.length-1].sender,
                senderAccount: res.unreadMessages[res.unreadMessages.length-1].senderAccount,
                type: '1',
                targetType: 'group',
                id: res.unreadMessages[res.unreadMessages.length-1].groupId,
                groupName: res.unreadMessages[res.unreadMessages.length-1].groupName,
              }
              let thisItem3 = {
                haveRead: 0,
                content: '[图片]',
                sendTime: res.unreadMessages[res.unreadMessages.length-1].sendTime,
                sender: res.unreadMessages[res.unreadMessages.length-1].sender,
                senderAccount: res.unreadMessages[res.unreadMessages.length-1].senderAccount,
                type: '2',
                targetType: 'group',
                id: res.unreadMessages[res.unreadMessages.length-1].groupId,
                groupName: res.unreadMessages[res.unreadMessages.length-1].groupName,
              }
              for(let a in res.unreadMessages) {
                if(res.unreadMessages[a].type == '0') {
                  locals['groupId'+groupId][a] = thisItem1
                }else if(res.unreadMessages[a].type == '1') {
                  locals['groupId'+groupId][a] = thisItem2
                }else if(res.unreadMessages[a].type == '2') {
                  locals['groupId'+groupId][a] = thisItem3
                }else if(res.unreadMessages[a].type == '4') {
                  locals['groupId'+groupId][a] = thisItem2
                }
              }
              // 获取未读消息总数量
              var unreadMessagesLength = 0;
              unreadMessagesLength = unreadMessagesLength + res.unreadMessagesNumber
              unreadMessagesLength = unreadMessagesLength + this.$store.state.unReadLength
              this.$store.commit('set_unReadLength', unreadMessagesLength);
              localStorage.setItem('list',JSON.stringify(locals))
              this.dataList = JSON.parse(localStorage.getItem('list'))
              this.judgeTime();
            }
          })
        }
      })
    },
    goDetail(items) {
      if(items.targetType == 'person') {
        items['name'] = items.sender;
        if(items['userAccount'] == undefined) {
          items['userAccount'] = items.senderAccount;
        }
        localStorage.setItem('currentPersonChatInfo',JSON.stringify(items))
        this.$router.push('/chatDetail')
      }if(items.targetType == 'group') {
        localStorage.setItem('this_groupChatInfo',JSON.stringify(items))
        this.$router.push({path: '/groupChatDetail',query: {item: items}})
      }
    },
    goGroupChatList() {
      this.$router.push('/groupChatList')
    },
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
  },
  mounted(){
    this.getNoRead();
    this.getGroupChatUnRead();
    this.connection();
  },
  created() {
    localStorage.setItem('isIndex',true)
    this.$api.mailList.getGroupChatList()
    .then(res=>{
      this.groupChatNumber = res.groupDetail.length
    })
  }
}
</script>

<style lang="less" type="text/less">
.searchInput-wrap {
  .van-collapse-item__content {
    padding: 10px 0;
  }
}
</style>
<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.top-wrap {
  width: 100%;
  height: 80/@size;
  background-color: white;
  color: #323232;
  font-family: SourceHanSansCN;
  font-size: 18/@size;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20/@size;
  position: fixed;
  top: 0;
  z-index: 9999;
  .route-title {
    font-size: 30/@size;
    text-align: left;
    font-family: Source Han Sans CN;
  }
  i {
    font-size: 34/@size;
  }
}
.searchInput-wrap {
  width: 100%;
  height: 80/@size;
  padding: 10/@size 20/@size 20/@size 20/@size;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  top: 80/@size;
  -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
  -moz-box-shadow:0px 3px 3px #c8c8c8 ;
  box-shadow:0px 3px 3px #c8c8c8 ;
  z-index: 999;
  input {
    border: none;
    font-size: 20/@size;
    width: 100%;
    height: 50/@size;
    line-height: 50/@size;
    text-align: center;
    background-color: rgb(249,249,249);
    border-radius: 15px;
  }
  i {
    position: absolute;
    left: 25/@size;
    font-size: 20/@size;
    top: 25/@size;
  }
} 
.chatListWrap {
  width: 100%;
  min-height: 100%;
  padding-bottom: 88/@size;
  background-color: white;
  box-sizing: border-box;
  padding-top: 160/@size;
  .oneChat:last-child {
    .textWrap {
      border-bottom: none;
    }
  }
  .oneChat {
    width: 100%;
    height: 110/@size;
    background-color: #fff;
    .imgWrap {
      height: 110/@size;
      float: left;
      width: 20%;
      box-sizing: border-box;
      padding: 20/@size 0;
      text-align: center;
      position: relative;
      .userHeadImg {
        width: 70/@size;
        height: 70/@size;
        text-align: center;
        line-height: 70/@size;
        font-size: 24/@size;
        background-color: rgb(51,150,251);
        color: white;
        border-radius: 50%;
        margin: 0 auto;
        i {
          position: relative;
          top: 6/@size;
          font-size: 28/@size;
        }
      }
      span {
        width: 30/@size;
        height: 30/@size;
        line-height: 30/@size;
        text-align: center;
        border-radius: 15/@size;
        background-color: red;
        color: white;
        position: absolute;
        left: 70/@size;
        top: 10/@size;
        font-size: 20/@size;
      }
    }
    .textWrap {
      float: right;
      width:80%;
      height: 110/@size;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      padding-right: 10/@size;
      font-family:Adobe Heiti Std;
      .line-one {
        height: 60/@size;
        span,b {
          display: inline-block;
        }
        span {
          float: left;
          color: #000;
          font-size: 22/@size;
          line-height: 60/@size;
        }
        b {
          color: #b0b0b0;
          font-size: 20/@size;
          font-weight: 400;
          float: right;
          line-height: 60/@size;
        }
      }
      .line-two {
        height: 40/@size;
        line-height: 40/@size;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 20/@size;
        color: #B0B0B0;
      }
    }
  }
  .placeholder {
    height: 80/@size;
  }
  .title {
    width: 100%;
    height: 80/@size;
    box-sizing: border-box;
    padding: 0 20/@size;
    border-bottom: 2px solid #EEEEEE;
    line-height: 100/@size;
    font-size: 22/@size;
    color: #323232;
    font-family:Source Han Sans CN;
  }
  .sec-department {
    box-sizing: border-box;
    width: 100%;
    padding-left: 20/@size;
    .img-wrap,.coll-wrap {
      float: left;
    }
    .img-wrap {
      width: 70/@size;
      height: 80/@size;
      text-align: center;
      line-height: 80/@size;
    }
    img {
      width: 60/@size;
      height: 50/@size;
      position: relative;
      top: 5/@size;
    }
    .coll-wrap {
      width: 440/@size;
      height: 80/@size;
      font-size: 24/@size;
      font-family:Source Han Sans CN;
    }
    .van-cell__title {
      box-sizing: border-box;
      padding-left: 20/@size;
      height: 80/@size;
      line-height: 80/@size;
    }
    i {
      position: relative;
      top: 25/@size;
    }
  }
}
</style>