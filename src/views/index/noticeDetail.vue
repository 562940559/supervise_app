<template>
  <div class="noticeDetailWrap">
    <div class="wrap">
      <div class="title">{{info.title}}</div>
      <div class="info">
        <span>{{info.nameOfFounder}}</span>
        <span>{{info.createTime}}</span>
      </div>
      <div class="numberInfo">
        {{info.read}}人已读，{{info.unread}}人未读
      </div>
      <div class="content">
        {{info.content}}
      </div>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      info: ''
    }
  },
  methods: {
    getNoticeDetail(id) {
      var id = id;
      this.$api.notice.getNoticeDetail(id)
      .then(res=>{
        this.info = res.theAnnouncement;
      })
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.getNoticeDetail(id)
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.noticeDetailWrap {
  height: 100%;
  background-color: #f7f7f7;
  .wrap {
    padding: 100/@size 10/@size 0 10/@size;
    .title {
      width: 80%;
      height: 60/@size;
      line-height: 60/@size;
      font-size: 24/@size;
      color: #000;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .info {
      span {
        font-size: 16/@size;
        color: #707070;
        display: inline-block;
        height: 40/@size;
        line-height: 40/@size;
      }
      span:nth-child(1) {
        margin-right: 20/@size;
      }
    }
    .numberInfo {
      font-size: 16/@size;
      color: #707070;
      display: inline-block;
      height: 40/@size;
      line-height: 40/@size;
    }
    .content {
      margin-top: 20/@size;
      font-size: 22/@size;
    }
  }
}
</style>