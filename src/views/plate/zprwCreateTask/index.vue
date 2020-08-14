<template>
  <div class="createTaskWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span class="setting-btn">
        <router-link to="/addZprwNiBan">
          <van-icon name="plus"></van-icon>
        </router-link>
      </span>
    </div>
    <van-tabs @click="onclick" v-model="active">
      <van-tab title="待我拟办">
        <div class="containerWrap">
          <van-swipe-cell 
            v-for="(info, index) in inComplete"
            :key="index" 
            :class="info.status == '待拟办' ? 'success' : 'unSuccess'" 
            right-width:80
            :name="index"
            :on-close="onClose"
          >
            <van-panel 
              :title='inComplete[index].taskName' 
              :desc="inComplete[index].createTime" 
              :status="inComplete[index].status" 
              @click="goInComoketeDetail(inComplete[index].id)"
            />
            <template slot="right">
              <van-button square type="danger" text="删除" />
            </template>
          </van-swipe-cell>
        </div>
      </van-tab>
      <van-tab title="我已拟办">
        <div class="containerWrap">
          <van-panel 
            v-for="(info, index) in completed"
            :key="index"
            :title='completed[index].taskName' 
            :desc="completed[index].createTime" 
            :status="completed[index].status"
            @click="goCompletedDetail(completed[index].id)"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog,Toast } from 'vant';
import * as $api from '@/api';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      active: '0',
      inComplete: {},
      completed: {}
    }
  },
  methods: {
    routerBack() {
      this.$router.back(-1);
    },
    // clickPosition 表示关闭时点击的位置
    onClose(clickPosition, instance, detail) {
      var _this = this;
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？',
            confirmButtonColor: '#02ac61',
            cancelButtonColor: '#02ac61',
          }).then(() => {
            var id = _this.inComplete[detail.name].id,
              index = detail.name;
            var datas = {
              deletedTaskId: id
            }
            var info = aes.encrypt(JSON.stringify(datas));
            let data = `"requestData": "${info}"`
            this.$api.createTask.deleteTask(data)
            .then(res=>{
              if(res.code == '200') {
                Toast.success('删除成功！');
                instance.close();
                _this.inComplete.splice(index,1)
              }else {
                Toast.fail('删除失败！')
              }
            })
          });
          break;
      }
    },
    onclick(name,title) {
      if(name == 0) {
        this.$api.zprwCreateTask.getIncomplete()
        .then(res=>{
          this.inComplete = res.result
        })
      }else {
        this.$api.zprwCreateTask.getComplete()
        .then(res=>{
          this.completed = res.result;
        })
      }
    },
    goCompletedDetail(id) { //查看已拟办详情
      this.$router.push({ path: `/zprwCompletedDetail`,query: { id: id } })
    },
    goInComoketeDetail(id) { //查看待我拟办详情
      this.$api.zprwCreateTask.getInCompleteMissionDetail(id)
      .then(res=>{
        this.$router.push({ path: `/addZprwNiBan`,query: {item: res,id: id} })
      })
    }
  },
  mounted() { //获取列表信息
    this.$api.zprwCreateTask.getIncomplete()
      .then(res=>{
        this.inComplete = res.result;
      })
  }
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.createTaskWrap {
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
.createTaskWrap {
  height: 100%;
  background-color: #f7f7f7;
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
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
      text-align: right;
      position: relative;
      top: 5/@size;
      a {
        color: white;
      }
    }
  }
  .containerWrap {
    position: relative;
    top: -80/@size;
    background: white;
  }
}
</style>