<template>
  <div class="reportWrap">
    <div class="plateOne-wrap">
      <div class="plateOne-cont">
        <div class="top">
          <div class="img-wrap">
            <img src="../../../../static/img/mineMission/hb.png" alt="">
          </div>
          <div class="txt-wrap">
            <p @click="showPop2(reportInfo.superviseHandleMatter)">{{reportInfo.superviseHandleMatter}}</p>
          </div>
        </div>
        <div class="cont">
          <p>督办截止时间：<span>{{reportInfo.appointedTaskReportTime}}</span></p>
          <p>是否超期：<span>{{reportInfo.ifOverdue}}</span></p>
          <p>办理时间：<span>{{reportInfo.reportTime}}</span></p>
          <p>工作完成情况：<span>{{reportInfo.completionWork}}%</span></p>
          <p>牵头负责人：<span>{{reportInfo.leadingPerson}}</span></p>
          <p>配合处室负责人：<span>{{reportInfo.responsiblePerson}}</span></p>
          <p>办理人员：<span>{{reportInfo.undertakerPerson}}</span></p>
        </div>
      </div>
    </div>
    <div class="plateTwo-wrap">
      <div class="plateTwo-cont">
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckdcdb.png" alt=""></div>
          <div class="text-wrap">
            <p @click="seeDetail(reportInfo.distributionExplain)">查看分配说明<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckwjyj.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('/seeFileBasis')">查看文件依据<van-icon name="arrow" /></p>
          </div>
        </div>
      </div>
    </div>
    <div class="reportInfo">
      <div class="textareaWrap">
        <p>工作落实情况</p>
        <textarea cols="50" disabled v-model="reportInfo.implementationWork"></textarea>
      </div>
      <p class="fileWrapTitle">
        <img src="../../../../static/img/mineMission/fj.png" alt="">附件
      </p>
      <p class="whetherHave" v-show="this.files.length == 0">暂无</p>
      <div 
        class="descriptionWrap"
        v-for="(file, index) in files"
        :key="index"
        @click="download(file)"
      >
        <span class="imgWrap">
          <img 
            src="../../../assets/img/plate/createTask/doc.png" alt="doc"
            v-if="file.oldFileName.split('.')[1] == 'doc' || file.oldFileName.split('.')[1] == 'docx'"
          >
          <img 
            src="../../../assets/img/plate/createTask/xls.png" alt="xls"
            v-if="file.oldFileName.split('.')[1] == 'xls' || file.oldFileName.split('.')[1] == 'xlsx'"
          >
          <img 
            src="../../../assets/img/plate/createTask/pdf.png" alt="pdf"
            v-if="file.oldFileName.split('.')[1] == 'pdf'"
          >
          <img 
            src="../../../assets/img/plate/createTask/png.png" alt="png"
            v-if="file.oldFileName.split('.')[1] == 'png'"
          >
          <img 
            src="../../../assets/img/plate/createTask/jpg.png" alt="jpg"
            v-if="file.oldFileName.split('.')[1] == 'jpg'"
          >
          <img 
            src="../../../assets/img/plate/createTask/default.png" alt="default"
            v-else
          >
        </span>
        <span>{{file.oldFileName}}</span>
      </div>
    </div>
    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>分配说明</p>
        <p>{{popContent}}</p>
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
import axios from '@/utils/http';
import base from '@/api/base';
import { Toast } from 'vant';
export default {
  data() {
    return {
      reportId: '',
      reportInfo: '',
      files: [],
      show: false,
      popContent: '',
      show2: false,
      showTitle: '',
      showText: '',
    }
  },
  mounted() {
    this.reportId = this.$route.query.id;
    this.getReportDetail();
  },
  methods: {
    goReportList() {
      let id = this.reportId;
      this.$router.push({path: '/undertakeReportList',query: {id: id}})
    },
    getReportDetail() {
      let id = this.reportId;
      this.$api.undertakeMission.getReportDetail(id)
      .then(res => {
        if(res.code == '200') {
          this.reportInfo = res,
          this.files = res.fileData;
        }else {
          return false
        }
      })
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
    seeDetail(item) {
      this.show = true;
      this.popContent = item;
    },
    goOther(where) {
      this.$router.push({path: `${where}`,query: {item: this.reportInfo,id: this.reportId,type: '牵头任务审批'}})
    },
    download(file) {
      let fileId = file.id,
        filename = file.oldFileName;
      if(file.fileType == '7') {
        axios({
          method: 'post',
          url: `${base.baseUrl}/app/getDocumentsFilePath/${fileId}`,
        }) 
        .then(res => {
          var path = res.msg;
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
            console.log(path,filename)
          }
        })
      }else {
        axios({
          method: 'post',
          url: `${base.baseUrl}/app/getFilePath/${fileId}`,
        }) 
        .then(res => {
          var path = `${base.baseUrl}${res.msg}`;
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
            console.log(path,filename)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.reportWrap {
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 80/@size;
  padding-bottom: 20/@size;
  background-color: #f7f7f7;
  .plateOne-wrap {
    margin: 20/@size 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20/@size;
    .plateOne-cont {
      width: 100%;
      padding: 0 20/@size 10/@size 20/@size;
      box-sizing: border-box;
      background-color: #fff;
      min-height: 250/@size;
      .top {
        width: 100%;
        height: 100/@size;
        border-bottom: 1px solid #eee;
        .img-wrap {
          float: left;
          width: 80/@size;
          height: 100/@size;
          display: flex;
          align-items: center;
          img {
            width: 60/@size;
            height: 60/@size;
          }
        }
        .txt-wrap {
          float: left;
          max-width: 350/@size;
          height: 100/@size;
          p {
            overflow: hidden;
            height: 100/@size;
            line-height: 100/@size;
            font-size: 24/@size;
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family:Source Han Sans CN;
          }
        }
      }
      .cont {
        p {
          width: 100%;
          height: 40/@size;
          line-height: 40/@size;
          font-size: 18/@size;
          color: #A4A4A4;
          span {
            color: #323232;
          }
        }
      }
    }
  }

  .plateTwo-wrap {
    padding: 0 20/@size;
    .plateTwo-cont {
      background-color: #fff;
      padding: 0 20/@size;
      .onePlate:last-child{
        border-bottom: none;
      }
      .onePlate {
        width: 100%;
        height: 60/@size;
        border-bottom: 1px solid #eee;
        .img-wrap {
          width: 50/@size;
          height: 60/@size;
          display: flex;
          align-items: center;
          float: left;
          img {
            width: 30/@size;
            height: 30/@size;
          }
        }
        .text-wrap {
          p {
            font-size: 20/@size;
            height: 60/@size;
            width: 100%;
            line-height: 60/@size;
            color: #323232;
          }
          i {
            position: relative;
            top: 23/@size;
            float: right;
          }
        }
      }
    }
  }
  .reportInfo {
    margin-top: 20/@size;
    box-sizing: border-box;
    padding: 0 20/@size;
    .textareaWrap {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10/@size 10/@size 10/@size; 
      background-color: #fff;
      p {
        width: 100%;
        height: 60/@size;
        line-height: 60/@size;
        font-size: 20/@size;
      }
      textarea {
        width: 100%;
        height: 220/@size;
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 5/@size;
        background-color: #fff;
      }
    }
  }
  .whetherHave {
    width: 100%;
    height: 80/@size;
    line-height: 80/@size;
    text-align: center;
    background-color: #fff;
    color: #323232;
    font-size: 24/@size;
    border-top: 1px solid #eee;
  }
  .fileWrapTitle {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10/@size;
    width: 100%;
    height: 60/@size;
    line-height: 60/@size;
    background-color: #fff;
    font-size: 22/@size;
    margin-top: 20/@size;
    display: flex;
    align-items: center;
    >img {
      width: 30/@size;
      height: 30/@size;
      margin-right: 20/@size;
    }
    span {
      float: right;
      font-size: 20/@size;
      color: #888;
      i {
        position: relative;
        top: 2/@size;
      }
    }
  }
  .descriptionWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 0 10/@size 0 40/@size;
    border-bottom: 1px solid #e5e5e5;
    border-bottom: 1px solid #dcdcdc;
    background-color: #fff;
    span {
      display: inline-block;
      width: 370/@size;
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