/**
  * 我的任务模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const mineMission = {
   getMineMissionList_sh() { // 获取我的任务列表(审核)
    return axios.post(`${base.baseUrl}/app/index/myjob/audit`)
   },
   getMineMissionList_hb() { // 获取我的任务列表(汇报)
    return axios.post(`${base.baseUrl}/app/index/myjob/report`)
   },
   getMineMissionList_fp() { // 获取我的任务列表(分配)
    return axios.post(`${base.baseUrl}/app/index/myjob/distribution`)
   },
   getMineMissionList_gd() { // 获取我的任务列表(归档)
    return axios.post(`${base.baseUrl}/app/index/myjob/archive`)
   },
   getMineMissionDetail(id) { // get我的任务详情
    return axios.post(`${base.baseUrl}/app/index/home/myTask/info/${id}`)
   },
   getLeadingReport(taskId) { // get牵头汇报
    return axios.post(`${base.baseUrl}/app/index/home/myTask/initiatorReport/${taskId}`)
   },
   getLeadingReportDetail(id) { // get牵头汇报详情
    return axios.post(`${base.baseUrl}/app/index/home/myTask/initiatorReportInfo/${id}`)
   },
   getCoordinationReport(taskId) { // get配合汇报
    return axios.post(`${base.baseUrl}/app/index/home/myTask/responsibleReport/${taskId}`)
   },
   getCoordinationReportDetail(id) { // get配合，办理汇报详情
    return axios.post(`${base.baseUrl}/app/index/home/myTask/executorReportInfo/${id}`)
   },
   getHandleReport(taskId) { // get办理汇报
    return axios.post(`${base.baseUrl}/app/index/home/myTask/promoterReport/${taskId}`)
   },
   getDocumentList(data) { // get文档库文件
    return axios.post(`${base.baseUrl}/app/index/regulatory/documentsList`,data)
   }
 }

 export default mineMission;