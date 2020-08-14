<template>
  <div class="chatDetailWrap" :class="{'haveShowUpDate':isShowUpdate}">
    
    <!-- 表单头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="route-title">{{groupChatInfo.groupName}}</span>
      <span class="setting-btn" @click="goGroupChatSet()"><van-icon name="more-o" /></span>
    </div>

    <div class="addMore">
      <p @click="getHistory('even')">查看更多消息</p>
    </div>

    <div
      v-for="(item,index) in dataList"
      :key="index"
    >
      <!-- 聊天框 -->
      <div :class="[mineAccount != item.senderAccount ? 'other':'mine']">
        <div class="img-wrap">
          <p class="userHeadImg">{{formatUserHeadImg(item.sender)}}</p>
        </div>
        <div class="text-wrap" v-show="item.type == '0'">
          <p>{{item.content}}</p>
        </div>
        <div class="img-wrap" v-if="item.type == '2'">
          <img
            v-preview="format(item.content)" 
            :src="format(item.content)" 
            alt=""
          >
        </div>
        <div @click="downloadFile(item)" class="file-wrap" v-show="item.type == '1' || item.type == '4'">
          <span>{{item.content}}</span>
          <img src="../../assets/img/plate/createTask/default.png" alt="default">
        </div>
        <div style="clear: both;"></div>
      </div>

    </div>

    <!-- 底部输入框 -->
    <div class="bottom-input">
      <span><van-icon name="add-o" @click="addUpDateShow()"/></span>
      <input value="" id="content" type="text" @focus="isShowUpdate=false">
      <span @click="sendInfo()">发送</span>
    </div>

    <!-- 图片，文件上传按钮 -->
    <div class="bottom-upDate">
      <div>
        <div class="fun-wrap" @click="upDatePhoto()">
          <div class="img-wrap">
            <van-icon name="photo" />
          </div>
          <p>图片</p>
        </div>
        <div class="fun-wrap" @click="upDateFile()">
          <div class="img-wrap">
            <van-icon name="column" />
          </div>
          <p>文件</p>
        </div>
      </div>
    </div>

    <input id="senderAccount" type="text" v-model="this.mineAccount" style="display: none">
    <input id="sender" type="text" v-model="this.mineName" style="display: none">
    <input id="groupId" type="text" v-model="this.groupChatInfo.id" style="display: none">
    <input 
      id="imgUpBtn" 
      type="file"  
      style="display: none;"
      @change="getImg($event)"
      accept="image/*"
    >
    <input 
      id="fileUpBtn" 
      type="file"  
      style="display: none;"
      @change="getFile($event)"
    >
  </div>
</template>

<script>
import * as $api from '@/api';
import * as SockJS from '../../../static/sockjs.js';
import aes from '../../utils/aes.js';
import { Stomp } from '../../../static/stomp.js';
import { Toast,Dialog } from 'vant';
import axios from '@/utils/http';
import base from '@/api/base';
export default {
  data () {
    return {
      mineAccount: '', //我方账号
      mineName: '', //我方姓名
      groupChatInfo: '', //群聊信息
      sender: '', //发送人姓名
      getHistoryParameter: { // 获取历史消息
        current: 1, //页数
      },
      dataList: [],
      now: '',
      isShowUpdate: false,
      timer: ''
    }
  },
  methods: {
    format(path) {
      return `${base.baseUrl}${path}`
    },
    routerBack() {
      this.$router.back('-1')
    },
    checkForm: function(e) {
      this.sendInfo();
      e.preventDefault();
    },
    addUpDateShow() { //input旁的add按钮点击事件
      this.isShowUpdate = !this.isShowUpdate;
      this.$nextTick(() => {
        this.goDown();
      })
    },
    upDatePhoto() { //发送图片按钮点击事件
      document.getElementById("imgUpBtn").click();
    },
    upDateFile() { //发送文件按钮点击事件
      Dialog.confirm({
        message: '请选择文件类型',
        confirmButtonText: '文档库文件',
        cancelButtonText: '本地文件'
      }).then(() => {
        let items = {
          senderAccount: this.mineAccount, //发送人用户账号
          sender: this.mineName, //发送人姓名
          groupId: this.groupChatInfo.id
        }
        this.$router.push({path: '/chatSelectLibrary',query: {item: items,targetType: 'group'}})
      }).catch(() => {
        document.getElementById("fileUpBtn").click();
      })
    },
    getImg(event) {
      // 发送图片
      var formData = new FormData();
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      formData.append('file', event.target.files[0])
      formData.append('senderAccount', $("#senderAccount").val())
      formData.append('sender', $('#sender').val())
      formData.append('groupId', $('#groupId').val())
      axios.post(`${base.baseUrl}/app/groupChat/groupSendFile`,formData,config)
      .then(res=>{
        if(res.code == '200') {
          // 发送成功
          // 添加本地列表
          // 添加聊天页面预览图
          this.uploadChat();
          this.dataList = this.dataList.concat({
            content: res.imageUrl,
            type: '2',
            senderAccount: this.mineAccount,
            sender: this.mineName,
          });
          this.$nextTick(() => {
            this.goDown();
          })
          this.now = this.getTime();
          let thisItem = [{
            content: '[图片]',
            haveRead: '1',
            sender: this.mineName,
            senderAccount: this.mineAccount,
            sendTime: this.now,
            type: '0',
            targetType: 'group',
            id: this.groupChatInfo.id,
            groupName: this.groupChatInfo.groupName,
            groupNumber: this.groupChatInfo.groupNumber
          }]
          if(JSON.stringify(JSON.parse(localStorage.getItem('list'))) == '{}' || JSON.parse(localStorage.getItem('list')) == null) {
            localStorage.setItem('list','{}')
          }
          var evenItem = JSON.parse(localStorage.getItem('list'))
          evenItem['groupId'+this.groupChatInfo.id] = thisItem
          localStorage.setItem('list',JSON.stringify(evenItem))
        }else {
          Toast('发送失败')
        }
      })
    },
    getFile(event) {
      // 发送文件
      var formData = new FormData();
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      formData.append('file', event.target.files[0])
      formData.append('senderAccount', $("#senderAccount").val())
      formData.append('sender', $('#sender').val())
      formData.append('groupId', $('#groupId').val())
      axios.post(`${base.baseUrl}/app/groupChat/groupSendFile`,formData,config)
      .then(res=>{
        if(res.code == '200') {
          // 发送成功
          // 添加本地列表
          this.uploadChat();
          this.dataList = this.dataList.concat({
            content: event.target.files[0].name,
            type: '1',
            senderAccount: this.mineAccount,
            attachmentId: res.fileId,
            sender: this.mineName,
          });
          this.$nextTick(() => {
            this.goDown();
          })
          this.now = this.getTime();
          let thisItem = [{
            content: '[文件]',
            haveRead: '1',
            sender: this.mineName,
            senderAccount: this.mineAccount,
            sendTime: this.now,
            type: '0',
            targetType: 'group',
            id: this.groupChatInfo.id,
            groupName: this.groupChatInfo.groupName,
            groupNumber: this.groupChatInfo.groupNumber
          }]
          if(JSON.stringify(JSON.parse(localStorage.getItem('list'))) == '{}' || JSON.parse(localStorage.getItem('list')) == null) {
            localStorage.setItem('list','{}')
          }
          var evenItem = JSON.parse(localStorage.getItem('list'))
          evenItem['groupId'+this.groupChatInfo.id] = thisItem
          localStorage.setItem('list',JSON.stringify(evenItem))
        }else {
          Toast('发送失败')
        }
      });
      
    },
    downloadFile(file) {
      // 下载附件
      let that = this;
      let fileId = file.attachmentId,
        filename = file.content;
       if(file.type == '4') {
        axios({
          method: 'post',
          url: `${base.baseUrl}/app/getDocumentsFilePath/${fileId}`,
        }).then(res => {
          var path = res.msg;
          if(window.plus) {
            // 判断文件是否已经下载
            plus.io.resolveLocalFileSystemURL(
              '_downloads/' + filename,
              function (entry) {
                //如果已存在文件，则打开文件
                if (entry.isFile) {
                  Toast("正在打开文件...");
                  plus.runtime.openFile('_downloads' + filename);
                }
              }, 
              function () {
                //如果未下载文件，则下载后打开文件
                that.loadingAnimation(0)
                var dtask = plus.downloader.createDownload(
                  path, 
                  {
                    filename: '_downloads' + filename
                  },
                  function (d, status) {
                    if (status == 200) {
                      plus.runtime.openFile( '_downloads' + filename );
                      that.loadingAnimation(100)
                      Toast('下载成功')
                    }
                    else {
                      Toast("下载失败: " + status);
                      that.loadingAnimation(100)
                    }
                  }
                );
                dtask.start();
              }
            );
          }
          else {
            console.log(path)
          }
        })
      }else if(file.type == '1') {
        axios({
          method: 'get',
          url: `${base.baseUrl}/app/chat/downloadFile/${fileId}`,
        }) 
        .then(res => {
          var path = `${base.baseUrl}${res.fileUrl}`;
          if(window.plus) {
            // 判断文件是否已经下载
            plus.io.resolveLocalFileSystemURL(
              '_downloads/' + filename,
              function (entry) {
                //如果已存在文件，则打开文件
                if (entry.isFile) {
                  Toast("正在打开文件...");
                  plus.runtime.openFile('_downloads' + filename);
                }
              }, 
              function () {
                //如果未下载文件，则下载后打开文件
                that.loadingAnimation(0)
                var dtask = plus.downloader.createDownload(
                  path, 
                  {
                    filename: '_downloads' + filename
                  },
                  function (d, status) {
                    if (status == 200) {
                      plus.runtime.openFile( '_downloads' + filename );
                      that.loadingAnimation(100)
                      Toast('下载成功')
                    }
                    else {
                      Toast("下载失败: " + status);
                      that.loadingAnimation(100)
                    }
                  }
                );
                dtask.start();
              }
            );
          }
          else {
            console.log(path)
          }
        })
      }
    },
    loadingAnimation(time) {
      Toast.loading({
        mask: false,
        message: '下载中...（请勿切换至后台）',
        duration: time,
        forbidClick: true
      });
    },
    getHistory(parms) {
      //获取聊天记录
      let data = this.getHistoryParameter;
      let id = this.groupChatInfo.id;
      this.$api.chat.getGroupChatHistory(id,data)
      .then(res=>{
        if(res.groupChatRecord.chatRecord[0] == undefined) {
          if(this.getHistoryParameter.current == 1) {
            $("#content").val('群聊创建成功！')
            this.sendInfo();
            return false;
          }
          Toast('没有更多历史记录了')
          return false;
        }
        for(var a in res.groupChatRecord.chatRecord) {
          res.groupChatRecord.chatRecord[a].content = aes.decrypt(res.groupChatRecord.chatRecord[a].content)
        }
        this.dataList = res.groupChatRecord.chatRecord.reverse().concat(this.dataList);
        this.getHistoryParameter.current++;
        // 保证在dom加载后跳底部
        this.$nextTick(() => {
          if(parms == 'now') {
            this.goDown();
          }else if(parms == 'even') {
            this.goTop();
          }
        })
      })
    },
    goGroupChatSet() { //跳转群聊设置页面
      localStorage.setItem('this_groupChatInfo',JSON.stringify(this.groupChatInfo))
      let items = JSON.parse(localStorage.getItem('this_groupChatInfo'))
      this.$router.push({path: '/groupChatSetting',query: {item: items}})
    },
    sendInfo(createSuccess) {
      //发送文本消息
      if($("#content").val() == '') {
        Toast('请输入要发送的内容！')
        return false;
      }
      this.uploadChat();
      this.now = this.getTime();
      if(createSuccess) {

      }
      this.stompClient.send(`/app/group/chat`, {},
        JSON.stringify({
          'content': aes.encrypt($("#content").val()),
          'senderAccount': $("#senderAccount").val(),
          'sender': $('#sender').val(),
          'groupId': $('#groupId').val(),
        })
      );
      // 发送成功后拼接发送的信息并重置输入框
      // 回到底部
      // 更新本地列表
      this.dataList = this.dataList.concat({
        content: $("#content").val(),
        senderAccount: this.mineAccount,
        sender: this.mineName,
        type: '0'
      });
      let thisItem = [{
        content: aes.encrypt($("#content").val()),
        haveRead: '1',
        sender: this.mineName,
        senderAccount: this.mineAccount,
        sendTime: this.now,
        type: '0',
        targetType: 'group',
        id: this.groupChatInfo.id,
        groupName: this.groupChatInfo.groupName,
        groupNumber: this.groupChatInfo.groupNumber
      }]
      if(JSON.stringify(JSON.parse(localStorage.getItem('list'))) == '{}' || JSON.parse(localStorage.getItem('list')) == null) {
        localStorage.setItem('list','{}')
      }
      var evenItem = JSON.parse(localStorage.getItem('list'))
      evenItem['groupId'+this.groupChatInfo.id] = thisItem
      localStorage.setItem('list',JSON.stringify(evenItem))
      $("#content").val('');
      this.$nextTick(() => {
        this.goDown();
      })
    },
    getTime() {
      //重置化时间 并重置显示聊天时间
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
    goDown() {
      //回到底部
      $(document).scrollTop(document.getElementsByClassName('chatDetailWrap')[0].clientHeight);
    },
    goTop() {
      //回到顶部
      $(document).scrollTop(0);
    },
    uploadChat() {
      //更新聊天状态
      var readData = {
        groupId: this.groupChatInfo.id
      }
      this.$api.chat.uploadGroupChat(readData)
      .then(res=>{
        var this_one = JSON.parse(localStorage.getItem('list'));
        if(JSON.stringify(this_one) == '{}' || this_one == null) {
          return false;
        }
        for(let a in this_one['groupId'+this.groupChatInfo.id]) {
          this_one['groupId'+this.groupChatInfo.id][a].haveRead = 1
        }
        localStorage.setItem('list',JSON.stringify(this_one))
      }).catch(error=>{
        //如果解散群 收到报错 弹框跳转清除本地列表
        if(error) {
          let evenItem = JSON.parse(localStorage.getItem('list'))
          delete evenItem['groupId'+this.groupChatInfo.id]
          localStorage.setItem('list',JSON.stringify(evenItem))
          setTimeout(()=>{
            Toast('该群已解散')
          },500)
          setTimeout(()=>{
            this.$router.push('/chatIndex')
          },1000)
        }
      })
    },
    // 建立连接对象
    connection() {
      let socket = new SockJS(this.$api.base.connectUrl);
      let that = this;
      let this_account = localStorage.getItem('account');
      let groupId = this.groupChatInfo.id;
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 向服务器发起websocket连接
      this.stompClient.connect({userAccount:this_account},function() {
        that.getHistory('now');
        //订阅群聊消息
        that.stompClient.subscribe('/chat/group/'+groupId, function(result) {
          var result = JSON.parse(result.body);
          if(result.senderAccount == this_account) {
            return false;
          }
          that.uploadChat();
          let thisItem1;
          result.content = aes.decrypt(result.content);
          if(result.type == '0') {
            // 如果对方传输的是文字
            that.dataList = that.dataList.concat({
              content: result.content,
              senderAccount: result.senderAccount,
              sender: result.sender,
              type: '0'
            });
            that.now = that.getTime();
            thisItem1 = [{
              content: aes.encrypt(result.content),
              haveRead: '1',
              sendTime: that.now,
              sender: result.sender,
              senderAccount: that.senderAccount,
              type: '0',
              targetType: 'group',
              id: that.groupChatInfo.id,
              groupName: that.groupChatInfo.groupName,
              groupNumber: that.groupChatInfo.groupNumber
            }]
          }if(result.type == '1') {
            // 如果对方传输的是文件
            that.dataList = that.dataList.concat({
              content: result.content,
              senderAccount: result.senderAccount,
              sender: result.sender,
              type: '1',
            });
            that.now = that.getTime();
            thisItem1 = [{
              content: '[文件]',
              haveRead: '1',
              sendTime: that.now,
              sender: result.sender,
              senderAccount: that.senderAccount,
              type: '1',
              targetType: 'group',
              id: that.groupChatInfo.id,
              groupName: that.groupChatInfo.groupName,
              groupNumber: that.groupChatInfo.groupNumber
            }]
          }if(result.type == '2') {
            // 如果对方传输的是图片
            that.dataList = that.dataList.concat({
              content: result.content,
              senderAccount: result.senderAccount,
              sender: result.sender,
              type: '2',
            });
            that.now = that.getTime();
            thisItem1 = [{
              content: '[图片]',
              haveRead: '1',
              sendTime: that.now,
              sender: result.sender,
              senderAccount: that.senderAccount,
              type: '2',
              targetType: 'group',
              id: that.groupChatInfo.id,
              groupName: that.groupChatInfo.groupName,
              groupNumber: that.groupChatInfo.groupNumber
            }]
          }
          
          that.$nextTick(() => {
            that.goDown();
          })
          
          var evenItem1 = JSON.parse(localStorage.getItem('list'))
            evenItem1['groupId'+that.groupChatInfo.id] = thisItem1
            localStorage.setItem('list',JSON.stringify(evenItem1))
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
    Dialog.close();
    clearInterval(this.timer);
  },
  created() {
    this.groupChatInfo = JSON.parse(localStorage.getItem('this_groupChatInfo'));
    this.mineAccount = localStorage.getItem("account"); //我方账号
    this.mineName = localStorage.getItem('this_name'); // 我方名字
    localStorage.setItem('isIndex',false)
  },
  mounted() {
    
    this.uploadChat();
    this.connection();
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.chatDetailWrap {
  width: 100%;
  min-height: 100%;
  padding-top: 80/@size;
  padding-bottom: 80/@size;
  background-color: rgb(239,236,240);
  box-sizing: border-box;
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    top: 0;
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
    z-index: 999;
    .return-btn {
      font-size: 28/@size;
      width: 50/@size;
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
      font-size: 26/@size;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      b {
        font-size: 14/@size;
        display: block;
      }
    }
    .setting-btn {
      font-size: 34/@size;
      width: 50/@size;
      text-align: right;
      position: relative;
      top: 5/@size;
    }
  }

  .addMore {
    width: 100%;
    height: 60/@size;
    line-height: 60/@size;
    text-align: center;
    font-size: 20/@size;
    color: #02ac61;
    i {
      position: relative;
      top: 3/@size;
      left: -5/@size;
    }
  }

  .mine,.other {
    min-height: 80/@size;
    width: 100%;
    box-sizing: border-box;
    margin: 20/@size 0;
    .img-wrap {
      width: 20%;
      height: 80/@size;
      padding: 5/@size 0;
      text-align: center;
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
      }
    }
    .file-wrap {
      min-height: 100/@size;
      background-color: #fff;
      box-sizing: border-box;
      margin: 10/@size 0;
      padding: 0 20/@size;
      max-width: 80%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      img {
        width: 40/@size;
        height: 50/@size;
      }
      span {
        display: inline-block;
        font-size: 26/@size;
        height: 70/@size;
        width: 100%;
        color: #333;
        box-sizing: border-box;
        padding-right: 20/@size;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .text-wrap {
      min-height: 70/@size;
      background-color: #fff;
      box-sizing: border-box;
      margin: 10/@size 0;
      padding: 0 20/@size;
      max-width:80%;
      border-radius: 5px;
      p {
        color: #000;
        font-family: SimHei;
        font-size: 24/@size;
        line-height: 70/@size;
        min-height: 70/@size;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .img-wrap {
      width: 100/@size;
      height: 100/@size;
      img {
        width: 100/@size;
        height: 100/@size;
      }
    }
  }
  .other {
    padding-right: 100/@size;
    .img-wrap,.text-wrap {
      float: left;
    }
  }
  .mine {
    padding-left: 60/@size;
    .img-wrap,.text-wrap {
      float: right;
    }
  }

  //底部输入框
  .bottom-input {
    position: fixed;
    bottom: 0/@size;
    width: 100%;
    height: 80/@size;
    background-color: rgb(248,246,249);
    box-sizing: border-box;
    padding: 15/@size;
    transition: all .3s;
    input {
      display: inline-block;
      width: 75%;
      height: 100%;
      background-color: #fff;
      border: none;
      border-radius:2px;
      box-sizing: border-box;
      padding: 0 10/@size;
      font-size: 20/@size;
    }
    span:nth-child(1) {
      display: inline-block;
      box-sizing: border-box;
      width: 8%;
      height: 50/@size;
      text-align: center;
      color: #333;
      i {
        font-size: 34/@size;
        position: relative;
        top: 8/@size;
      }
    }
    span:nth-child(3) {
      display: inline-block;
      box-sizing: border-box;
      width: 13%;
      height: 50/@size;
      line-height: 50/@size;
      color: white;
      background-color: #02ac61;
      text-align: center;
      font-size: 20/@size;
    }
  }

  //上传图片文件
  .bottom-upDate {
    width: 100%;
    height: 240/@size;
    background-color: #f8f6f9;
    position: fixed;
    bottom: -240/@size;
    transition: all .3s;
    box-sizing: border-box;
    padding: 20/@size;
    >div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      .fun-wrap {
        width: 120/@size;
        height: 200/@size;
        margin: 0 50/@size;
        .img-wrap {
          width: 120/@size;
          height: 120/@size;
          background-color: #fff;
          color: #333;
          font-size: 50/@size;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 15/@size;
          border-radius: 5/@size;
        }
        p {
          text-align: center;
          color: #767676;
          line-height: 50/@size;
          height: 50/@size;
          font-size: 24/@size;
        }
      }
    }
  }

}

.haveShowUpDate {
  padding-bottom: 320/@size;
  .bottom-input {
    bottom: 240/@size;
    transition: all .3s;
  }
  .bottom-upDate {
    bottom: 0/@size;
    transition: all .3s;
  }
}
</style>