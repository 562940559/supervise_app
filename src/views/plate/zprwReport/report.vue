<template>
  <div class="reportWrap">
    <div class="plateOne-wrap">
      <div class="plateOne-cont">
        <div class="top">
          <div class="img-wrap">
            <img src="../../../../static/img/mineMission/hb.png" alt="">
          </div>
          <div class="txt-wrap">
            <p @click="showPop2(reportInfo.taskName)">{{reportInfo.taskName}}</p>
            <p>等待汇报</p>
          </div>
        </div>
        <div class="cont">
          <p>开始截止时间：<span>{{reportInfo.startTime}}-{{reportInfo.endTime}}</span></p>
          <p>指派时间：<span>{{reportInfo.assignedTime}}</span></p>
          <p>指派人：<span>{{reportInfo.appointedPersonName}}</span></p>
          <p>是否超期：<span>{{reportInfo.ifOverdue}}</span></p>
        </div>
      </div>
    </div>
    <div class="plateTwo-wrap">
      <div class="plateTwo-cont">
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckdcdb.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop2(reportInfo.taskContent)">任务内容<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbz.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop2(reportInfo.remark)">备注<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckwjyj.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('/seeFileBasis')">查看文件依据<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/seeLibrary.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('/selectLibrary')">选择文档库文件<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate" v-if="reportInfo.isAudited == '是'">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckwjyj.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('/seeAuditDetails')">查看审核详情<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="optionWrap">
          <p>任务完成情况<b style="color: red;">*</b></p>
          <textarea cols="50" v-model="info.taskWork" @input="descInput()" maxlength="500" rows="10"></textarea>
          <span>{{txtVal}}/500</span>
        </div>
      </div>
    </div>
    <div class="fileWrap">
      <p class="fileWrapTitle">
        附件
        <span @click="checkUpFlie()">
          上传新附件
          <van-icon name="arrow" />
        </span>
        <input 
          id="fileUpBtn" 
          type="file"  
          style="display: none;"
          @change="getFile($event)"
        >
      </p>
      <div class="descriptionWrap"
        v-for="(file, index) in files"
        :key="index"
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
        <span class="deleteIcon">
          <van-icon name="close" @click="deleteFile(file,index)"></van-icon>
        </span>
      </div>
    </div>
    <div class="fileWrap">
      <p class="fileWrapTitle">
        文档库文件
      </p>
      <div class="descriptionWrap"
        v-for="(file, index) in info.documents"
        :key="index"
      >
        <span class="imgWrap">
          <img 
            src="../../../assets/img/plate/createTask/default.png" alt="default"
          >
        </span>
        <span>{{file.fileName}}</span>
        <span class="deleteIcon">
          <van-icon name="close" @click="deleteLibraryFile(index)"></van-icon>
        </span>
      </div>
    </div>
    <van-button v-if="pageType == 'report'" style="margin-top: 30px;" @click="submit()" type="primary" size="large">提交</van-button>
    <van-button v-if="pageType == 'modify'" style="margin-top: 30px;" @click="submit()" type="primary" size="large">修改</van-button>
    <van-popup v-model="show2">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
var refreshFlag = true;
import * as $api from '@/api';
import axios from '@/utils/http';
import base from '@/api/base';
import { Toast } from 'vant';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      pageType: 'report',
      reportId: '',
      reportInfo: '',
      info: {
        taskWork: '', //工作落实情况
        documents: [], //文档库文件
      },
      txtVal: '0',
      files: [],
      show2: false,
      showTitle: '',
      showText: '',
      from: '', //记录路由 判断刷新页面
      to: ''
    }
  },
  watch: {
    $route(to,from) {
      if(this.$route.query.ZprwNiBanid && from.path== '/mineMission_hb' && to.path == '/zprwReport') {
        // 如果来源于汇报列表 重置数据
        this.reset()
      }
    }
  },
  activated() {
    this.info.documents = JSON.parse(localStorage.getItem('thisSelectLibrary'))
  },
  created() {
    this.reset()
  },
  methods: {
    reset() {
      this.reportId = this.$route.query.ZprwNiBanid;
      this.pageType = this.$route.query.pageType;
      this.txtVal = '0';
      this.files = [];
      localStorage.setItem('thisSelectLibrary',JSON.stringify([]))
      this.getReportDetail();
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
    getReportDetail() {
      let id = this.reportId;
      this.$api.zprwReport.getReportInfo(id)
      .then(res => {
        if(res.code == '200') {
          this.reportInfo = res;
          this.files = [];
          this.info.taskWork = '';
          if(this.pageType == 'modify') {
            this.info.taskWork = res.taskWork;
            this.files = res.fileData
          }
        }else {
          return false
        }
      })
    },
    descInput() {
      this.txtVal = this.info.taskWork.length;
    },
    goOther(where) {
      this.$router.push({path: `${where}`,query: {item: this.reportInfo,id: this.reportId,type: '承办任务审批'}})
    },
    deleteFile(file,index) { //文件依据删除按钮
      this.$api.createTask.deleteFile(file.id)
      .then(res => {
        if(res.code == '200') {
          this.files.splice(index,1)
          Toast('删除成功！')
        }else { return }
      })
    },
    deleteLibraryFile(index) {
      this.info.documents.splice(index,1)
      Toast('删除成功！')
      localStorage.setItem('thisSelectLibrary',JSON.stringify(this.info.documents))
    },
    checkUpFlie() { //点击添加文件按钮
      document.getElementById("fileUpBtn").click();
    },
    getFile(event) { //确认文件后的操作
      var formData = new FormData()
      formData.append('files', event.target.files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
      id = this.reportId;
      axios.post(`${base.baseUrl}/app/hbzprw/${id}/fileUpload`,formData,config)
      .then(res=>{
        if(res.code == '200') {
          let file = {
            oldFileName: event.target.files[0].name,
            id: res.fileId
          }
          this.files.push(file);
        }
      })
    },
    submit() {
      if(this.info.taskWork == '') {
        Toast('必填信息不能为空！')
        return false
      }
      var info = aes.encrypt(JSON.stringify(this.info)),
        data = `"requestData": "${info}"`,
        id = this.reportId;
      this.$api.zprwReport.submitReport(id,data)
      .then(res=>{
        if(res.code == '200') {
          Toast('汇报成功！')
          window.setTimeout(() => {
            this.$router.back('-1')
          },500)
        }else if(res.code == '400') {
          Toast(res.msg)
        }
      })     
    },
  },
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.reportWrap {
  padding-top: 80/@size;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f7f7f7;
  .van-button--large {
    height: 100%;
  }

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
            height: 50/@size;
            line-height: 50/@size;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family:Source Han Sans CN;
          }
          p:nth-child(1) {
            line-height: 70/@size;
            font-size: 24/@size;
            font-weight: 600;
          }
          p:nth-child(2) {
            font-size: 18/@size;
            line-height: 40/@size;
            color: #59A3F0;
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

  .plateWrap {
    width: 100%;
    height: 60/@size;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15/@size;
    border-bottom: 1px solid #e5e5e5;
    span {
      display: inline-block;
      height: 60/@size;
      line-height: 60/@size;
      font-size: 20/@size;
      position: relative;
      i {
        position: relative;
        top: 3/@size;
      }
    }
  }
  .plateWrap span:nth-child(2){
    float: right;
    color: #6e6e6e;
    max-width: 350/@size;
    width: 300/@size;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #000;
  }
  .plateWrap:last-child {
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

  .optionWrap {
    width: 100%;
    box-sizing: border-box;
    padding: 20/@size 0; 
    p {
      color: #000;
      font-size: 22/@size;
      position: relative;
      height: 40/@size;
      line-height: 40/@size;
      margin-bottom: 10/@size;
      b {
        color: #ff0000;
        font-size: 15/@size;
        position: absolute;
        top: -5/@size;
      }
    }
    textarea {
      width: 100%;
      height: 120/@size;
      font-size: 20/@size;
      color: #000;
      box-sizing: border-box;
      padding: 5/@size;
      border: 1px solid #eee;
      background-color: #fff;
    }
    span {
      font-size: 18/@size;
      color: red;
    }
  }

  .btnGroup {
    width: 100%;
    height: 80/@size;
    position: fixed;
    bottom: 0px;
    .btnWrap {
      float: left;
      height: 100%;
      width: 50%;
    }
  }

  .fileWrap {
    box-sizing: border-box;
    padding: 0 20/@size;
    .fileWrapTitle {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10/@size;
      width: 100%;
      height: 60/@size;
      line-height: 60/@size;
      background-color: #fff;
      font-size: 22/@size;
      border-bottom: 1px solid #e5e5e5;
      margin-top: 30/@size;
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
      padding: 0 10/@size;
      border-bottom: 1/@size solid #dcdcdc;
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
      .deleteIcon {
        width: 50/@size;
        text-align: center;
        line-height: 0/@size;
        font-size: 40/@size;
        color: #ccc;
        i {
          position: relative;
          top: 50/@size;
          margin-top: -20/@size;
        }
      }
    }
  }

}
</style>