/**
  * 审计系统查询模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const auditSystem = {
  getAuditList(data) {
    return axios.post(`${base.baseUrl}/app/index/audit/projectQuery`,data)
  },
  getZJ() { //获取中介机构
    return axios.post(`${base.baseUrl}/app/index/audit/projectQuery/screen`)
  },
  getDetails(id) {
    return axios.post(`${base.baseUrl}/app/index/audit/projectQuery/info/${id}`)
  }
 }

 export default auditSystem;