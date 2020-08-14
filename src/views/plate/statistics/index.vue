<template>
  <div class="statisticsWrap">
    <div class="topBG">
      <p>本月任务总数</p>
      <p>{{this.allTask}}</p>
    </div>
    <div class="wrapwrap">
      <div 
        class="partWrap"
        v-for="(item,index) in statisticsList"
        :key="index"
      >
        <div class="title" @click="toDetail(item.departmentId)">
          <b></b>
          <span>{{item.depName}}</span>
          <van-icon name="arrow" />
        </div>
        <div class="contentWrap">
          <ul>
            <li>
              <p>{{item.name}}</p>
              <p>负责人</p>
            </li>
            <li>
              <p>{{item.allTasksCount}}</p>
              <p>所有任务</p>
            </li>
            <li>
              <p>{{item.completedTasksCount}}</p>
              <p>已完成任务</p>
            </li>
            <li>
              <p>{{item.overdueTasksCount}}</p>
              <p>超期任务</p>
            </li>
          </ul>
        </div>
      </div>
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
      power: '',
      allTask: ''
    }
  },
  methods: {
    toDetail(id) {
      if(this.power == '是') {
        this.$router.push({path: '/statisticsSecond', query: {id: id}})
      }else {
        Toast('权限不足')
        return false;
      }
    }
  },
  mounted() {
    this.$api.statistics.getStatisticsList()
    .then(res=>{
      this.statisticsList = res.data;
      this.power = res.isLook;
      this.allTask = res.totalTask;
    })
  },
  created() {
    localStorage.setItem('isIndex',false)
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.statisticsWrap {
  padding-top: 80/@size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  .topBG {
    width: 100%;
    height: 200/@size;
    background: url('../../../../static/img/topBg.png') no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 60/@size;
    p {
      height: 40/@size;
      font-size: 26/@size;
      line-height: 40/@size;
      color: white;
      text-align: center;
    }
    p:nth-child(2) {
      font-size: 50/@size;
      margin-top: 10/@size;
    }
  }
  .wrapwrap {
    width: 100%;
    padding: 0 20/@size;
    box-sizing: border-box;
    .partWrap {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 10/@size 20/@size;
      box-shadow: 0 3/@size 7/@size 0 rgba(0, 0, 0, .05);
      margin-top: 20/@size;
      border-top: 3px solid;
      border-color: #508EF9;
      .title {
        color: #323232;
        height: 60/@size;
        line-height: 30/@size;
        font-size: 22/@size;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-bottom: 10/@size;
        b {
          display: inline-block;
          width: 10/@size;
          height: 10/@size;
          border-radius: 10/@size;
          border: 3px solid #508EF9;
          margin-right: 30/@size;
        }
        span {
          flex: 1;
        }
        i {
          float: right;
        }
      }
      .contentWrap {
        width: 100%;
        height: 110/@size;
        box-sizing: border-box;
        padding-top: 30/@size;
        ul {
          width: 100%;
          height: 100%;
          li {
            float: left;
            width: 25%;
            height: 100%;
            p:nth-child(1) {
              font-size: 20/@size;
              text-align: center;
              color: #323232;
            }
            p:nth-child(2) {
              color: #999999;
              text-align: center;
              font-size: 18/@size;
              margin-top: 8/@size;
            }
          }
          li:last-child {
            p:nth-child(1) {
              color: #FF0000;
            }
          }
        }
      }
    }
  }
  
}

</style>