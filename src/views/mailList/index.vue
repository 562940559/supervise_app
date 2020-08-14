<template>
  <div class="mailListWrap">
    <div class="top-wrap">
      <span class="route-title">{{$route.meta.title}}</span>
    </div>
    <div class="searchInput-wrap">
      <van-icon name="search" /><input type="text" readonly @click="goSearch()" placeholder="请输入关键字">
    </div>
    <div class="top-department">
      <div>
        <img src="../../../static/img/mailList/JGW.png" alt="">
      </div>
      <div>
        <p>纪工委<span><van-icon name="friends" />{{this.allNumber}}</span></p>
      </div>
    </div>
    
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/fgld.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-cell
          :title="'委办领导'+' ( '+mailList.allDepartment.leader.length+' ) '" 
          is-link 
          @click="goDetailList(mailList.allDepartment.leader)"
        />
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/JJJC.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            :title="'纪检监察'+' ( '+mailList.jjjc.addressBooks.length+' ) '" 
            name="1"
          >
            <van-cell 
              v-for="(item,index) in mailList.jjjc.childNodes"
              :key="index"
              :title="item.fullname+' ( '+mailList.allDepartment.thirdGradeMap[item.fullname].addressBooks.length+' ) '" 
              is-link 
              @click="goDetailList(item)"
            />
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/XCB.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            :title="'巡察办'+' ( '+mailList.xcb.addressBooks.length+' ) '"
            name="2"
          >
            <van-cell 
              v-for="(item,index) in mailList.xcb.childNodes"
              :key="index"
              :title="item.fullname+' ( '+mailList.allDepartment.thirdGradeMap[item.fullname].addressBooks.length+' ) '" 
              is-link 
              @click="goDetailList(item)"
            />
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="sec-department" v-if="this.canRead">
      <div class="img-wrap">
        <img src="../../../static/img/mailList/SJJ.png" alt="">
      </div>
      <div class="coll-wrap">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            :title="'审计局'+' ( '+mailList.sjj.addressBooks.length+' ) '" 
            name="3"
          >
            <van-cell 
              v-for="(item,index) in mailList.sjj.childNodes"
              :key="index"
              :title="item.fullname+' ( '+mailList.allDepartment.thirdGradeMap[item.fullname].addressBooks.length+' ) '" 
              is-link 
              @click="goDetailList(item)"
            />
          </van-collapse-item>
        </van-collapse>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import * as SockJS from '../../../static/sockjs.js';
import { Stomp } from '../../../static/stomp.js';
import store from '../../store';
import { Search } from 'vant';
export default {
  data() {
    return {
      activeName: '',
      mailList: {
        sjj: '',
        xcb: '',
        jjjc: '',
        allDepartment: ''
      },
      allNumber: '',
      canRead: false,
      requestPara: {
        name: '',
      },
      groupChatNumber: ''
    }
  },
  created() {
    this.connection();
    this.$api.mailList.getMailTitle()
    .then(res=>{
      this.mailList.allDepartment = res;
      this.allNumber = this.mailList.allDepartment.top.addressBooks.length;
      this.mailList.sjj = res.secondary.审计局;
      this.mailList.xcb = res.secondary.巡察办;
      this.mailList.jjjc = res.secondary.纪检监察;
      this.canRead = true;
    })
    localStorage.setItem('isIndex',true)
    let activeN = JSON.parse(localStorage.getItem('activeList'));
    if(activeN) {
      this.activeName = activeN;
    }
  },
  mounted() {
    this.getNoRead();
    this.getGroupChatUnRead();
  },
  methods: {
    goSearch() {
      this.$router.push('/searchMail')
    },
    goDetailList(item) {
      if(item == this.mailList.allDepartment.leader) {
        let items = {
          addressBooks: this.mailList.allDepartment.leader
        }
        localStorage.setItem('second',JSON.stringify(''))
        localStorage.setItem('third',JSON.stringify(items))
        return this.$router.push({path: '/departmentDetail',query: {item: items,active: ''}})
      }
      localStorage.setItem('third',JSON.stringify(this.mailList.allDepartment.thirdGradeMap[item.fullname]))
      localStorage.setItem('second',JSON.stringify(this.activeName))
      localStorage.setItem('activeList',JSON.stringify(this.activeName))
      this.$router.push({path: '/departmentDetail',query: {item: this.mailList.allDepartment.thirdGradeMap[item.fullname],active: this.activeName}})
    },
    goChatDetail(item) {
      this.$router.push({path: '/chatDetail', query: {item: item}})
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
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
  },
}
</script>

<style lang="less" type="text/less">
.mailListWrap {
  .van-collapse-item__content {
    padding: 10px 0;
  }
}
</style>
<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.van-cell {
  padding: 10px 16px;
}


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
.mailListWrap {
  width: 100%;
  min-height: 100%;
  padding-bottom: 88/@size;
  padding-top: 150/@size;
  box-sizing: border-box;

  .van-search__content {
    background-color: white!important;
  }
  .van-collapse-item__content {
    padding: 0;
  }

  .top-department {
    border-top: 15/@size solid #f7f7f7;
    height: 140/@size;
    box-sizing: border-box;
    width: 100%;
    padding: 25/@size 0 25/@size 20/@size;
    div {
      float: left;
    }
    div:nth-child(1) {
      margin-right: 20/@size;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 70/@size;
      height: 75/@size;
    }
    img {
      width: 60/@size;
      height: 60/@size;
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
        width: 80/@size;
        height: 35/@size;
        line-height: 35/@size;
        text-align: center;
        font-size: 18/@size;
        background-color: #FFF1EE;
        color: #FC602D;
        border-radius: 5px;
        margin-left: 20/@size;
      }
      i {
        font-size: 20/@size;
        color: #FC602D;
        position: relative;
        top: 5/@size;
        left: -5/@size;
      }
    }
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
      height: 44px;
      text-align: center;
      line-height: 44px;
    }
    img {
      width: 30/@size;
      height: 30/@size;
      position: relative;
      top: 5/@size;
    }
    .coll-wrap {
      width: 440/@size;
      font-size: 24/@size;
      font-family:Source Han Sans CN;
    }
  }
}
</style>