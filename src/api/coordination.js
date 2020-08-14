/**
  * 督办统计模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const coordinationMission = {
  getInReport(data) { //获取待汇报列表
    return axios.post(`${base.baseUrl}/app/index/home/zrhb`,data)
  },
  getReported(data) { //获取已汇报列表
    return axios.post(`${base.baseUrl}/app/index/home/zrhb/done`,data)
  },
  getReportList(id) { //获取汇报列表
    return axios.post(`${base.baseUrl}/app/index/home/zrhb/${id}`)
  },
  getReportInfo(id) { //获取汇报详情信息
    return axios.post(`${base.baseUrl}/app/index/home/zrhb/${id}/save`)
  },
  submitReport(id,data) { //提交（修改）汇报
    return axios.post(`${base.baseUrl}/app/index/home/zrhb/${id}/submit`,data)
  },
  getReportDetail(id) { //获取汇报详情
    return axios.post(`${base.baseUrl}/app/index/home/zrhb/${id}/info`)
  },
  reportBack(id) { //撤回汇报
    return axios.post(`${base.baseUrl}/app/index/home/zrhb/${id}/withdraw`)
  }
 }

 export default coordinationMission;