<template>
  <div class="cycleWrap">
    <div 
      class="cycleContent"
      v-for="(item,index) in cycleContent"
      :key="index"
    >
      <div class="imgWrap">
        <img src="../../../../static/img/createTask/cycle.png" alt="">
      </div>
      <div class="textWrap">
        <span>{{index+1}}期任务</span>
        <span>汇报截止时间：{{item}}</span>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <van-divider>已经到底了</van-divider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cycleContent: [],
      type: ''
    }
  },
  mounted() {
    this.cycleContent = this.cycleContent.concat(this.$route.query.item.reportingPeriod)
    if(this.cycleContent[0].length > 10) {
      this.cycleContent = this.$route.query.item.reportingPeriod.split(',');
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.cycleWrap {
  padding-top: 80/@size;
  .cycleContent {
    background-color: #fff;
    box-sizing: border-box;
    height: 80/@size;
    width: 100%;
    padding: 0 10/@size;
    display: flex;
    border-bottom: 1px solid #dcdcdc;
    .imgWrap {
      width: 100/@size;height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50/@size;height: 45/@size;
      }
    }
    .textWrap {
      flex: 1;
      font-size: 20/@size;
      span {
        display: inline-block;
        height: 80/@size;
        line-height: 80/@size;
      }
      span:nth-child(2) {
        float: right;
      }
    }
  }
}
</style>