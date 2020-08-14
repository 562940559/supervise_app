/**
  * 聊天模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const auditTz = {
  auditTzQuery(data) { // 查询接口
    return axios.post(`${base.baseUrl}/app/index/auditCount/query`,data)
  },
  getDownLoadPath(id) { // 获取文件下载路径
    return axios.post(`${base.baseUrl}/app/index/auditCount/query/getFile/${id}`)
  },
  getDetails(id) { //获取详情
    return axios.post(`${base.baseUrl}/app/index/auditCount/query/info/${id}`)
  }
 }

 export default auditTz;