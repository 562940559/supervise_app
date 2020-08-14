/**
  * 任务拟办模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const createTask = {
  getIncomplete () {  //获取‘待我拟办’信息列表
    return axios.post(`${base.baseUrl}/app/index/createTask`);
  },
  getComplete () {  //获取‘我已拟办’信息列表
    return axios.post(`${base.baseUrl}/app/index/createTask/done`)
  },
  deleteTask (data) { //删除拟办任务
    return axios.post(`${base.baseUrl}/app/index/createTask/deleteTask`,data)
  },
  getAddPower() { //点击新增任务时获取的权限
    return axios.post(`${base.baseUrl}/app/index/createTask/add`)
  },
  getCompletedDetail (id) { // 获取拟办详情
    return axios.post(`${base.baseUrl}/app/index/createTask/${id}/updateSave`)
  },
  getExamineDetail (id) { // 获取督办任务审核详情
    return axios.post(`${base.baseUrl}/app/index/home/dbrwsp/${id}`)
  },
  getRemindTemplete() { // 获取各种提醒模板
    return axios.post(`${base.baseUrl}/app/index/createTask/templetList`)
  },
  getTakeLead() { // 获取牵头负责人
    return axios.post(`${base.baseUrl}/app/index/createTask/inLeadPersonList`)
  },
  getCoordination() { // 获取配合处室负责人
    return axios.post(`${base.baseUrl}/app/index/createTask/responsiblePersonList`)
  },
  getLeader() { // 获取分管领导
    return axios.post(`${base.baseUrl}/app/index/createTask/chargeLeadingInquiryList`)
  },
  getApproval() { // 获取分管领导
    return axios.post(`${base.baseUrl}/app/index/createTask/selectApprovesList`)
  },
  saveMission(data) { //初次保存
    return axios.post(`${base.baseUrl}/app/index/createTask/save`,data)
  },
  saveMissionAgain(id,data) { // 再次保存
    return axios.post(`${base.baseUrl}/app/index/createTask/${id}/updateTask`,data)
  },
  submitMission(data) { //初次提交表单
    return axios.post(`${base.baseUrl}/app/index/createTask/addAudit`,data)
  },
  submitMissionAgain(id,data) { //草稿表单提交
    return axios.post(`${base.baseUrl}/app/index/createTask/${id}/updateTaskAndAudit`,data)
  },
  fileUp(id,data) { //文件上传
    return axios.post(`${base.baseUrl}/app/dbrw/${id}/fileUpload`,data)
  },
  deleteFile(id) { //删除文件
    return axios.post(`${base.baseUrl}/app/deleteFile/${id}`)
  },
  getInCompleteMissionDetail(id) { //获取保存的任务详情
    return axios.post(`${base.baseUrl}/app/index/createTask/${id}/updateSave`)
  }
 }
 
 export default createTask;