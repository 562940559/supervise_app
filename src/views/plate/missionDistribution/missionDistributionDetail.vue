<template>
  <div class="reportWrap">
    <div class="plateOne-wrap">
      <div class="plateOne-cont">
        <div class="top">
          <div class="img-wrap">
            <img src="../../../../static/img/mineMission/fp.png" alt="">
          </div>
          <div class="txt-wrap">
            <p  @click="showPop2(missionDetail.supervisoryItems)">{{missionDetail.supervisoryItems}}</p>
            <p>等待审核</p>
          </div>
        </div>
        <div class="cont">
          <p>开始截止时间：<span>{{missionDetail.startTime}}-{{missionDetail.endTime}}</span></p>
          <p @click="showPop2(missionDetail.source)">任务来源：<span>{{missionDetail.source}}</span></p>
          <p>牵头处室：<span>{{missionDetail.takeleadSectionName}}</span></p>
          <p>配合处室：<span>{{missionDetail.responsibilitySectionName == null ? '暂未选择' : missionDetail.responsibilitySectionName}}</span></p>
          <p>分管领导：<span>{{missionDetail.leadingName}}</span></p>
          <p>牵头负责人：<span>{{missionDetail.leadingPerson}}</span></p>
          <p>配合处室负责人：<span>{{missionDetail.responsiblePerson}}</span></p>
        </div>
      </div>
    </div>
    <div class="plateTwo-wrap">
      <div class="plateTwo-cont">
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckdcdb.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('content')">查看督办任务<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbz.png" alt=""></div>
          <div class="text-wrap">
            <p @click="showPop('remarks')">查看备注<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckwjyj.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeFileBasis')">查看文件依据<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckhbzq.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeCycle')">查看汇报周期<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckbllc.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('processingProcess')">查看办理流程<van-icon name="arrow" /></p>
          </div>
        </div>
        <div class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/ckshxq.png" alt=""></div>
          <div class="text-wrap">
            <p @click="goOther('seeAuditDetails')">查看审核详情<van-icon name="arrow" /></p>
          </div>
        </div>
        <div v-if="type == 'detail'" class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/xzblry.png" alt=""></div>
          <div class="text-wrap">
            <p>办理人员<span>{{missionDetail.undertakerPerson}}</span></p>
          </div>
        </div>
        <div v-if="type == 'distribution'" class="onePlate">
          <div class="img-wrap"><img src="../../../../static/img/mineMission/xzblry.png" alt=""></div>
          <div class="text-wrap">
            <p @click="selectPersonnel()">选择办理人员<b style="color: red;">*</b><van-icon name="arrow" /></p>
          </div>
        </div>
      </div>
    </div>
    <div class="reportInfo">
      <!-- 详情页时查看办理人员 -->
      <div v-if="type == 'detail'" class="plateWrap">
        <span>办理人员</span>
        <span>{{dataList.undertakerPerson}}</span>
      </div>
      <div v-if="type == 'detail'" class="explainWrap">
        <p class="title">分配说明</p>
        <div
          class="explainContent"
          v-for="(item, index) in dataList.taskRecords"
          :key="index"
        >
          <p class="title">办理人员：{{item.reporterName}}</p>
          <textarea readonly v-model="item.distributionExplain"></textarea>
        </div>
      </div>
      <div v-if="type == 'detail'">
        <p class="fileWrapTitle">
          附件
        </p>
        <div class="descriptionWrap"
          v-for="(file, index) in dataList.documentBasis"
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
        </div>
      </div>
      <!-- 分配页面时选择办理人员 -->
      <div class="explainWrap" v-if="form.contentBeans[0] != undefined">
        <p class="title">分配说明</p>
        <van-checkbox-group v-model="selectedExplain" ref="checkboxGroup">
          <div
            class="explainContent"
            v-for="(item, index) in form.contentBeans"
            :key="index"
          >
            <van-checkbox
              :name="item"
              checked-color="#20b759"
            >
            办理人员：{{item.reporterName}}
            </van-checkbox>
            <textarea @input="descInput(index,item)" maxlength="500" cols="50" rows="10" v-model="item.declare"></textarea>
            <span class="wordLength">{{wordLength[index]}}/500</span>
          </div>
        </van-checkbox-group>
        <div class="checkAllWrap">
          <van-checkbox checked-color="#20b759" v-model="checkAll" @click="checkAllFun()">全选</van-checkbox>
          <span @click="batchProcessing()">
            <b>{{selectedExplain[0] == undefined ? '' : `(${selectedExplain.length})`}}批量填写</b>
          </span>
        </div>
      </div>
      <div v-if="form.contentBeans[0] != undefined">
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
              v-if="file.oldFileName.split('.')[1] == 'docx'"
            >
            <img 
              src="../../../assets/img/plate/createTask/xls.png" alt="xls"
              v-if="file.oldFileName.split('.')[1] == 'xls'"
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
          </span>
          <span>{{file.oldFileName}}</span>
          <span class="deleteIcon">
            <van-icon name="close" @click="deleteFile(file,index)"></van-icon>
          </span>
        </div>
        <van-button type="primary" @click="submission()" size="large" style="margin-top: 20px;">确定分配</van-button>
      </div>
    </div>
    <!-- pop弹出层（备注，督办内容） -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
    <van-popup v-model="show2">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
    <!-- pop弹出层（选择办理人员） -->
    <van-popup v-model="showSelect" position="bottom">
      <div class="popTitle">
        <van-icon @click="cancel()" name="cross" />
        <span>选择办理人员</span>
        <van-icon @click="sure()" name="success" />
      </div>
      <van-checkbox-group v-model="selectedPersonnel">
        <van-checkbox
          v-for="(item, index) in dataList.users"
          :key="index"
          :name="item"
          checked-color="#20b759"
        >
          {{ item.reporterName }}
        </van-checkbox>
      </van-checkbox-group>
    </van-popup>
    <!-- pop弹出层（填写批量处理） -->
    <van-popup v-model="showInput">
      <div class="popupInputWrap">
        <p class="title">分配说明</p>
        <textarea cols="50" rows="10" maxlength="500" v-model="allInput" placeholder="请输入分配说明"></textarea>
        <p @click="sureInput()" class="sureBtn">确定</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as $api from '@/api';
import { Toast } from 'vant';
import axios from '@/utils/http';
import base from '@/api/base';
import aes from '../../../utils/aes';
export default {
  data() {
    return {
      reportId: '',
      dataList: '',
      type: '',
      files: [],
      show: false,
      show2: false,
      showSelect: false,
      showInput: false,
      showTitle: '',
      showText: '',
      checkAll: false,
      allInput: '', //批量处理时的分配说明
      selectedPersonnel: [], //选出的分配人员
      selectedExplain: [], //选中的分配说明
      form: { //提交的表单
        taskId: '',
        allocationInstructions: '',
        contentBeans: []
      },
      wordLength: [],
      missionDetail: ''
    }
  },
  mounted() {
    this.reportId = this.$route.query.id;
    this.type = this.$route.query.type;
    this.form.taskId = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    goReportList() {
      let id = this.reportId;
      this.$router.push({path: '/reportList',query: {id: id}})
    },
    showPop2(item) {
      this.showTitle = '';
      this.showText = item;
      this.show2 = true;
    },
    getDetail() {
      let id = this.reportId;
      if(this.type == 'distribution') {
        this.$api.missionDistribution.getInDistributionDetail(id)
        .then(res => {
          if(res.code == '200') {
            this.missionDetail = res
            this.dataList = res
          }else {
            return false
          }
        })
      }else if(this.type == 'detail') {
        this.$api.missionDistribution.getDistributionedDetail(id)
        .then(res => {
          if(res.code == '200') {
            this.missionDetail = res
            this.dataList = res
          }else {
            return false
          }
        })
      }
    },
    goOther(where) {
      this.$router.push({path: `${where}`,query: {item: this.dataList,id: this.reportId,type: '督办任务审批'}})
    },
    showPop(where) {
      this.showTitle = where == 'content' ? '督办内容' : '备注';
      this.showText = where == 'content' ? this.dataList.supervisoryContent : this.dataList.remark
      this.show = true;
    },
    cancel() { //取消选择办理人员
      this.selectedPersonnel = [];
      this.showSelect = false;
    },
    sure() { //选定办理人员
      this.form.contentBeans = [],this.wordLength = [],this.selectedExplain = [];
      this.selectedPersonnel.map((item,index)=>{
        this.wordLength.push('0')
        this.form.contentBeans.push(Object.assign({},item,{declare:''}))
      })
      this.showSelect = false;
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
      axios.post(`${base.baseUrl}/app/index/home/distribution/uploadFiles/${id}`,formData,config)
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
    deleteFile(file,index) { //文件依据删除按钮
      this.$api.createTask.deleteFile(file.id)
      .then(res => {
        if(res.code == '200') {
          this.files.splice(index,1)
          Toast('删除成功！')
        }else { return }
      })
    },
    selectPersonnel() {
      this.showSelect = true;
    },
    descInput(index,item) {
      this.wordLength[index] = item.declare.length;
    },
    checkAllFun() { //全选反选
      this.checkAll = !this.checkAll;
      if(this.checkAll) {
        this.$refs.checkboxGroup.toggleAll(true);
      }else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    batchProcessing() { //点击批量处理按钮
      if(this.selectedExplain[0] != undefined) {
        this.showInput = true;
      }else {
        return false;
      }
    },
    sureInput() { //确认全选分配说明内容
      if(this.allInput == '') {
        Toast('请输入分配说明！')
        return false;
      }else {
        this.selectedExplain.map((item,index) => {
          item.declare = this.allInput;
          this.form.allocationInstructions = '';
          this.showInput = false;
        })
      }
    },
    submission() { //提交分配
      var info = aes.encrypt(JSON.stringify(this.form)),
        data = `"requestData": "${info}"`,
        allow = true;
      this.form.contentBeans.map(item => {
        if(item.declare == '') {
          Toast('请输入分配说明！')
          allow = false;
        }
      })
      if(allow) {
        this.$api.missionDistribution.submitDistribution(data)
        .then(res => {
          if(res.code == 200) {
            Toast('提交成功！')
            window.setTimeout(() => {
              this.$router.back('-1')
            },500)
          }else {
            return false;
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.van-popup {
  .van-checkbox-group {
    overflow-y: auto;
    max-height: 700/@size;
  }
  .van-checkbox {
    height: 80/@size;
    font-size: 20/@size;
    box-sizing: border-box;
    padding-left: 10/@size;
    border-bottom: 1/@size solid #e5e5e5;
    input {
      border: none;
      height: 80/@size;
      width: 300/@size;
    }
  }
}
.reportWrap {
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 80/@size;
  background-color: #f7f7f7;
  .reportInfo {
    .title {
      box-sizing: border-box;
      padding: 0 10/@size;
      height: 50/@size;
      line-height: 50/@size;
      color: #000;
      font-size: 22/@size;
    }
    .plateWrap {
      width: 100%;
      height: 80/@size;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 10/@size;
      border-bottom: 1px solid #e5e5e5;
      span {
        display: inline-block;
        height: 80/@size;
        line-height: 80/@size;
        font-size: 20/@size;
        color: #6e6e6e;
        input {
          text-align: right;
          padding: 0;
          height: 90%;
        }
        input::placeholder{
          color:#0490e9;
        }
      }
      span:nth-child(2){
        float: right;
        color: #000;
        max-width: 350/@size;
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .fileWrapTitle {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20/@size;
    width: 100%;
    height: 60/@size;
    line-height: 60/@size;
    background-color: #fff;
    font-size: 22/@size;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 20/@size;
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
  .descriptionWrap:last-child {
    border-bottom: none;
  }
  .descriptionWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 0 20/@size;
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
      float: right;
      i {
        position: relative;
        top: 50/@size;
        margin-top: -20/@size;
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
  .descriptionWrap {
    width: 100%;
    height: 100/@size;
    box-sizing: border-box;
    padding: 0 20/@size;
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
  }
  .popTitle {
    width: 100%;
    height: 80/@size;
    display: flex;
    font-size: 24/@size;
    line-height: 80/@size;
    box-sizing: border-box;
    padding: 0 10/@size;
    border-bottom: 1/@size solid #bfbfbf;
    span {
      flex: 1;
      text-align: center;
    }
    i {
      line-height: 80/@size;
      color: #20b759;
      font-size: 34/@size;
    }
  }
  .explainWrap {
    box-sizing: border-box;
    padding: 0/@size 20/@size 15/@size 20/@size;
    .title {
      width: 100%;
      height: 50/@size;
      line-height: 50/@size;
      color: #000;
      font-size: 22/@size;
      padding: 0;
    }
    .explainContent {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 10/@size;
      margin-bottom: 10/@size;
      .van-checkbox,.title {
        height: 50/@size;
        line-height: 50/@size;
        border-bottom: 1px solid #dcdcdc;
        color: #777;
      }
      textarea {
        width: 100%;
        height: 150/@size;
        border: none;
        margin-top: 10/@size;
        font-size: 18/@size;
      }
      .wordLength {
        font-size: 18/@size;
        color: #919191;
      }
    }
    .checkAllWrap {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0/@size 10/@size;
      height: 60/@size;
      .van-checkbox,span {
        height: 60/@size;
        line-height: 60/@size;
      }
      .van-checkbox {
        float: left;
      }
      span {
        float: right;
        width: 170/@size;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        b {
          display: inline-block;
          width: 150/@size;
          height: 40/@size;
          line-height: 40/@size;
          text-align: center;
          background-color: #02ac61;
          border-radius: 20/@size;
          color: white;
          font-weight: 400;
          font-size: 22/@size;
        }
      }
    }
  }
  .popupInputWrap {
    width: 450/@size;
    height: 400/@size;
    position: relative;
    .title {
      box-sizing: border-box;
      padding: 0 10/@size;
      height: 70/@size;
      line-height: 70/@size;
      font-size: 22/@size;
      border-bottom: 1/@size solid #dcdcdc;
    }
    textarea {
      border: none;
      box-sizing: border-box;
      padding: 15/@size;
      margin: 0;
      width: 450/@size;
      height: 263/@size;
      font-size: 18/@size;
    }
    .sureBtn {
      height: 60/@size;
      width: 100%;
      line-height: 60/@size;
      background-color: #02ac61;
      text-align: center;
      color: white;
      font-size: 22/@size;
      position: absolute;
      bottom: 0;
    }
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
}
</style>