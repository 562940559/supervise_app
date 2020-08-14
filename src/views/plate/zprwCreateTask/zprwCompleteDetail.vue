<template>
  <div class="completedDetailWrap">
    <div class="plateWrap">
      <span>任务名称</span>
      <span @click="showPop2(detailInfo.taskName)">{{detailInfo.taskName}}</span>
    </div>
    <div class="groupWrap">
      <div class="plateWrap">
        <span>开始时间</span>
        <span>{{detailInfo.startTime}}</span>
      </div>
      <div class="plateWrap">
        <span>截止时间</span>
        <span>{{detailInfo.endTime}}</span>
      </div>
    </div>
    <div class="groupWrap">
      <div @click="showPop('content')" class="plateWrap">
        <span>任务内容</span>
        <span><van-icon name="arrow" /></span>
      </div>
    </div>
    <div class="groupWrap">
      <div @click="routerPush('seeFileBasis')" class="plateWrap">
        <span>查看文件依据</span>
        <span><van-icon name="arrow" /></span>
      </div>
      <div class="plateWrap">
        <span>汇报提醒</span>
        <span>{{detailInfo.reportTemplet}}</span>
      </div>
    </div>
    <div class="groupWrap">
      <div class="plateWrap">
        <span>办理人员</span>
        <span>{{detailInfo.transactorNames}}</span>
      </div>
    </div>
    <div class="groupWrap">
      <div @click="showPop('remarks')" class="plateWrap">
        <span>查看备注</span>
        <span><van-icon name="arrow" /></span>
      </div>
    </div>
    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
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
import { Popup } from 'vant';
export default {
  data() {
    return {
      detailInfo: {},
      show: false,
      show2: false,
      showTitle: '',
      showText: '',
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.$api.zprwCreateTask.getCompletedDetail(id)
      .then(res=>{
        this.detailInfo = res;
      })
  },
  methods: {
    showPop(where) {
      this.showTitle = where == 'content' ? '督办内容' : '备注';
      this.showText = where == 'content' ? this.detailInfo.taskContent : this.detailInfo.remark
      this.show = true;
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
    routerPush(where) {
      var id = this.$route.query.id,
        item = this.detailInfo,
        type = '督办任务审批';
      this.$router.push({
        path: `/${where}`,
        query: {
          id: id,
          item: item,
          type: type
        }
      })
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.completedDetailWrap {
  width: 100%;
  background-color: #f7f7f7;
  padding-top: 80/@size;

  .plateWrap {
    width: 100%;
    height: 80/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 10/@size;
    span {
      display: inline-block;
      height: 80/@size;
      line-height: 80/@size;
      font-size: 20/@size;
    }
  }
  .plateWrap span:nth-child(2){
    float: right;
    color: #6e6e6e;
    max-width: 350/@size;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .groupWrap {
    margin-top: 20/@size;
    .plateWrap {
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .groupWrap .plateWrap:last-child {
    border-bottom: none;
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