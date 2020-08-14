<template>
  <div class="statuteWrap">
    <!-- 检索框 -->
    <div class="retrieval-wrap">
      <van-dropdown-menu active-color="#02ac61">
        <van-dropdown-item @change="changeDropdown(value)" v-model="value" :options="option" />
      </van-dropdown-menu>
      <input v-model="info.keyword" type="text" placeholder="请输入查询内容">
      <button @click="search()" class="sure-btn">检索</button>
    </div>
    <!-- 检索内容 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
      v-if="show"
    >
      <div
        class="content-wrap"
        v-for="(item,index) in dataList"
        :key="index"
        @click="goDetail(item)"
      >
        <div 
          class="title"
          v-html="item.title"
        ></div>
        <div 
          class="content"
          v-html="item.content"
        ></div>
        <div class="info">
          <p>
            <span class="type">[{{item.typeName}}]</span>
            <span class="creator">创建人：{{item.creator}}</span>
          </p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import * as $api from '@/api';
import axios from '@/utils/http';
import { Toast } from 'vant';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      allMore: true,
      value: '',
      option: [
        { text: '全部', value: '' },
        { text: '国家法规', value: '国家法规' },
        { text: '四川省法规', value: '四川省法规' },
        { text: '新区制度', value: '新区制度' }
      ],
      info: {
        keyword: '',
        lawCategory: '',
        page: 1,
        limit: 4,
      },
      loading: false,
      finished: false,
      offset: 100,
      show: false,
      dataList: [],
    }
  },
  mounted() {
    this.show = true;
    this.getStatuteList()
  },
  created() {
    localStorage.setItem('isIndex',false)
  },
  methods: {
    routerBack() {
      this.$router.back('-1');
    },
    loadingAnimation(time) {
      Toast.loading({
        mask: false,
        message: '下载中...',
        duration: time,
        forbidClick: true
      });
    },
    getStatuteList() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.info));
      let data = `"requestData": "${info}"`
      this.$api.work.getStatuteList(data)
      .then(res=>{
        if(res.items == undefined) {
          this.loading = false;
          this.finished = true;
        }else {
          this.info.page++;
          this.dataList = this.dataList.concat(res.items);
          this.loading = false;
        }
      })
    },
    search() {
      this.show = true;
      this.info.page = 1;
      this.dataList = [];
      this.getStatuteList()
    },
    onLoad() {
      this.getStatuteList();
    },
    changeDropdown(value) {
      this.info.lawCategory = value;
    },
    goDetail(item) {
      let that = this;
      var path = `https://zhjj.cdaudit.cn:9002/knowledge/download/${item.id}`;
      var filename = item.title;
      if(window.plus) {
        // 判断文件是否已经下载
        plus.io.resolveLocalFileSystemURL(
          '_downloads/' + filename,
          function (entry) {
            //如果已存在文件，则打开文件
            if (entry.isFile) {
              Toast("正在打开文件...");
              plus.runtime.openFile('_downloads' + filename);
            }
          }, 
          function () {
            //如果未下载文件，则下载后打开文件
            that.loadingAnimation(0)
            var dtask = plus.downloader.createDownload(
              path, 
              {
                filename: '_downloads' + filename
              },
              function (d, status) {
                if (status == 200) {
                  plus.runtime.openFile( '_downloads' + filename );
                  that.loadingAnimation(100)
                  Toast('下载成功')
                }
                else {
                  Toast("文件不存在: " + status);
                  that.loadingAnimation(100)
                }
              }
            );
            dtask.start();
          }
        );
      }
      else {
        console.log(path,filename,item)
      }
    }
  },
}
</script>

<style lang="less" type="text/less">
@import '../../../assets/less/common.less';
.statuteWrap {
  .van-dropdown-menu__item {
    border: 1px solid #eee;
  }
  .van-dropdown-menu {
    width: 140/@size;
    height: 60/@size;
    position: absolute;
    border: none;
  }
  .van-dropdown-menu__title {
    padding: 0;
    padding-right: 8/@size;
    font-size: 20/@size;
  }
}
</style>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.statuteWrap {
  padding-top: 80/@size;
  min-height: 100%;
  box-sizing: border-box;
  .retrieval-wrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 20/@size;
    position: relative;
    i {
      position: absolute;
      left: 40/@size;
      top: 35/@size;
      color: rgb(167,167,167);
      font-size: 30/@size;
    }
    input {
      height: 60/@size;
      width: 100%;
      box-sizing: border-box;
      padding: 10/@size 120/@size 10/@size 160/@size;
      background-color: #eee;
      border: none;
      font-size: 22/@size;
    }
    .sure-btn {
      width: 100/@size;
      height: 60/@size;
      position: absolute;
      right: 20/@size;
      top: 20/@size;
      background-color: #6adac9;
      color: white;
      text-align: center;
      font-size: 22/@size;
      padding: 0;
      margin: 0;
      border: none;
    }
  }
  .content-wrap {
    width: 100%;
    height: 200/@size;
    box-sizing: border-box;
    padding: 15/@size;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 22/@size;
      height: 40/@size;
      line-height: 40/@size;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .content {
      font-size: 20/@size;
      height: 80/@size;
      margin-top: 10/@size;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .info,.info p {
      width: 100%;
      font-size: 20/@size;
      margin: 10/@size 0;
      span {
        display: inline-block;
        height: 40/@size;
        line-height: 40/@size;
      }
      .type {
        color: #ff9000;
        margin-right: 20/@size;
      }
      .creator {
        color: #aaaaaa;
      }
    }
  }
}
</style>