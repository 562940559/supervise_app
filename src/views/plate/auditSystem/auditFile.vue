<template>
  <div class="fileBasisWrap">
    <div class="descriptionWrap"
      @click="download()"
    >
      <span class="imgWrap">
        <img 
          src="../../../assets/img/plate/createTask/doc.png" alt="doc"
          v-if="fileList.fileFormerName.split('.')[1] == 'docx'"
        >
        <img 
          src="../../../assets/img/plate/createTask/xls.png" alt="xls"
          v-if="fileList.fileFormerName.split('.')[1] == 'xlsx' || fileList.fileFormerName.split('.')[1] == 'xls'"
        >
        <img 
          src="../../../assets/img/plate/createTask/pdf.png" alt="pdf"
          v-if="fileList.fileFormerName.split('.')[1] == 'pdf'"
        >
        <img 
          src="../../../assets/img/plate/createTask/png.png" alt="png"
          v-if="fileList.fileFormerName.split('.')[1] == 'png'"
        >
        <img 
          src="../../../assets/img/plate/createTask/jpg.png" alt="jpg"
          v-if="fileList.fileFormerName.split('.')[1] == 'jpg'"
        >
      </span>
      <span>{{fileList.fileFormerName}}</span>
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
      fileList: {}
    }
  },
  created() {
    this.fileList = this.$route.query.file;
  },
  methods: {
    download(file) {
      let fileId = this.fileList.id,
        filename = this.fileList.fileFormerName;
      axios({
        method: 'post',
        url: `${base.baseUrl}/app/index/audit/projectQuery/getFile/${fileId}`,
      }) 
      .then(res => {
        var path = `https://zhjj.cdaudit.cn:9004${res.msg}`;
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
              var dtask = plus.downloader.createDownload(
                path, 
                {
                  filename: '_downloads' + filename
                },
                function (d, status) {
                  Toast('进入下载环节')
                  if (status == 200) {
                    plus.runtime.openFile( '_downloads' + filename );
                    Toast('下载成功')
                  }
                  else {
                    Toast("下载失败: " + status);
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
@import '../../../assets/less/common.less';
.fileBasisWrap {
  width: 100%;
  padding-top: 80/@size;

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
      white-space: nowrap;
      text-overflow: ellipsis;
      height: 100/@size;
      line-height: 100/@size;
      font-size: 20/@size;
    }
    .imgWrap {
      width: 50/@size;
      margin-right: 10/@size;
      text-align: center;
      box-sizing: border-box;
      padding-top: 20/@size;
      img {
        width: 50/@size;
        height: 60/@size;
      }
    }
  }
}
</style>