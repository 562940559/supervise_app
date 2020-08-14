/**
  * 督办统计模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const takeLeadMission = {
  getInReport(data) { //获取待汇报列表
    return axios.post(`${base.baseUrl}/app/index/home/qthb`,data)
  },
  getReported(data) { //获取已汇报列表
    return axios.post(`${base.baseUrl}/app/index/home/qthb/done`,data)
  },
  getReportList(id) { //获取汇报列表
    return axios.post(`${base.baseUrl}/app/index/home/qthb/${id}`)
  },
  getReportInfo(id) { //获取汇报详情信息（修改，汇报）
    return axios.post(`${base.baseUrl}/app/index/home/qthb/${id}/save`)
  },
  submitReport(id,data) { //提交（修改）汇报
    return axios.post(`${base.baseUrl}/app/index/home/qthb/${id}/submit`,data)
  },
  getReportDetail(id) { //获取汇报详情（只可查看）
    return axios.post(`${base.baseUrl}/app/index/home/qthb/${id}/info`)
  },
  reportBack(id) { //撤回汇报
    return axios.post(`${base.baseUrl}/app/index/home/qthb/${id}/withdraw`)
  }
 }

 export default takeLeadMission;