/**
  * 分配任务模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const missionDistribution = {
  getInDistribution(data) { //获取待我分配列表
    return axios.post(`${base.baseUrl}/app/index/home/distribution/pendingAllocation`,data)
  },
  getDistributioned(data) { //获取我已分配列表
    return axios.post(`${base.baseUrl}/app/index/home/distribution/assigned`,data)
  },
  getInDistributionDetail(id) { //获取待分配详情
    return axios.post(`${base.baseUrl}/app/index/home/distribution/taskAssignment/${id}`)
  },
  getDistributionedDetail(id) { //获取已分配详情
    return axios.post(`${base.baseUrl}/app/index/home/distribution/viewAssigned/${id}`)
  },
  submitDistribution(data) { //提交任务分配
    return axios.post(`${base.baseUrl}/app/index/home/distribution/submitAssignment`,data)
  }
 }
 
 export default missionDistribution;