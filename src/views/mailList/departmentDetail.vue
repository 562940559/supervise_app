<template>
  <div class="departmentDetail-wrap">
    <div class="top-wrap">
      <span class="return-btn" v-if="$route.meta.showBack">
        <van-icon name="arrow-left" @click="routerBack"></van-icon>
      </span>
      <span class="route-title">{{this.departmentInfo.second == '' ? '分管领导' : this.departmentInfo.third.deptName}}</span>
      <span class="return-btn" style="color: white">
        <van-icon name="arrow-left"></van-icon>
      </span>
    </div>
    <div class="departLevel-wrap">
      <p>纪工委 > {{this.departmentInfo.second == '' ? '' : this.departmentInfo.second+' > '}}<span>{{this.departmentInfo.second == '' ? '分管领导' : this.departmentInfo.third.deptName}}</span></p>
    </div>
    <div 
      class="list-wrap"
      v-for="(item,index) in this.departmentInfo.third.addressBooks"
      :key="index"
      @click="goPersonalDetail(item)"
    >
      <div>
        <img v-show="item.online" src="../../../static/img/chat/pictureTwo.png" alt="">
        <img v-show="!item.online" src="../../../static/img/chat/lixian.png" alt="">
      </div>
      <div>
        <p>{{item.name}}<span>{{item.roleName}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import * as SockJS from '../../../static/sockjs.js';
import { Stomp } from '../../../static/stomp.js';
export default {
  data() {
    return {
      departmentInfo: {
        second: '',
        third: '',
      },
      onlineList: ''
    }
  },
  methods: {
    routerBack() {
      this.$router.back('-1')
    },
    goPersonalDetail(item) {
      localStorage.setItem('card',JSON.stringify(item))
      this.$router.push({path: '/businessCard',query: {personalInfo: item}})
    },
    getOnlineList() { //获取在线人员列表
      this.$api.mailList.getOnlineNumber()
      .then(res=>{
        this.onlineList = res.onlineUsers;
      })
    },
    updataList() {
      setTimeout(()=>{
        for(var a in this.departmentInfo.third.addressBooks) {
          this.$set(this.departmentInfo.third.addressBooks[a],'online',false)
          for(var b in this.onlineList) {
            if(b == this.departmentInfo.third.addressBooks[a].userAccount) {
              this.$set(this.departmentInfo.third.addressBooks[a],'online',true)
            }
          }
        }
      },1000)
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
        that.getOnlineList();
        //订阅在线用户消息
        that.stompClient.subscribe('/topic/onlineUser', function (result) {
          that.onlineList = JSON.parse(result.body).onlineUsers;
          that.updataList()
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
  created() {
    this.departmentInfo.third = JSON.parse(localStorage.getItem('third'))
    this.departmentInfo.second = JSON.parse(localStorage.getItem('second'))
    if(this.departmentInfo.second == '1') {
      this.departmentInfo.second = '纪检监察'
    }else if(this.departmentInfo.second == '2') {
      this.departmentInfo.second = '巡察办'
    }else if(this.departmentInfo.second == '3') {
      this.departmentInfo.second = '审计局'
    }else{
      this.departmentInfo.second = ''
    }
    this.connection();
    localStorage.setItem('isIndex',false)
  },
  mounted() {
    this.updataList();
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
  },
}
</script>

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
  .return-btn {
    font-size: 28/@size;
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
    font-size: 30/@size;
    text-align: left;
    font-family: Source Han Sans CN;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  i {
    font-size: 34/@size;
  }
}
.departmentDetail-wrap {
  width: 100%;
  min-height: 100%;
  padding-top: 180/@size;
  box-sizing: border-box;
  .departLevel-wrap {
    width: 100%;
    height: 100/@size;
    border-top: 15/@size solid #eee;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 20/@size;
    position: fixed;
    top: 80/@size;
    z-index: 999;
    background-color: #fff;
    p {
      height: 85/@size;
      line-height: 95/@size;
      font-size: 20/@size;
      font-family:Source Han Sans CN;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        color: #02AC61;
      }
    }
  }
  .list-wrap {
    height: 125/@size;
    box-sizing: border-box;
    width: 100%;
    padding: 25/@size 0 0/@size 20/@size;
    div {
      float: left;
    }
    div:nth-child(1) {
      margin-right: 20/@size;
      width: 70/@size;
      height: 75/@size;
      text-align: center;
      position: relative;
    }
    img {
      width: 50/@size;
      height: 50/@size;
      position: absolute;
      top: 50%;
      margin-top: -25/@size;
      left: 50%;
      margin-left: -25/@size;
    }
    p {
      height: 75/@size;
      line-height: 75/@size;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      width: 410/@size;
      font-size: 24/@size;
      font-family:Source Han Sans CN;
      span {
        display: inline-block;
        margin-left: 10/@size;
        padding: 0 10/@size;
        height: 25/@size;
        line-height: 25/@size;
        border: 1px solid #22AC38;
        color: #02AC61;
        font-size: 18/@size;
        border-radius: 10/@size;
      }
    }
  }
}
</style>