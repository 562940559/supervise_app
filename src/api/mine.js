/**
  * 个人中心模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const mine = {
   getUserInfo() { // 获取用户信息
    return axios.post(`${base.baseUrl}/app/index/mine`)
   },
   getVer(data) { // 获取版本信息
    return axios.post(`${base.baseUrl}/app/common/check_version`,data)
   },
   fileDownload(id) { // 文件下载
    return axios.get(`${base.baseUrl}/app/downloadFile/${id}`)
   },
   getAllMissionNum() { //获取顶部所有任务数量
    return axios.post(`${base.baseUrl}/app/index/home/rwtj`)
   }
 }

 export default mine;