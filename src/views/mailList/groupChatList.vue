<template>
  <div class="groupChatList-wrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="route-title" @click="routerBack()"><van-icon name="arrow-left" />{{$route.meta.title}}</span>
    </div>
    <div class="list-wrap">
      <div class="oneGroupChat"
        v-for="(item,index) in groupChatList"
        :key="index"
        @click="goGroupChatPage(item)"
      >
        <div class="img-wrap">
          <div class="userHeadImg">
            <van-icon name="friends" />
          </div>
        </div>
        <div class="text-wrap">{{item.groupName}}({{item.groupNumber}})</div>
      </div>
      <div style="clear: both;"></div>
    </div>
    <p class="allListNumber">{{groupChatList.length}}个群聊</p>
    <van-divider style="margin: 20px 0;">没有更多了</van-divider>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      groupChatList: ''
    }
  },
  created() {
    localStorage.setItem('isIndex',false)
    this.getGroupList();
  },
  mounted() {},
  methods: {
    getGroupList() {
      this.$api.mailList.getGroupChatList()
      .then(res=>{
        this.groupChatList = res.groupDetail;
      })
    },
    routerBack() {
      this.$router.back('-1')
    },
    goGroupChatPage(item) {
      localStorage.setItem('this_groupChatInfo',JSON.stringify(item))
      this.$router.push('/groupChatDetail')
    },
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.groupChatList-wrap {
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
  .list-wrap {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 20/@size;
    width: 100%;
    .oneGroupChat {
      width: 100%;
      height: 80/@size;
      .img-wrap {
        float: left;
        width: 15%;
        height: 80/@size;
        display: flex;
        justify-self: center;
        align-items: center;
        .userHeadImg {
          width: 60/@size;
          height: 60/@size;
          text-align: center;
          line-height: 60/@size;
          font-size: 24/@size;
          background-color: rgb(51,150,251);
          color: white;
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            font-size: 28/@size;
          }
        }
      }
      .text-wrap {
        float: left;
        width: 85%;
        border-bottom: 1px solid #eee;
        height: 80/@size;
        line-height: 80/@size;
        font-size: 24/@size;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
        padding-left: 15/@size;
      }
    }
  }
  .allListNumber {
    width: 100%;
    height: 80/@size;
    line-height: 80/@size;
    text-align: center;
    color: #A4A4A4;
    font-size: 24/@size;
    background-color: #fff;
  }
}
</style>