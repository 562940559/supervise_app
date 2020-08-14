/**
  * 公告模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const notice = {
   getNoticeList(data) {
     return axios.post(`${base.baseUrl}/app/index/home/notice`,data)
   },
   getNoticeDetail(id) {
     return axios.post(`${base.baseUrl}/app/index/home/notice/${id}`)
   }
 }

 export default notice;