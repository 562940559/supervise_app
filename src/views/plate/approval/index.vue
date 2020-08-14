<template>
  <div class="approvalWrap">
    <van-tabs @click="onclick()" v-model="active">
      <van-tab title="待我审批">
        <div
          class="containerWrap"
          v-for="(item,index) in pendingApprovalList"
          :key="index"
          @click="goPendingApprovalDetail(item.type,item.id)"
        >
          <div class="lineOne">
            <p>{{item.supervisoryItems}}</p>
            <p>{{item.reportTime}}</p>
          </div>
          <div style="clear: both;"></div>
          <div class="lineTwo">
            <p>
              <span>{{item.type}}</span>
              <span>{{item.reportName}}</span>
            </p>
          </div>
        </div>
        <div class="dividerWrap">
          <van-divider>已经到底了</van-divider>
        </div>
      </van-tab>
      <van-tab title="我已审批">
        <div
          class="containerWrap"
          v-for="(item,index) in approvedList"
          :key="index"
          @click="goApprovedDetail(item.type,item.id)"
        >
          <div class="lineOne">
            <p>{{item.supervisoryItems}}</p>
            <p>{{item.reportTime}}</p>
          </div>
          <div style="clear: both;"></div>
          <div class="lineTwo">
            <p>
              <span>{{item.type}}</span>
              <span>{{item.reportName}}</span>
            </p>
          </div>
        </div>
        <div class="dividerWrap">
          <van-divider>已经到底了</van-divider>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      active: '1',
      pendingApprovalList: '',
      approvedList: '',
    }
  },
  mounted() {
    this.$api.approval.getPendingApprovalList()
    .then(res=>{
      this.pendingApprovalList = res.approvalList;
    })
  },
  methods: {
    onclick(name,title) {
      if(name == 0) {
        this.$api.approval.getPendingApprovalList()
        .then(res=>{
          this.pendingApprovalList = res.approvalList
        })
      }else {
        this.$api.approval.getApprovedList()
        .then(res=>{
          this.approvedList = res.approvalList;
        })
      }
    },
    goPendingApprovalDetail(type,id) {
      this.$router.push({ path: '/pendingApprovalDetail',query: {type: type,id: id} })
    },
    goApprovedDetail(type,id) {
      this.$router.push({ path: '/approvedDetail',query: {type: type,id: id} })
    }
  },
}
</script>


<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.approvalWrap {
  // vant的tab样式修改
  .van-tabs,.van-tabs--line {
    z-index: 999!important;
    position: relative;
    top: 75/@size;
  }
  .van-tabs__nav--line {
    background-color: #02ac61;
  }
  .van-tab, .van-tag--large {
    font-size: 22/@size;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 80/@size;
  }
  .van-tab {
    line-height: 80/@size;
    color: #82d88f;
  }
  .van-tab--active {
    color: white;
  }
  .van-tabs__line {
    background-color: white;
    bottom: 16px;
    height: 2px;
  }
  .van-tabs__content {
    position: relative;
    top: 80/@size;
  }
  // vant的swiper-cell样式修改
  .van-cell,.van-panel__header {
    padding: 20/@size 10/@size;
  }
  .van-cell__title,.van-panel__header-value {
    font-size: 20/@size;
  }
  .van-panel__header-value>span {
    padding: 0 10/@size;
    border-radius: 10/@size;
  }
  .van-panel,.van-cell-group,.van-cell { background: none; }
  .van-swipe-cell__right>.van-button {
    width: 80px;
    height: 100/@size;
    font-size: 20/@size;
  }
  .van-cell__label { font-size: 16/@size; }
  .success .van-panel__header-value>span {
    color: #02ac61;
    background-color: #dcf7e4;
  }
  .unSuccess .van-panel__header-value>span {
    color: #ff0000;
    background-color: #f8c3c3;
  }
}
</style>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.approvalWrap {
  .dividerWrap {
    position: relative;
    top: -60/@size;
  }
  .containerWrap {
    position: relative;
    top: -80/@size;
    border-bottom: 2/@size solid #efefef;
    height: 130/@size;
    box-sizing: border-box;
    padding: 20/@size 10/@size;
    .lineOne {
      p { float: left;color: #000;font-size: 24/@size;height: 50/@size;line-height: 50/@size; }
      p:nth-child(1) { width: 75%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; }
      p:nth-child(2) { float: right;color: #7a7a7a;font-size: 18/@size; }
    }
    .lineTwo {
      p {
        span {
          display: inline-block;
          height: 40/@size;
          line-height: 40/@size;
          font-size: 20/@size;
          color: #ff9600;
        }
        span:nth-child(2) { font-size: 18/@size;margin-left: 10/@size;color:#7a7a7a; }
      }
    }
  }
}

</style>