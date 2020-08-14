/**
  * 任务归档模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const fileMission = {
  getFileMission(data) { //获取待归档任务
    return axios.post(`${base.baseUrl}/app/index/home/archive`,data)
  },
  getDoneFileMission(data) { //获取已归档任务
    return axios.post(`${base.baseUrl}/app/index/home/unfiled`,data)
  },
  getTodoMissionDetail(id) { //获取待归档任务详情
    return axios.post(`${base.baseUrl}/app/index/home/archive/detailed/${id}`)
  },
  submitFile(id) { //提交归档请求
    return axios.post(`${base.baseUrl}/app/index/home/archive/${id}`)
  },
 }

 export default fileMission;