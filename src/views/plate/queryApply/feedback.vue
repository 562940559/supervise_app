<template>
  <div class="addQueryWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="routerBack()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span class="setting-btn" @click="goProcess()">
        <van-icon name="exchange" />
        <span>流程</span>
      </span>
    </div>
    <!-- 查询条件 -->
    <div class="addQueryBody">
      <!-- 查询标题 -->
      <div class="title-wrap">
        <div class="img-wrap">
          <span>申</span>
        </div>
        <div class="text-wrap" @click="moreExplain()">
          <div class="title">天府新区审计中心数据查询申请</div>
          <div class="explain">
            <span>说明</span>天府新区审计中心查询、分析涉及...
          </div>
        </div>
        <van-icon name="arrow" />
      </div>
      <!-- part-one -->
      <div class="partOne-wrap">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/applyDepartment.png" alt />
          </div>
          <div class="plateName">
            <p>
              申请处室
              <span>{{applyInfo.applyDept}}</span>
            </p>
          </div>
        </div>
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/applyPerson.png" alt />
          </div>
          <div class="plateName">
            <p>
              申请人
              <span>{{applyInfo.applicant}}</span>
            </p>
          </div>
        </div>
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/applyPersonContact.png" alt />
          </div>
          <div class="plateName">
            <p>
              申请人联系方式
              <span>{{applyInfo.phone == '' ? '暂无' : applyInfo.phone}}</span>
            </p>
          </div>
        </div>
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/opinion.png" alt />
          </div>
          <div class="plateName">
            <p>
              数据查询需求
              <span @click="showPop('数据查询需求',applyInfo.dataRequirements)">
                {{applyInfo.dataRequirements}}
                <van-icon name="arrow" />
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- part-two -->
      <div class="partTwo-wrap">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/dataQuery.png" alt />
          </div>
          <div class="plateName">
            <p>数据查询项目</p>
          </div>
        </div>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写数据查询项目"
          v-model="applyInfo.queryProject"
          readonly
          style="color: #ccc;"
        ></textarea>
      </div>
      <!-- part-two -->
      <div class="partTwo-wrap opinion" v-if="applyInfo.reviewData.length == 2">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/option.png" alt />
          </div>
          <div class="plateName">
            <p>申请处室意见</p>
          </div>
        </div>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写意见"
          v-model="applyInfo.reviewData[0].opinion"
          readonly
          style="color: #ccc;"
        ></textarea>
      </div>
      <!-- part-two -->
      <div class="partTwo-wrap opinion">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/option.png" alt />
          </div>
          <div class="plateName">
            <p>审计中心意见</p>
          </div>
        </div>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写意见"
          v-if="applyInfo.reviewData[0].reviewerType == 1"
          v-model="applyInfo.reviewData[0].opinion"
          readonly
          style="color: #ccc;"
        ></textarea>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写意见"
          v-if="applyInfo.reviewData[0].reviewerType == 0"
          v-model="applyInfo.reviewData[1].opinion"
          readonly
          style="color: #ccc;"
        ></textarea>
      </div>
      <!-- part-two  -->
      <div class="partTwo-wrap opinion">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/result.png" alt />
          </div>
          <div class="plateName">
            <p>
              数据查询反馈结果
              <b>*</b>
            </p>
          </div>
        </div>
        <textarea
          name
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="请填写反馈内容"
          v-model="para.feedbackResults"
        ></textarea>
        <div class="category">
          <p>
            <span>
              条数
              <b>*</b>
            </span>
            <input type="text" placeholder="请填写" v-model="para.numberOfData" />
          </p>
          <p>
            <span>
              用时
              <b>*</b>
            </span>
            <input type="text" placeholder="请填写" v-model="para.queryTime" />
          </p>
        </div>
        <div style="clear: both;"></div>
      </div>

      <div class="fileWrap">
        <p class="fileWrapTitle">
          <img src="../../../../static/img/queryApply/enclosure.png" alt />附件
          <span @click="checkUpFlie()">
            上传新附件
            <van-icon name="arrow" />
          </span>
          <input id="fileUpBtn" type="file" style="display: none;" @change="getFile($event)" />
        </p>
        <div class="descriptionWrap" v-for="(file, index) in files" :key="index">
          <span class="imgWrap">
            <img
              src="../../../assets/img/plate/createTask/doc.png"
              alt="doc"
              v-if="file.oldFileName.split('.')[1] == 'doc' || file.oldFileName.split('.')[1] == 'docx'"
            />
            <img
              src="../../../assets/img/plate/createTask/xls.png"
              alt="xls"
              v-if="file.oldFileName.split('.')[1] == 'xls' || file.oldFileName.split('.')[1] == 'xlsx'"
            />
            <img
              src="../../../assets/img/plate/createTask/pdf.png"
              alt="pdf"
              v-if="file.oldFileName.split('.')[1] == 'pdf'"
            />
            <img
              src="../../../assets/img/plate/createTask/png.png"
              alt="png"
              v-if="file.oldFileName.split('.')[1] == 'png'"
            />
            <img
              src="../../../assets/img/plate/createTask/jpg.png"
              alt="jpg"
              v-if="file.oldFileName.split('.')[1] == 'jpg'"
            />
            <img src="../../../assets/img/plate/createTask/default.png" alt="default" v-else />
          </span>
          <span>{{file.oldFileName}}</span>
          <span class="deleteIcon">
            <van-icon name="close" @click="deleteFile(file,index)"></van-icon>
          </span>
        </div>
      </div>

      <!-- part-one -->
      <div class="partOne-wrap">
        <div class="plate">
          <div class="img-wrap">
            <img src="../../../../static/img/queryApply/operator.png" alt />
          </div>
          <div class="plateName">
            <p>
              数据查询经办人
              <span>{{applyInfo.dataManager}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="submitBtn-wrap">
      <van-button type="primary" size="large" @click="submitForm()">发送</van-button>
    </div>

    <!-- pop弹出层 -->
    <van-popup v-model="show">
      <div class="popWrap">
        <p>{{showTitle}}</p>
        <p>{{showText}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import * as $api from "@/api";
import base from "@/api/base";
import axios from "@/utils/http";
export default {
  data() {
    return {
      show: false,
      applyId: "", // 申请ID
      showTitle: "",
      showText: "",
      applyInfo: {
        applyDept: "", // 申请部门
        applicant: "", // 申请人
        phone: "", // 联系方式
        dataRequirements: "", // 数据查询需求
        queryProject: "", // 查询企业相关信息
        reviewData: [{ opinion: "" }, { opinion: "" }], // 意见数据集
        dataManager: "" // 经办人
      },
      para: {
        feedbackResults: "", // 反馈内容
        numberOfData: "", // 条数
        queryTime: "", // 用时
      },
      files: [],
      fileIdList: [],
    };
  },
  created() {
    this.applyId = this.$route.query.id;
    this.getApplyDetails(this.applyId);
  },
  mounted() {},
  methods: {
    routerBack() {
      this.$router.back("-1");
    },
    goProcess() {
      let id = this.applyId;
      this.$router.push({path: '/approvalProcess',query: {id: id}})
    },
    moreExplain() {
      // 更多说明
      this.showTitle = "说明";
      this.showText =
        "天府新区审计中心查询、分析涉及个人隐私，包含但不仅限于房管、车管、社保、公积金、个人所得税、关联关系人、身份证号、银行流水等信息或疑点不得作为审计、办案取证的直接依据，如有取证需求，请申请处室报纪工委书记签批盖章。各处室取得的数据查询分析结果必须严格保密，如果出现数据丢失、泄密等情况，由此引发的一切后果和责任，由申请处室自行负责。";
      this.show = true;
    },
    showPop(title, content) {
      // 显示弹窗
      this.showTitle = title;
      this.showText = content;
      this.show = true;
    },
    getApplyDetails(id) {
      this.$api.queryApply.getApplyDetails(id).then(res => {
        console.log(res);
        if (res.code == "200") {
          if(res.data.reviewData[0] == undefined) {
            res.data.reviewData[0] = [{opinion: ''},{opinion: ''}]
          }
          this.applyInfo = res.data;
        }
      });
    },
    checkUpFlie() {
      //点击添加文件按钮
      document.getElementById("fileUpBtn").click();
    },
    getFile(event) {
      //确认文件后的操作
      var formData = new FormData();
      formData.append("files", event.target.files[0]);
      let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        id = this.applyId;
      axios
        .post(
          `${base.baseUrl}/app/index/dataQuery/uploadFiles/${id}`,
          formData,
          config
        )
        .then(res => {
          if (res.code == "200") {
            let file = {
              oldFileName: event.target.files[0].name,
              id: res.fileId
            };
            this.fileIdList.push(res.fileId);
            this.files.push(file);
          }
        });
    },
    deleteFile(file,index) { //文件依据删除按钮
      this.$api.createTask.deleteFile(file.id)
      .then(res => {
        if(res.code == '200') {
          this.files.splice(index,1)
          this.fileIdList.splice(index,1)
          Toast('删除成功！')
        }else { return }
      })
    },
    approval() {
      this.$api.queryApply.feedbackSubmti(this.applyId,this.para)
      .then(
        res=>{
          console.log(res)
          if(res.code == '200') {
            Toast('反馈成功！')
            setTimeout(()=>{
              this.$router.back('-1')
            },500)
          }else {
            Toast(res.msg)
          }
        }
      )
    },
    submitForm() {
      // 提交表单
      if(this.para.feedbackResults == '' || this.para.numberOfData == '' || this.para.queryTime == '') {
        return Toast('请填写必填项！')
      }
      if(this.fileIdList[0] != undefined) {
        this.para['fileId'] = this.fileIdList.join(',');
      }
      console.log(this.para)
      return this.approval();
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@import "../../../assets/less/common.less";
.addQueryWrap {
  min-height: 100%;
  box-sizing: border-box;
  background-color: rgb(249, 249, 249);
  padding-bottom: 90 / @size;
  .submitBtn-wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70 / @size;
    .van-button {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
  // 对顶部导航条进行样式修改
  .top-wrap {
    position: fixed;
    width: 100%;
    height: 80 / @size;
    background-color: #fff;
    color: #323232;
    font-size: 18 / @size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20 / @size;
    z-index: 99999;
    overflow: hidden;
    .return-btn {
      font-size: 28 / @size;
      width: 150 / @size;
      i {
        position: relative;
        top: 5 / @size;
      }
      .text {
        position: relative;
        left: -10 / @size;
      }
    }
    .route-title {
      font-size: 32 / @size;
      text-align: center;
    }
    .setting-btn {
      font-size: 34 / @size;
      width: 150 / @size;
      height: 35 / @size;
      text-align: right;
      i {
        font-size: 28 / @size;
      }
      span {
        font-size: 20 / @size;
        position: relative;
        top: -8 / @size;
      }
    }
  }
  .addQueryBody {
    box-sizing: border-box;
    padding: 0 20 / @size;
    padding-top: 100 / @size;
    .title-wrap {
      background-color: #fff;
      width: 100%;
      height: 147 / @size;
      box-sizing: border-box;
      padding: 10 / @size 40 / @size 0 / @size 100 / @size;
      position: relative;
      i {
        position: absolute;
        right: 10 / @size;
        top: 60 / @size;
        color: #a5a5a5;
        font-size: 22 / @size;
      }
      .img-wrap {
        width: 100 / @size;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        margin-left: -100 / @size;
        span {
          display: inline-block;
          width: 80 / @size;
          height: 80 / @size;
          font-size: 30 / @size;
          text-align: center;
          line-height: 80 / @size;
          color: #fff;
          background-color: rgb(140, 151, 203);
          border-radius: 50%;
        }
      }
      .text-wrap {
        float: left;
        width: 100%;
        height: 100%;
        .title {
          width: 100%;
          height: 60 / @size;
          line-height: 60 / @size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 24 / @size;
          font-weight: 600;
          color: #323232;
        }
        .explain {
          margin-top: 10 / @size;
          height: 40 / @size;
          font-size: 22 / @size;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #909090;
          span {
            display: inline-block;
            height: 30 / @size;
            font-size: 18 / @size;
            text-align: center;
            line-height: 30 / @size;
            padding: 0 15 / @size;
            background-color: #eeeeee;
            margin-right: 5 / @size;
            border-radius: 15 / @size;
          }
        }
      }
    }
    .partOne-wrap {
      margin-top: 20 / @size;
      background-color: #fff;
      width: 100%;
      .plate {
        width: 100%;
        height: 80 / @size;
        box-sizing: border-box;
        padding: 0 10 / @size;
        padding-left: 60 / @size;
        border-bottom: 1px solid #eeeeee;
        .img-wrap {
          width: 60 / @size;
          height: 80 / @size;
          margin-left: -60 / @size;
          display: flex;
          justify-content: center;
          align-items: center;
          float: left;
          img {
            width: 30 / @size;
            height: 30 / @size;
          }
        }
        .plateName {
          float: left;
          width: 100%;
          p {
            height: 80 / @size;
            line-height: 80 / @size;
            font-size: 22 / @size;
            color: #323232;
            b {
              color: #ff0000;
              position: relative;
              right: -2px;
              top: -2px;
            }
            span {
              color: #b0b0b0;
              float: right;
              max-width: 280 / @size;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            i {
              position: relative;
              top: 3 / @size;
            }
          }
        }
      }
    }
    .partTwo-wrap {
      margin-top: 20 / @size;
      background-color: #fff;
      width: 100%;
      .plate {
        width: 100%;
        height: 80 / @size;
        box-sizing: border-box;
        padding: 0 10 / @size;
        padding-left: 60 / @size;
        border-bottom: 1px solid #eeeeee;
        .img-wrap {
          width: 60 / @size;
          height: 80 / @size;
          margin-left: -60 / @size;
          display: flex;
          justify-content: center;
          align-items: center;
          float: left;
          img {
            width: 24 / @size;
            height: 34 / @size;
          }
        }
        .plateName {
          float: left;
          width: 100%;
          p {
            height: 80 / @size;
            line-height: 80 / @size;
            font-size: 22 / @size;
            color: #323232;
            b {
              color: #ff0000;
              position: relative;
              right: -2px;
              top: -2px;
            }
          }
        }
      }
      .category {
        width: 100%;
        height: 80 / @size;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #ccc;
        p {
          float: left;
          width: 49%;
          height: 100%;
          box-sizing: border-box;
          padding: 10 / @size 0 10 / @size 110 / @size;
          font-size: 24 / @size;
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            width: 80 / @size;
            margin-left: -80 / @size;
            text-align: center;
          }
          b {
            color: red;
          }
          input {
            width: 100%;
            border: none;
            font-size: 20 / @size;
            text-align: right;
            box-sizing: border-box;
            padding-right: 10 / @size;
          }
          input::-webkit-input-placeholder {
            /* placeholder字体大小  */
            font-size: 18 / @size;
          }
        }
        p:nth-child(1) {
          input {
            border-right: 1px solid #ccc;
          }
        }
      }
    }
    .opinion {
      .plate {
        .img-wrap {
          img {
            width: 30 / @size;
            height: 30 / @size;
          }
        }
      }
    }
    .fileWrap {
      box-sizing: border-box;
      margin-top: 20 / @size;
      .fileWrapTitle {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10 / @size;
        width: 100%;
        height: 60 / @size;
        line-height: 60 / @size;
        background-color: #fff;
        font-size: 22 / @size;
        border-bottom: 1px solid #e5e5e5;
        > img {
          width: 28 / @size;
          height: 32 / @size;
          margin-right: 20 / @size;
          position: relative;
          top: 5 / @size;
        }
        span {
          float: right;
          font-size: 20 / @size;
          color: #888;
          i {
            position: relative;
            top: 2 / @size;
          }
        }
      }
      .descriptionWrap {
        width: 100%;
        height: 100 / @size;
        box-sizing: border-box;
        padding: 0 10 / @size;
        border-bottom: 1 / @size solid #dcdcdc;
        background-color: #fff;
        span {
          display: inline-block;
          width: 370 / @size;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 100 / @size;
          line-height: 100 / @size;
          font-size: 20 / @size;
        }
        .imgWrap {
          width: 50 / @size;
          margin-right: 10 / @size;
          text-align: center;
          box-sizing: border-box;
          padding-top: 20 / @size;
          img {
            width: 50 / @size;
            height: 60 / @size;
          }
        }
        .deleteIcon {
          width: 50 / @size;
          text-align: center;
          line-height: 0 / @size;
          font-size: 40 / @size;
          color: #ccc;
          i {
            position: relative;
            top: 50 / @size;
            margin-top: -20 / @size;
          }
        }
      }
    }
    textarea {
      width: 100%;
      height: 150 / @size;
      border: 0;
      box-sizing: border-box;
      padding: 20 / @size 40 / @size;
      color: #323232;
      font-size: 20 / @size;
    }
  }

  .popWrap {
    background-color: #fff;
    padding: 50 / @size;
    position: relative;
    border-radius: 50 / @size;
    p {
      width: 300 / @size;
    }
  }
  .popWrap p:nth-child(1) {
    text-align: center;
    font-size: 22 / @size;
    color: #000;
    margin-bottom: 20 / @size;
  }
  .popWrap p:nth-child(2) {
    word-wrap: break-word;
    color: #737373;
    font-size: 20 / @size;
  }
}
</style>