/**
  * 历史任务接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表
 
 const historyMission = {
   getHistoryMissionList(data) { //获取历史任务列表
    return axios.post(`${base.baseUrl}/app/index/home/historyTask`,data)
   },
   getSeatchMissionList(data) { //获取搜索任务列表
    return axios.post(`${base.baseUrl}/app/index/taskSearch`,data)
   },
   getMissionDetail(id,data) { //获取任务详情
    return axios.post(`${base.baseUrl}/app/index/home/historyTask/info/${id}`,data)
   }
 }
 
 export default historyMission;