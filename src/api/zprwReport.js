/**
  * 指派任务汇报模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const zprwReport = {
  getInReport(data) {
    return axios.post(`${base.baseUrl}/app/index/reportSheet`,data)
  },
  getReported(data) {
    return axios.post(`${base.baseUrl}/app/index/reportSheet/done`,data)
  },
  reportBack(id) {
    return axios.post(`${base.baseUrl}/app/index/reportSheet/${id}/withdraw`)
  },
  getReportInfo(id) {
    return axios.post(`${base.baseUrl}/app/index/reportSheet/${id}/info`)
  },
  submitReport(id,data) {
    return axios.post(`${base.baseUrl}/app/index/reportSheet/${id}/submit`,data)
  },
  getReportDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/reportSheet/${id}/info`)
  }
 }
 
  export default zprwReport;