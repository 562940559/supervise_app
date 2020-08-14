<template>
  <div class="chatFile-wrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="route-title" @click="routerBack()"><van-icon name="arrow-left" />
        <span>{{$route.meta.title}}</span>
      </span>
    </div>
    <div class="descriptionWrap"
      v-for="(file, index) in fileList"
      :key="index"
      @click="download(file)"
    >
      <span class="imgWrap">
        <img 
          src="../../assets/img/plate/createTask/default.png" alt="default"
        >
      </span>
      <span>
        <b>{{file.fileName}}</b>
        <b>{{file.uploadTime}}   来自：<font>{{file.uploader}}</font></b>
      </span>
    </div>
    <div style="margin-top: 20px;">
      <van-divider>已经到底了</van-divider>
    </div>
  </div>
</template>

<script>
import * as $api from '@/api';
import axios from '@/utils/http';
import base from '@/api/base'; // 导入接口域名列表
import { Toast } from 'vant';
export default {
  data() {
    return {
      fileList: {},
    }
  },
  created() {
    let groupId = this.$route.query.item.id;
    this.$api.chat.getGroupChatFile(groupId)
    .then(res=>{
      this.fileList = res.groupFile;
    })
  },
  mounted() {
  },
  methods: {
    routerBack() {
      this.$router.back('-1')
    },
    loadingAnimation(time) {
      Toast.loading({
        mask: false,
        message: '下载中...（请勿切换至后台）',
        duration: time,
        forbidClick: true
      });
    },
    download(file) {
      let fileId = file.id,
        filename = file.fileName;
      let that = this;
      axios({
        method: 'get',
        url: `${base.baseUrl}/app/chat/downloadFile/${fileId}`,
      }) 
      .then(res => {
        var path = `${base.baseUrl}${res.fileUrl}`;
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
                  Toast('进入下载环节')
                  if (status == 200) {
                    plus.runtime.openFile( '_downloads' + filename );
                    that.loadingAnimation(100)
                    Toast('下载成功')
                  }
                  else {
                    Toast("下载失败: " + status);
                    that.loadingAnimation(100)
                  }
                }
              );
              dtask.start();
            }
          );
        }
        else {
          console.log(path)
        }
      })
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../assets/less/common.less';
.chatFile-wrap {
  width: 100%;
  padding-top: 80/@size;
  box-sizing: border-box;
  min-height: 100%;
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
      i {
        font-size: 30/@size;
        position: relative;
        top: 4/@size;
        left: -5/@size;
      }
    }
  }

  .descriptionWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 0 40/@size;
    border-bottom: 1/@size solid #dcdcdc;
    span {
      display: inline-block;
      width: 400/@size;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 100/@size;
      font-size: 20/@size;
      b {
        display: inline-block;
        width: 100%;
        height: 40/@size;
        line-height: 40/@size;
        font-size: 20/@size;
        font-weight: 400;
        box-sizing: border-box;
        padding: 10/@size 20/@size;
        font {
          color: #148DDA;
        }
      }
      b:nth-child(1) {
        font-size: 24/@size;
      }
    }
    .imgWrap {
      width: 50/@size;
      margin-right: 10/@size;
      text-align: center;
      box-sizing: border-box;
      padding-top: 20/@size;
      line-height: 100/@size;
      img {
        width: 50/@size;
        height: 60/@size;
      }
    }
  }
}
</style>