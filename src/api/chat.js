/**
  * 聊天模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const chat = {
  getHistory(data) { //获取聊天历史记录
    return axios.post(`${base.baseUrl}/app/chat/findHistoryRecord`,data)
  },
  getNoRead(data) { //获取未读消息
    return axios.post(`${base.baseUrl}/app/chat/queryUnreadMessages`,data)
  },
  getGroupChatNoRead(id) { //获取群聊未读消息
    return axios.post(`${base.baseUrl}/app/groupChat/groupUnreadMessage/${id}`)
  },
  uploadChat(data) { // 更新聊天情况
    return axios.post(`${base.baseUrl}/app/chat/readMessage`,data)
  },
  uploadGroupChat(data) { // 更新群聊聊天情况
    return axios.post(`${base.baseUrl}/app/groupChat/updateResponseTime`,data)
  },
  addGroupChat(data) { // 创建群聊
    return axios.post(`${base.baseUrl}/app/groupChat/createGroup`,data)
  },
  getGroupChatHistory(id,data) { //获取群聊的历史记录
    return axios.post(`${base.baseUrl}/app/groupChat/findGroupChatRecord/${id}`,data)
  },
  getGroupChatInfo(id) { // 获取群聊详细信息
    return axios.post(`${base.baseUrl}/app/groupChat/groupDetail/${id}`)
  },
  setGroupChatName(id,data) { // 修改群信息
    return axios.post(`${base.baseUrl}/app/groupChat/updateGroup/${id}`,data)
  },
  addGroupChatNumber(id,data) { // 添加群成员
    return axios.post(`${base.baseUrl}/app/groupChat/addGroupMembers/${id}`,data)
  },
  getGroupChatFile(id) { //获取聊天文件
    return axios.post(`${base.baseUrl}/app/groupChat/findGroupFile/${id}`)
  },
  dissolutionGroup(id) { //解散群
    return axios.post(`${base.baseUrl}/app/groupChat/dissolutionGroup/${id}`)
  },
  outGroup(id) { //退出群
    return axios.post(`${base.baseUrl}/app/groupChat/exitGroup/${id}`)
  },
  sendSelectLibrary(data) { // 发送选中的文档库文件（单对单）
    return axios.post(`${base.baseUrl}/app/chat/sendChooseFile`,data)
  },
  sendGroupSelectLibrary(data) { // 发送选中的文档库文件（单对单）
    return axios.post(`${base.baseUrl}/app/groupChat/groupSendChooseFile`,data)
  },
 }

 export default chat;