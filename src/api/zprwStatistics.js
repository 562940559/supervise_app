/**
  * 指派任务统计模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const zprwStatistics = {
  getStatisticsList() {
    return axios.post(`${base.baseUrl}/app/index/assignmentStatistics`)
  },
  getStatisticsSecondList(data) {
    return axios.post(`${base.baseUrl}/app/index/assignmentStatistics/info`,data)
  },
  getStatisticsDetail(id) {
    return axios.post(`${base.baseUrl}/app/index/assignmentStatistics/info/${id}`)
  }
 }
 
  export default zprwStatistics;