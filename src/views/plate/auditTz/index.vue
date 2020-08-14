<template>
  <div class="auditSystemWrap">
    <!-- 头部信息栏 -->
    <div class="top-wrap">
      <span class="return-btn">
        <van-icon name="arrow-left" @click="goIndex()"></van-icon>
      </span>
      <span class="route-title">{{$route.meta.title}}</span>
      <span @click="goOther('auditTzFilterPage')" class="setting-btn">
        筛选 
        <van-icon name="filter-o" />
      </span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="offset"
    >
      <!-- 内容部分 -->
      <div 
        class="contentWrap"
        v-for="(item,index) in dataList"
        :key="index"
      >
        <div 
          class="left-wrap"
        >
          <p class="title">{{item.planName}}</p>
          <p>被审计单位：{{item.auditedUnit}}</p>
          <p>计划来源类别：{{item.planSourceCategory}}</p>
          <p>计划年度：{{item.planYear}}</p>
          <p>开始时间：{{item.startTime}}</p>
          <p>结束时间：{{item.endTime}}</p>
          <p>组织实施单位：{{item.implementationUnit}}</p>
          <p>审计内容类型：{{item.auditContentType}}</p>
          <p @click="download(item.reportId,item.auditReportNumber)">审计报告号：<span style="color: blue">{{item.auditReportNumber}}</span></p>
        </div>
        <div class="right-wrap">
          <p class="detail-btn" @click="goOther('auditTzDetails',item.id)">查看详情</p>  
        </div>
        <div style="clear: both;"></div>
        <div class="bottom-wrap">
          <p>审计或调查：<span>{{item.auditOrInvestigation}}</span></p>
          <p>审计专业类型：{{item.auditProfessionalCategory}}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    </van-list>
  </div>
</template>

<script>
var refreshFlag = true;
import * as $api from '@/api';
import aes from '../../../utils/aes';
import { Dialog,Toast } from 'vant';
import axios from '@/utils/http';
import base from '@/api/base'; // 导入接口域名列表
export default {
  data() {
    return {
      dataList: [],
      loading: false,
      finished: false,
      offset: 100,
      form: {
        current: 1, //页码
        limit: 10, //每页条数
        investmentAuditAccount: { //	筛选参数封装对象	
          planName: '', //计划名称
          auditReportNumber: '', //审计报告号
          auditedUnit: '', //被审计单位
          planSourceCategory: '', //计划来源类别
          planYear: '', //	计划年度
          startTime: '', //	开始时间
          implementationUnit: '', //组织实施单位
          auditContentType: '', //审计内容类型
          auditProfessionalCategory: '', //审计专业类别
          auditOrInvestigation: '', //审计或调查
          endTime: '', //结束时间
        },
      }
    }
  },
  created() {
    localStorage.setItem('isIndex',false)
  },
  methods: {
    routerBack() {
      this.$router.back('-1')
    },
    goIndex() {
      this.$router.push('/')
    },
    goOther(where,id,type) {
      var id = id;
      this.$router.push({path:`/${where}`,query: {id: id,type: type}})
    },
    onLoad() {
      this.getList();
    },
    getList() {
      this.loading = true;
      this.finished = false;
      var info = aes.encrypt(JSON.stringify(this.form)),
      data = `"requestData": "${info}"`;
      this.$api.auditTz.auditTzQuery(data)
      .then(res=>{
        if (JSON.stringify(res.data[0]) == undefined) {
          this.loading = false;
          this.finished = true;
          return false;
        }
        this.form.current++;
        this.dataList = this.dataList.concat(res.data);
        this.loading = false;
      })
    },
    loading(time) {
      Toast.loading({
        mask: false,
        message: '下载中...（请勿切换至后台）',
        duration: time,
        forbidClick: true
      });
    },
    download(id,filename) {
      var that = this;
      Dialog.confirm({
        title: '提示',
        message: '确认下载该审计报告号吗？',
        confirmButtonColor: '#02ac61',
        cancelButtonColor: '#02ac61',
      }).then(() => {
        this.$api.auditTz.getDownLoadPath(id)
        .then(res=>{
          var path = `${res.filePath}`;
          filename = filename+'.'+path.split('.')[3];
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
      }).catch(() => {
        // on cancel
      });
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === '工作页面' || from.name === '投资审计台账查询页面') {
      refreshFlag = true
    } else {
      refreshFlag = false
    }
    next()
  },
  activated() {
    localStorage.setItem('isIndex',false)
    if(refreshFlag) {
      //如果从主页跳转过来则重置数据，其他页面跳转过来不变，避免用户输入信息丢失
      if(this.$route.query.newData && this.$route.query.newData.current) {
        this.form = this.$route.query.newData;
      }else {
        this.form = {
          current: 1, //页码
          limit: 10, //每页条数
          investmentAuditAccount: { //	筛选参数封装对象	
            planName: '', //计划名称
            auditReportNumber: '', //审计报告号
            auditedUnit: '', //被审计单位
            planSourceCategory: '', //计划来源类别
            planYear: '', //	计划年度
            startTime: '', //	开始时间
            implementationUnit: '', //组织实施单位
            auditContentType: '', //审计内容类型
            auditProfessionalCategory: '', //审计专业类别
            auditOrInvestigation: '', //审计或调查
            endTime: '', //结束时间
          },
        };
      }
      this.dataList = [];
      this.onLoad();
    }
  },
}
</script>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
// 对vant样式进行修改
.auditSystemWrap {
  .van-list {
    padding-top: 80/@size;
  }
}
</style>

<style scoped lang="less" type="text/less">
@import '../../../assets/less/common.less';
.auditSystemWrap {
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
      font-size: 22/@size;
      font-weight: 400;
      width: 150/@size;
      text-align: right;
      position: relative;
      top: 2/@size;
      i {
        top: 2/@size;
        font-size: 24/@size;
      }
      a {
        color: white;
      }
    }
  }
  .contentWrap {
    width: 100%;
    box-sizing: border-box;
    padding-top: 15/@size;
    .left-wrap {
      width: 80%;
      box-sizing: border-box;
      padding-left: 20/@size;
      float: left;
      p {
        color: #9c9c9c;
        font-size: 18/@size;
        margin: 15/@size 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        i {
          color: #686868;
          font-size: 22/@size;
          position: relative;
          top: 5/@size;
        }
      }
      .title {
        font-size: 24/@size;
        color: #000;
        width: 95%;
        height: 30/@size;
        line-height: 30/@size;
      }
    }
    .right-wrap {
      width: 20%;
      padding-right: 20/@size;
      padding-top: 10/@size;
      box-sizing: border-box;
      float: left;
      .detail-btn {
        width: 100%;
        height: 50/@size;
        border-radius: 15/@size;
        line-height: 50/@size;
        color: white;
        text-align: center;
        font-size: 16/@size;
        background-color: #6adac9;
      }
    }
    .bottom-wrap {
      width: 100%;
      height: 40/@size;
      line-height: 40/@size;
      background-color: #f6fafe;
      box-sizing: border-box;
      padding: 0 20/@size;
      p {
        float: left;
        width: 50%;
        color: #000;
        font-size: 18/@size;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        span {
          color: #ff955b;
        }
      }
    }
  }
}
</style>