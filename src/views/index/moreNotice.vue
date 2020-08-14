<template>
  <div class="moreNoticeWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span class="setting-btn">  
        <van-dropdown-menu active-color="#323232">
          <van-dropdown-item @change="change()" v-model="value" :options="option" />
        </van-dropdown-menu>
      </span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
    >
      <div 
        class="noticeWrap"
        v-for="(item, index) in noticeList"
        :key="index"
        @click="goNoticeDetail(item.theAnnouncement.id)"
      >
        <div class="lineOne">
          <p class="title">{{item.title}}</p>
          <p class="status">
            <span v-if="item.status == '1'" class="unread">未读</span>
            <span v-if="item.status == '2'" class="readed">已读</span>
          </p>
        </div>
        <div class="lineTwo">
          <span>{{timestampToTime(item.theAnnouncement.createTime)}}</span>
          <span>{{item.theAnnouncement.nameOfFounder}}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../utils/aes';
export default {
  data() {
    return {
      value: '0',
      option: [
        { text: '全部', value: '0' },
        { text: '未读', value: '1' },
        { text: '已读', value: '2' }
      ],
      noticeList: [],
      info: {
        status: 0,
        current: 1
      },
      loading: false,
      finished: false,
      offset: 100,
    }
  },
  methods: {
    getNoticeList() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.info)),
        data = `"requestData": "${info}"`;
      this.$api.notice.getNoticeList(data)
      .then(res=>{
        if (JSON.stringify(res.theAnnouncementList[0]) == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.info.current++;
        this.noticeList = this.noticeList.concat(res.theAnnouncementList);
        this.loading = false;
      })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + '-',
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
      D = date.getDate() + ' ';
      return Y+M+D;
    },
    goNoticeDetail(id) {
      this.$router.push({path: '/noticeDetail',query: { id: id }})
    },
    onLoad() {
      this.getNoticeList()
    },
    routerBack() {
      this.$router.back('-1')
    },
    change() {
      this.info.current = 1;
      this.info.status = this.value;
      this.noticeList = [];
      this.getNoticeList();
    }
  },
  created() {
    localStorage.setItem('isIndex',false)
  },
  mounted() {
    this.getNoticeList();
  }
}
</script>
<style lang="less" type="text/less">
@import '../../assets/less/common.less';
.van-dropdown-menu {
  background-color: white;
  height: 80/@size;
}
.van-dropdown-menu__title {
  color: #323232;
}
</style>
<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.moreNoticeWrap {
  padding-top: 80/@size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  // 对顶部导航条进行样式修改
  .top-wrap {
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
    position: fixed;
    top: 0;
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
      height: 80/@size;
      box-sizing: border-box;
      padding-left: 50/@size;
      a {
        color: white;
      }
    }
  }
  .noticeWrap {
    width: 100%;
    height: 120/@size;
    box-sizing: border-box;
    padding: 20/@size 10/@size;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    .lineOne {
      width: 100%;
      height: 40/@size;
      p {
        float: left;
      }
      .title {
        width: 80%;
        height: 40/@size;
        line-height: 40/@size;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 22/@size;
      }
      .status {
        width: 20%;
        height: 40/@size;
        line-height: 40/@size;
        span {
          width: 80/@size;
          display: inline-block;
          height: 40/@size;
          line-height: 40/@size;
          font-size: 20/@size;
          text-align: center;
          border-radius: 20/@size;
          float: right;
        }
        .unread {
          background-color: #d7fbe7;
          color: #03d78f;
        }
        .readed {
          background-color: #f8e1c0;
          color: #ff6c00;
        }
      }
    }
    .lineTwo {
      width: 100%;
      height: 40/@size;
      span {
        display: inline-block;
        height: 40/@size;
        line-height: 40/@size;
        font-size: 18/@size;
        color: #7a7a7a;
      }
      span:nth-child(1) {
        margin-right: 30/@size;
      }
    }
  }
}
</style>