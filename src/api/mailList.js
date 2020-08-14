/**
  * 通讯录模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const mailList = {
   getMailTitle(data) { // 获取通讯录部门名称
    return axios.post(`${base.baseUrl}/app/index/address_book`,data)
   },
   getMailDetail(depart_id) { // 获取通讯录详细信息
    return axios.post(`${base.baseUrl}/app/index/address_book/${depart_id}`)
   },
   getOnlineNumber() { //获取在线人数
    return axios.post(`${base.baseUrl}/app/chat/selectOnlineUsers`)
   },
   getGroupChatList() { // 获取用户所有群聊列表
    return axios.post(`${base.baseUrl}/app/groupChat/allGroupDetail`)
   }
 }

 export default mailList;