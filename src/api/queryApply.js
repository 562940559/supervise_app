/**
  * 查询申请接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const queryApply = {
   getPersonInfo() { // 获取人员的基本信息
     return axios.post(`${base.baseUrl}/app/index/dataQuery/create`)
   },
   submitApply(data) { // 提交查询申请
    return axios.post(`${base.baseUrl}/app/index/dataQuery/submit`,data)
   },
   getApplyDetails(id) { // 获取审批时的详情
    return axios.post(`${base.baseUrl}/app/index/dataQuery/reviewInfo/${id}`)
   },
   departmentApproval(id,data) { // 科室负责人审批
    return axios.post(`${base.baseUrl}/app/index/dataQuery/review/${id}`,data)
   },
   getEditDetail(id) { // 获取待修改详情
    return axios.post(`${base.baseUrl}/app/index/dataQuery/updateInfo/${id}`)
   },
   editApply(id,data) { // 修改查询申请
    return axios.post(`${base.baseUrl}/app/index/dataQuery/update/${id}`,data)
   },
   feedbackSubmti(id,data) { // 提交反馈
    return axios.post(`${base.baseUrl}/app/index/dataQuery/feedback/${id}`,data)
   },
   getFeedbackDetails(id) { // 获取反馈详情
    return axios.post(`${base.baseUrl}/app/index/dataQuery/detailInfo/${id}`)
   },
   getProcessDetails(id) { // 流程详情
    return axios.post(`${base.baseUrl}/app/index/dataQuery/auditProcess/${id}`)
   },
   submitSure(id) { // 确认反馈
    return axios.post(`${base.baseUrl}/app/index/dataQuery/confirm/${id}`)
   },
  //  deleteFile(id) { // 删除
  //   return axios.post(`${base.baseUrl}/app/index/dataQuery/deleteFile/${id}`)
  //  }
 }
 
 export default queryApply;