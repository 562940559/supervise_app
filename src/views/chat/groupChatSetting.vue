<template>
  <div class="groupChatSet-wrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="route-title" @click="routerBack()"><van-icon name="arrow-left" />
        <span>{{groupName}}</span><b>({{personList.length}})</b>
      </span>
    </div>
    <div class="memberList-wrap">
      <div class="oneMember"
        v-for="(item,index) in personList"
        :key="index"
      >
        <p class="userHeadImg">{{formatUserHeadImg(item.userName)}}</p>
        <p class="name">{{item.userName}}</p>
      </div>
      <div class="addMemberBtn" @click="goOther('/addGroupNumber')">
        <van-icon name="add-o" />
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="editGroupName">
      <span>群聊名称</span>
      <span @click="goOther('/setGroupChatName')"><van-icon name="arrow" /></span>
      <span @click="goOther('/setGroupChatName')">{{groupName}}</span>
    </div>
    <div class="chatRecord-wrap">
      <!-- <p>
        <span>聊天记录</span>
        <span><van-icon name="arrow" /></span>
      </p> -->
      <p>
        <span @click="goOther('/groupChatFile')">聊天文件</span>
        <span @click="goOther('/groupChatFile')"><van-icon name="arrow" /></span>
      </p>
    </div>
    <div class="out">
      <div class="btn" @click="sureDissolution()" v-if="isBoss == 'true'">解散该群</div>
      <div class="btn" @click="sureOut()" v-else>退出该群</div>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Dialog, Toast } from 'vant';
export default {
  data() {
    return {
      personList: '',
      groupName: '',
      isBoss: ''
    }
  },
  created() {
    let id = JSON.parse(localStorage.getItem('this_groupChatInfo')).id;
    this.getGroupChatInfo(id);
  },
  mounted() {

  },
  methods: {
    sureDissolution() { //解散群
      Dialog.confirm({
        title: '提示',
        confirmButtonText: '解散',
        confirmButtonColor: 'red',
        cancelButtonColor: '#02ac61',
        message: '确定解散该群吗？',
      }).then(() => {
        // 解散的同时清楚本地列表
        let id = JSON.parse(localStorage.getItem('this_groupChatInfo')).id;
        let evenItem = JSON.parse(localStorage.getItem('list'))
        delete evenItem['groupId'+id]
        localStorage.setItem('list',JSON.stringify(evenItem))
        this.$api.chat.dissolutionGroup(id)
        .then(res=>{
          if(res.code == '200') {
            Toast('操作成功')
            setTimeout(()=>{
              this.$router.push('/mailList')
            },500)
          }
        })
      }).catch(() => {});
    },
    sureOut() { //退出群
      Dialog.confirm({
        title: '提示',
        confirmButtonText: '退出',
        confirmButtonColor: 'red',
        cancelButtonColor: '#02ac61',
        message: '确定退出该群吗？',
      }).then(() => {
        // 解散的同时清楚本地列表
        let id = JSON.parse(localStorage.getItem('this_groupChatInfo')).id;
        let evenItem = JSON.parse(localStorage.getItem('list'))
        delete evenItem['groupId'+id]
        localStorage.setItem('list',JSON.stringify(evenItem))
        this.$api.chat.outGroup(id)
        .then(res=>{
          if(res.code == '200') {
            Toast('操作成功')
            setTimeout(()=>{
              this.$router.push('/mailList')
            },500)
          }
        })
      }).catch(() => {});
    },
    routerBack() {
      this.$router.back('-1')
    },
    getGroupChatInfo(id) { //获取群聊详细信息
      this.$api.chat.getGroupChatInfo(id)
      .then(res=>{
        console.log(res)
        this.personList = res.groupMember;
        this.groupName = res.groupName;
        this.isBoss = res.groupManager;
      })
    },
    goOther(path) {
      let items = {
        id: JSON.parse(localStorage.getItem('this_groupChatInfo')).id,
        personList : this.personList
      }
      this.$router.push({path: path,query: {item: items}})
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
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.groupChatSet-wrap {
  box-sizing: border-box;
  padding-top: 80/@size;
  min-height: 100%;
  background-color: rgb(239,237,238);
  .top-wrap {
    width: 100%;
    height: 80/@size;
    background-color: white;
    color: #323232;
    font-family: SourceHanSansCN;
    font-size: 16/@size;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(239,237,238);
    padding: 0 20/@size;
    position: fixed;
    top: 0;
    z-index: 9999;
    .route-title {
      font-size: 30/@size;
      text-align: left;
      font-family: Source Han Sans CN;
      span {
        display: inline-block;
        max-width: 300/@size;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        top: 7/@size;
      }
      b {
        position: relative;
        top: -2/@size;
        font-weight: 400;
        margin-left: 5/@size;
      }
      i {
        font-size: 30/@size;
        position: relative;
        top: 4/@size;
        left: -5/@size;
      }
    }
  }
  .memberList-wrap {
    width: 100%;
    min-height: 120/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10/@size;
    border-bottom: 5px solid rgb(239,237,238);
    .oneMember {
      width: 20%;
      height: 100/@size;
      margin: 10/@size 0;
      box-sizing: border-box;
      padding: 0 10/@size;
      text-align: center;
      float: left;
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
      .name {
        color: #9C9C9C;
        font-size: 20/@size;
        height: 30/@size;
        line-height: 30/@size;
      }
    }
    .addMemberBtn {
      width: 20%;
      height: 100/@size;
      margin: 10/@size 0;
      box-sizing: border-box;
      padding: 0 20/@size;
      text-align: center;
      float: left;
      i {
        font-size: 70/@size;
        color: #ccc;
      } 
    }
  }
  .editGroupName {
    width: 100%;
    height: 80/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 20/@size;
    border-bottom: 5px solid rgb(239,237,238);
    span,input {
      display: inline-block;
      line-height: 80/@size;
      height: 80/@size;
    }
    span:nth-child(1) {
      font-size: 22/@size;
    }
    span:nth-child(2) {
      float: right;
      i {
        color: #9C9C9C;
        font-size: 22/@size;
        position: relative;
        top: 2/@size;
      }
    }
    span:nth-child(3) {
      float: right;
      max-width: 300/@size;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 22/@size;
      color: #9C9C9C;
      margin-right: 10/@size;
    }
  }
  .chatRecord-wrap {
    width: 100%;
    background-color: #fff;
    border-bottom: 5px solid rgb(239,237,238);
    box-sizing: border-box;
    padding: 0 20/@size;
    p {
      width: 100%;
      height: 80/@size;
      border-bottom: 1px solid #eee;
      span{
        display: inline-block;
        line-height: 80/@size;
        height: 80/@size;
      }
      span:nth-child(1) {
        font-size: 22/@size;
      }
      span:nth-child(2) {
        float: right;
        i {
          color: #9C9C9C;
          font-size: 22/@size;
          position: relative;
          top: 5/@size;
        }
      }
    }
  }
  .out {
    width: 100%;
    height: 80/@size;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    .btn {
      width: 100%;
      height: 80/@size;
      line-height: 80/@size;
      text-align: center;
      color: red;
      font-size: 26/@size;
    }
  }
}

</style>