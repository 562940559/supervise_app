<template>
  <div class="setGroupChatName-wrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="route-title" @click="routerBack()"><van-icon name="arrow-left" />
        <span>{{$route.meta.title}}</span>
      </span>
    </div>
    <div class="input-wrap">
      <input type="text" maxlength="15" v-model="items.groupName" placeholder="请输入修改的群名称">
      <button @click="sureName()">确定</button>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Toast } from 'vant';
export default {
  data() {
    return {
      items: {

      }
    }
  },
  methods: {
    routerBack() {
      this.$router.back('-1')
    },
    sureName() {
      if(this.items.groupName == '') {
        Toast('群名称不能为空')
        return false
      }
      let id = this.items.id;
      let data = {
        groupName: this.items.groupName
      };
      
      this.$api.chat.setGroupChatName(id,data)
      .then(res=>{
        if(res.code == '200') {
          Toast('修改成功')
          localStorage.setItem('this_groupChatInfo',JSON.stringify(this.items))
          let evenItem = JSON.parse(localStorage.getItem('list'))
          evenItem['groupId'+this.items.id][evenItem['groupId'+this.items.id].length-1].groupName = this.items.groupName
          localStorage.setItem('list',JSON.stringify(evenItem))
        }else {
          Toast(res.msg)
        }
      })
    }
  },
  created() {
    this.items = JSON.parse(localStorage.getItem('this_groupChatInfo'));
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.setGroupChatName-wrap {
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
  .input-wrap {
    width: 100%;
    height: 80/@size;
    input {
      width: 100%;
      height: 60/@size;
      line-height: 40/@size;
      border: none;
      background-color: #fff;
      font-size: 20/@size;
      color: #333;
      box-sizing: border-box;
      padding: 10/@size;
      float: left;
    }
    button {
      float: right;
      width: 100/@size;
      height: 60/@size;
      border: none;
      background-color: rgb(3,172,97);
      color: white;
      position: relative;
      top: -60/@size;
      font-size: 24/@size;
    }
  }
}
</style>