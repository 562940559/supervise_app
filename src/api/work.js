/**
  * “工作”模块接口列表
  */

import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from './base'; // 导入接口域名列表

const work = {
  getWorkCount() { // 获取首页各任务的分配数量
    return axios.post(`${base.baseUrl}/app/index/home`)
  },
  getMineMissionPower() { //获取我的任务的权限
    return axios.post(`${base.baseUrl}/app/index/myjob`)
  },
  getNotice() { // 获取首页公告
    return axios.post(`${base.baseUrl}/app/index/home/notice`)
  },
  getTodoList(data) { //获取待办列表
    return axios.post(`${base.baseUrl}/app/index/todo`,data)
  },
  getStatuteList(data) { //获取法规列表
    return axios.post(`${base.baseUrl}/app/index/regulatory/queryLay`,data)
  },
  getStatuteDetail(data) { //获取法规详情
    return axios.post(`${base.baseUrl}/app/index/regulatory/findById`,data)
  },
  getWorkApi() { // 首页权限内容统一接口
    return axios.post(`${base.baseUrl}/app/index/myHome`)
  }
}

 export default work;