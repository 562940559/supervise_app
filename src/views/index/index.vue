<template>
  <div class="indexWrap">
    <div class="imgSwipeWrap">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="contentWrap" @click="goPart('statistics')">
      <ul>
        <li>
          <p>{{missionNumList.totalTask}}</p>
          <p>所有任务</p>
        </li>
        <li>
          <p>{{missionNumList.totalCompletedTasks}}</p>
          <p>已完成任务</p>
        </li>
        <li>
          <p>{{missionNumList.totalOverdueTasks}}</p>
          <p>超期任务</p>
        </li>
      </ul>
    </div>
    <div class="noticeSwipeWrap">
      <p><span>通知</span></p>
      <div style="width: 100%">
        <van-swipe style="height: 40px;" :show-indicators='this.showIndicators' :autoplay="3000" vertical>
          <van-swipe-item style="line-height: 30px;" 
            v-for="(notice, index) in noticeList" :key='index'>
            <span class="noticeContain">{{index+1}}.{{notice.title}}</span>
          </van-swipe-item>
        </van-swipe>
      </div>
      <p @click="goPlate('moreNotice')">更多</p>
    </div>
    <div class="missionSortWrap">
      <div 
        v-for="(item,index) in missionPartList" 
        :key="index"
        class="missionPartWrap"
        @click="goPart(item.path)"
      >
        <img :src="item.images" alt="">
        <p>{{item.title}}<span v-if="item.allMissionNum">{{item.allMissionNum}}</span></p>
        <p>{{item.introduce}}</p>
      </div>
      <div style="clear: both;"></div>
    </div>
    <!-- 其他应用 -->
    <div class="otherBusinessWrap">
      <div class="otherBusinessMain">
        <div class="title">其他应用</div>
        <div
          v-for="(item,index) in businessListQuery"
          :key="index"
          class="businessCont query"
          @click="goPart(item.path)"
        >
          <img :src="item.images" alt="">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
    <!-- 其他业务 -->
    <div class="otherBusinessWrap">
      <div class="otherBusinessMain">
        <div class="title">其他业务</div>
        <div
          v-for="(item,index) in otherBusinessList"
          :key="index"
          class="businessCont other"
          @click="goPart(item.path)"
        >
          <img :src="item.images" alt="">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Swipe, SwipeItem, Lazyload, Uploader, Dialog, Toast } from 'vant';
import * as SockJS from '../../../static/sockjs.js';
import { Stomp } from '../../../static/stomp.js';
import store from '../../store';
export default {
  data() {
    return {
      images: [
        './static/img/index/bannar3.png',
        './static/img/index/bannar1.png',
        './static/img/index/bannar2.png',
      ],
      missionNumList: '', // 顶部任务数量汇总
      showIndicators: false,
      noticeList: null,
      power: '',
      missionPartList: [{ //功能板块及权限
        images: './static/img/index/list2.png',
        title: '待处理',
        introduce: '新接收待办任务',
        path: '/mineMission',
        allMissionNum: 0,
        mineMissionPower: ''
      },{
        images: './static/img/index/list3.png',
        title: '我的任务',
        introduce: '查看完成的任务',
        path: '/historyMission'
      },{
        images: './static/img/index/list4.png',
        title: '任务统计',
        introduce: '所有任务的统计',
        path: '/statistics'
      },{
        images: './static/img/index/list1.png',
        title: '流程管理',
        introduce: '新任务的拟办',
        path: '/createTask'
      }],
      businessListQuery: [{ // 其他应用
        images: './static/img/index/business4.png',
        title: '知识库',
        path: '/statuteQuery'
      },{
        images: './static/img/index/business5.png',
        title: '投资审计台账',
        path: '/auditTzIndex'
      },{
        images: './static/img/index/business6.png',
        title: '我要答题',
        path: '/questionIndex'
      },],
      otherBusinessList: [{ // 其他业务
        images: './static/img/index/business1.png',
        title: '审计系统',
        path: '/auditSystemIndex'
      },{
        images: './static/img/index/business2.png',
        title: '巡察系统',
        path: ''
      },{
        images: './static/img/index/business3.png',
        title: '纪检平台',
        path: ''
      },],
      
    }
  },
  methods: {
    loading(time) {
      Toast.loading({
        mask: false,
        message: '下载中...（请勿切换至后台）',
        duration: time,
        forbidClick: true
      });
    },
    goPart(path) {
      if(path == '') {
        return false;
      }else if(path == '/auditSystemIndex') {
        if(!this.power.auditQueryAuthority) {
          Toast('请联系管理员')
        }else {
          this.$router.push(path)
        }
      }else if(path == '/mineMission') {
        if(this.missionPartList[0].mineMissionPower.reviewPermissions) {
          this.$router.push('/mineMission')
          return
        }else if(this.missionPartList[0].mineMissionPower.reportPermissions) {
          this.$router.push('/mineMission_hb')
          return
        }else if(this.missionPartList[0].mineMissionPower.assignPermissions) {
          this.$router.push('/mineMission_fp')
          return
        }
      }else {
        this.$router.push(path)
      }
    },
    goPlate(where) {
      this.$router.push(where)
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
    var that = this;
    var data = {
      platform: 'android',
      version: '1.2.7'
      // version: '1.1.0'
    };
    this.$api.mine.getVer(data)
    .then(res=>{
      console.log(res)
      if(res.code == '200') {
        var filepath = `${res.download}`;
        var filename = `duban${res.time}.apk`;
        if(res.update) {
          Dialog.confirm({
            title: '提示',
            confirmButtonText: '下载新版本',
            confirmButtonColor: '#02ac61',
            cancelButtonColor: '#02ac61',
            message: '检测到了新版本，是否进入下载？',
          }).then(() => {
            //确认下载开始下载apk
            that.loading(0)
            var dtask = plus.downloader.createDownload(
              filepath, 
              {
                filename: '_downloads' + filename
              },
              function (d, status) {
                if (status == 200) {
                  plus.runtime.openFile( '_downloads' + filename );
                  that.loading(100)
                }
                else {
                  Toast("下载失败: " + status);
                  that.loading(100)
                }
              }
            );
            dtask.start();
          }).catch(() => {
            //取消下载直接退出应用
            plus.runtime.quit();
          });
        }
      }
    })
    this.$api.mine.getUserInfo() //获取用户名字
    .then(res=>{
      localStorage.setItem('this_name',res.name)
    }),
    this.$api.mine.getAllMissionNum()
    .then(res=>{
      this.missionNumList = res;
    })
    localStorage.setItem('isIndex',true)
    localStorage.setItem('iaAnswerQuestion',false)
  },
  mounted() {
    this.getNoRead();
    this.getGroupChatUnRead();
    this.$api.work.getWorkCount() // 获取板块数量和权限
    .then(res=>{
      this.power = res.permissionMap;
      this.noticeList = res.announcement;
      this.$set(this.missionPartList[0],'allMissionNum',res.myTaskNum.processedNumber);
    });
    this.$api.work.getMineMissionPower() // 获取我的任务权限
    .then(res=>{
      this.$set(this.missionPartList[0],'mineMissionPower',res);
    })
    setTimeout(()=>{
      if(this.$router.currentRoute.path == '/') {
        this.connection();
      }
    },500)
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
  },
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.indexWrap {
  width: 100%;
  min-height: 100%;
  padding-bottom: 88/@size;
  padding-top: 80/@size;
  background-color: #f7f7f7;
  box-sizing: border-box;

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

  .contentWrap {
    width: 100%;
    height: 110/@size;
    box-sizing: border-box;
    padding-top: 30/@size;
    margin-bottom: 10/@size;
    background-color: #fff;
    ul {
      width: 100%;
      height: 100%;
      li {
        float: left;
        width: 33%;
        height: 100%;
        p:nth-child(1) {
          font-size: 20/@size;
          text-align: center;
          color: #323232;
        }
        p:nth-child(2) {
          color: #999999;
          text-align: center;
          font-size: 18/@size;
          margin-top: 8/@size;
        }
      }
      li:last-child {
        p:nth-child(1) {
          color: #FF0000;
        }
      }
    }
  }

  .noticeSwipeWrap {
    box-sizing: border-box;
    padding: 0 20/@size;
    display: flex;
    box-shadow: 0 5/@size 5/@size 0 rgba(0,0,0,.05);
    background-color: #fff;
    p {
      width: 100/@size;
      height: 40px;
      line-height: 40px;
      text-align: center;
      span {
        display: inline-block;
        width: 60/@size;
        height: 30/@size;
        line-height: 30/@size;
        background-color: rgb(255,202,208);
        color: #FF0036;
        font-size: 18/@size;
        font-family: SourceHanSansCN;
        font-weight: 600;
      }
    }
    p:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p:nth-child(3) {
      font-size: 22/@size;
      color: #BABABA;
      box-shadow: -3/@size 0 7/@size 0 rgba(0,0,0,.05);
    }
    .noticeContain {
      width: 100%;
      margin-left: 10/@size;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      padding-right: 10/@size;
    }
  }

  .missionSortWrap {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20/@size;
    .missionPartWrap {
      height: 120/@size;
      background-color: #fff;
      width: 48%;
      float: left;
      margin-top: 20/@size;
      box-sizing: border-box;
      padding: 25/@size 10/@size;
      img {
        width: 70/@size;
        height: 70/@size;
        float: left;
        margin-right: 10/@size;
      }
      p {
        height: 35/@size;
        line-height: 35/@size;
        font-family:SourceHanSansCN;
        span {
          background-color: red;
          color: white;
          font-size: 18/@size;
          padding: 0 5/@size;
          height: 20/@size;
          line-height: 20/@size;
          display: inline-block;
          border-radius: 11/@size;
          text-align: center;
          position: relative;
          top: -10/@size;
          left: 5/@size;
        }
      }
      p:nth-child(2) {
        font-size: 20/@size;
        color: #323232;
      }
      p:nth-child(3) {
        font-size: 14/@size;
        color: #BABABA;
      }
    }
    .missionPartWrap:nth-child(even)
    {
      float: right;
    }
  }
  
  .otherBusinessWrap {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20/@size;
    margin-top: 20/@size;
    .otherBusinessMain {
      height: 200/@size;
      background-color: #fff;
      padding: 10/@size;
      box-sizing: border-box;
      .title {
        height: 50/@size;
        line-height: 50/@size;
        font-size: 24/@size;
        font-family: SourceHanSansCN;
        box-sizing: border-box;
      }
      .businessCont {
        float: left;
        width: 25%;
        text-align: center;
        height: 140/@size;
        box-sizing: border-box;
        padding-top: 30/@size;
        img {
          width: 50/@size;
          height: 50/@size;
        }
        p {
          font-size: 20/@size;
          font-family: SourceHanSansCN;
          color: #323232;
        }
      }
      // .query:nth-child(2) {

      // }
      .other:nth-child(3) {
        img {
          width: 60/@size;
        }
        p {
          color: #e5e5e5;
        }
      }
      .other:nth-child(4) {
        img {
          width: 70/@size;
        }
        p {
          color: #e5e5e5;
        }
      }
    }
  }
}
</style>