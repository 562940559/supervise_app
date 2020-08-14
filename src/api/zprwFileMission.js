/**
  * 指派任务归档模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const zprwFileMission = {
  getFileMission(data) {
    return axios.post(`${base.baseUrl}/app/index/archiveTask`,data)
  },
  getDoneFileMission(data) {
    return axios.post(`${base.baseUrl}/app/index/archiveTask/archiveCompletion`,data)
  },
  getTodoMissionDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/archiveTask/detailed/${id}`)
  },
  getDoneMissionDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/archiveTask/archiveCompletion/${id}`)
  },
  submitFile(id) {
    return axios.post(`${base.baseUrl}/app/index/archiveTask/archive/${id}`)
  }
 }
 
  export default zprwFileMission;