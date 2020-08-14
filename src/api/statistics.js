/**
  * 督办统计模块接口列表
  */

import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from './base'; // 导入接口域名列表

const mine = {
  getStatisticsList() { //获取督办统计各处室列表
    return axios.post(`${base.baseUrl}/app/index/home/dbtj`)
  },
  getStatisticsSecondList(data) { //获取二级页面列表
    return axios.post(`${base.baseUrl}/app/index/home/dbtj/info`,data)
  },
  getStatisticsDetail(id,data) { //获取详情
    return axios.post(`${base.baseUrl}/app/index/home/dbtj/info/${id}`,data)
  }
}

export default mine;