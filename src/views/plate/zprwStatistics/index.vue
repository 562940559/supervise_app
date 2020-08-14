<template>
  <div class="statisticsWrap">
    <div 
      class="partWrap"
      v-for="(item,index) in statisticsList"
      :key="index"
      @click="toDetail(item.departmentId)"
    >
      <div v-if="false" class="title">
        <span>{{item.depName}}</span>
      </div>
      <div class="contentWrap">
        <ul>
          <li v-if="false">
            <p><van-icon name="manager" />负责人</p>
            <p>{{item.name}}</p>
          </li>
          <li>
            <p><van-icon name="clock" />所有任务</p>
            <p>{{item.allTasksCount}}</p>
          </li>
          <li>
            <p><van-icon name="clock" />已完成任务</p>
            <p>{{item.completedTasksCount}}</p>
          </li>
          <li>
            <p><van-icon name="clock" />超期任务</p>
            <p>{{item.overdueTasksCount}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div style="margin-top: 20px">
      <van-divider>无更多信息</van-divider>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Toast } from 'vant';
export default {
  data() {
    return {
      statisticsList: '',
      power: ''
    }
  },
  methods: {
    toDetail(id) {
      if(this.power == '是') {
        this.$router.push({path: '/zprwStatisticsSecond', query: {id: id}})
      }else {
        Toast('权限不足')
        return false;
      }
    }
  },
  mounted() {
    this.$api.zprwStatistics.getStatisticsList()
    .then(res=>{
      this.statisticsList = res.data;
      this.power = res.isLook;
    })
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.statisticsWrap {
  padding-top: 80/@size;
  min-height: calc(~'100% - 1.07rem');
  background-color: #f7f7f7;
  .partWrap {
    width: 100%;
    height: 110/@size;
    background-color: #fff;
    box-shadow: 0 3/@size 7/@size 0 rgba(0, 0, 0, .05);
    margin-top: 20/@size;
    .title {
      display: inline-block;
      height: 40/@size;
      line-height: 40/@size;
      font-size: 26/@size;
      color: white;
      background-color: #84dfb7;
      padding: 0 20/@size;
      position: relative;
    }
    .title::after {
      content: '';
      position: absolute;
      top: 0;
      right: -40/@size;
      width: 0;
      height: 0;
      border-width: 20/@size;
      border-style: solid;
      border-color: transparent transparent transparent #84dfb7;
    }
    .contentWrap {
      width: 100%;
      height: 110/@size;
      box-sizing: border-box;
      padding: 20/@size 0/@size;
      ul {
        width: 100%;
        height: 100%;
        li {
          float: left;
          width: 32%;
          height: 100%;
          border-right: 1/@size solid #eee;
          p:nth-child(1) {
            font-size: 18/@size;
            text-align: center;
            color: #999;
            i {
              font-size: 24/@size;
              position: relative;
              top: 5/@size;
              left: -8/@size;
            }
          }
          p:nth-child(2) {
            color: #000;
            text-align: center;
            font-size: 20/@size;
            margin-top: 8/@size;
          }
        }
        li:last-child {
          border-right: none
        }
      }
    }
  }
  
}

</style>