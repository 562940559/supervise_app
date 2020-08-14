<template>
  <div class="searchMission-wrap">
    <div class="searchInput-wrap">
      <form action="/">
        <van-search
          v-model="requestPara.name"
          placeholder="请输入关键字"
          @search="onSearch"
          shape="round"
          input-align="center"
        />
      </form>
    </div>
    <div 
      class="list-wrap"
      v-for="(item,index) in this.addressBooks"
      :key="index"
      @click="goPersonalDetail(item)"
    >
      <div>
        <p class="userHeadImg">{{formatUserHeadImg(item.name)}}</p>
      </div>
      <div>
        <p>{{item.name}}<span>{{item.roleName}}</span></p>
      </div>
    </div>
    <div style="padding: 20px 0">
      <van-divider>没有更多了</van-divider>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import aes from '../../utils/aes';
import { Search  } from 'vant';
export default {
  data() {
    return {
      requestPara: {
        name: '',
      },
      addressBooks: [],
    }
  },
  created() {
    localStorage.setItem('isIndex',false)
  },
  mounted() {

  },
  methods: {
    formatUserHeadImg(name) {
      if(name) {
        if(name.length <= 2) {
          return name.substring(0, 2)
        }if(name.length == 3) {
          return name.substring(1,3)
        }if(name.length > 3) {
          return name.substring(2,4)
        }
      }
    },
    getSearchResultList() {
      var info = aes.encrypt(JSON.stringify(this.requestPara)),
      data = `"requestData": "${info}"`;
      this.$api.mailList.getMailTitle(data)
      .then(res=>{
        this.addressBooks = this.addressBooks.concat(res.addressBooks);
      })
    },
    goPersonalDetail(item) {
      localStorage.setItem('card',JSON.stringify(item))
      this.$router.push({path: '/businessCard',query: {personalInfo: item}})
    },
    onSearch() {
      this.addressBooks = [];
      this.getSearchResultList();
    },
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.searchMission-wrap {
  min-height: 100%;
  width: 100%;
  padding-top: 160/@size;
  box-sizing: border-box;
  background-color: rgb(249,249,249);
  .searchInput-wrap {
    width: 100%;
    padding: 10/@size 20/@size 20/@size 20/@size;
    height: 80/@size;
    box-sizing: border-box;
    background-color: #fff;
    position: fixed;
    top: 80/@size;
    -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
    -moz-box-shadow:0px 3px 3px #c8c8c8 ;
    box-shadow:0px 3px 3px #c8c8c8 ;
    z-index: 999;
  }
  .list-wrap {
    height: 125/@size;
    box-sizing: border-box;
    width: 100%;
    padding: 25/@size 0 0/@size 20/@size;
    div {
      float: left;
    }
    div:nth-child(1) {
      margin-right: 20/@size;
      width: 70/@size;
      height: 75/@size;
      text-align: center;
      position: relative;
    }
    .userHeadImg {
      width: 50/@size;
      height: 50/@size;
      text-align: center;
      line-height: 50/@size;
      font-size: 15/@size;
      background-color: rgb(51,150,251);
      color: white;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      margin-top: -25/@size;
      left: 50%;
      margin-left: -25/@size;
    }
    p {
      height: 75/@size;
      line-height: 75/@size;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      width: 410/@size;
      font-size: 24/@size;
      font-family:Source Han Sans CN;
      span {
        display: inline-block;
        margin-left: 10/@size;
        padding: 0 10/@size;
        height: 25/@size;
        line-height: 25/@size;
        border: 1px solid #22AC38;
        color: #02AC61;
        font-size: 18/@size;
        border-radius: 10/@size;
      }
    }
  }
}
</style>