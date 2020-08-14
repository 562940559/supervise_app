/**
  * 指派任务拟办模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const zprwCreateTask = {
  getIncomplete(data) { //获取待我拟办列表
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask`,data)
  },
  getComplete(data) { //获取我已拟办列表
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/done`,data)
  },
  getInCompleteMissionDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/${id}/updateSave`)
  },
  getTransactorList() { //获取办理人列表
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/taskPersonList`)
  },
  getRemindList() { //获取汇报提醒列表
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/templetList`)
  },
  getCompletedDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/${id}/updateSave`)
  },
  saveMission(data) { 
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/save`,data)
  },
  saveMissionAgain(id,data) {
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/${id}/updateTask`,data)
  },
  submitMission(data) {
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/addAudit`,data)
  },
  submitMissionAgain(id,data) {
    return axios.post(`${base.baseUrl}/app/index/createAssignedTask/${id}/updateTaskAndAudit`,data)
  },
  deleteFile(id) { //删除文件
    return axios.post(`${base.baseUrl}/app/deleteFile/${id}`)
  },
 }
 
  export default zprwCreateTask;