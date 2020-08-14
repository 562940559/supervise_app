/**
  * 指派任务审批模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const zprwApproval = {
  getPendingApprovalList(data) {
    return axios.post(`${base.baseUrl}/app/index/auditReportSheet`,data)
  },
  getApprovedList(data) {
    return axios.post(`${base.baseUrl}/app/index/auditReportSheet/done`,data)
  },
  getPendingApprovalDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/auditReportSheet/${id}`)
  },
  approvalBtnHandle(id,data) {
    return axios.post(`${base.baseUrl}/app/index/auditReportSheet/${id}/deal`,data)
  },
  getApprovedDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/auditReportSheet/done/${id}`)
  }
 }
 
  export default zprwApproval;