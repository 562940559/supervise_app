<template>
  <div class="missionDetailWrap">
    <div class="title">
      <p>基本信息</p>
    </div>
    <div class="plateWrap">
      <span>督办事项</span>
      <span @click="showPop2(missionDetail.supervisoryItems)">{{missionDetail.supervisoryItems}}</span>
    </div>
    <div class="plateWrap">
      <span>督办截止时间</span>
      <span>{{missionDetail.endTime}}</span>
    </div>
    <div class="plateWrap">
      <span>牵头负责人</span>
      <span>{{missionDetail.leadingPerson}}</span>
    </div>
    <div class="plateWrap">
      <span>配合处室负责人</span>
      <span>{{missionDetail.responsiblePerson}}</span>
    </div>
    <div class="plateWrap">
      <span>分管领导</span>
      <span>{{missionDetail.leadingName}}</span>
    </div>
    <div @click="routerPush('seeFileBasis')" class="plateWrap">
      <span>查看文件依据</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <div @click="routerPush('processingProcess')" class="plateWrap">
      <span>查看办理流程</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <div @click="routerPush('leadingReport')" class="plateWrap">
      <span>查看牵头汇报情况</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <div @click="routerPush('coordinationReport')" class="plateWrap">
      <span>查看配合汇报情况</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <div @click="routerPush('handleReport')" class="plateWrap">
      <span>查看办理汇报情况</span>
      <span><van-icon name="arrow" /></span>
    </div>
    <van-popup v-model="show2">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as $api from '@/api';
export default {
  data() {
    return {
      missionDetail: '',
      show2: false,
      showTitle: '',
      showText: '',
    }
  },
  methods: {
    routerPush(where) {
      let id = this.$route.query.id;
      this.$router.push({path:`/${where}`,query:{item: this.missionDetail,id: id,type: '督办任务审批'}})
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
  },
  mounted() {
    let id = this.$route.query.id;
    this.$api.mineMission.getMineMissionDetail(id)
    .then(res=>{
      this.missionDetail = res;
    })
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.missionDetailWrap {
  width: 100%;
  padding-top: 80/@size;
  min-height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;
  .title {
    width: 100%;
    height: 60/@size;
    line-height: 60/@size;
    box-sizing: border-box;
    padding: 0 10/@size;
    font-size: 24/@size;
    color: #333;
  }
  .plateWrap {
    width: 100%;
    height: 70/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 10/@size;
    color: #6e6e6e;
    border-bottom: 1px solid #f7f7f7;
    span {
      display: inline-block;
      height: 70/@size;
      line-height: 70/@size;
      font-size: 20/@size;
    }
    span:nth-child(2){
      float: right;
      color: #000;
      max-width: 350/@size;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .popWrap {
    background-color: #fff;
    padding: 50/@size;
    position: relative;
    border-radius: 50/@size;
    p {
      width: 300/@size;
    }
  }
  .popWrap p:nth-child(1) { 
    text-align: center;font-size: 22/@size;color: #000;
    margin-bottom: 20/@size;
  }
  .popWrap p:nth-child(2) {
    word-wrap: break-word;
    color: #737373;
    font-size: 20/@size;
  }
}
</style>