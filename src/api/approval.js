/**
  * 审批模块接口列表
  */

import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from './base'; // 导入接口域名列表

const approval = {
  getPendingApprovalList() { //获取待审批列表
    return axios.post(`${base.baseUrl}/app/index/home/approvedData`)
  },
  getApprovedList() { //获取已审批列表
    return axios.post(`${base.baseUrl}/app/index/home/approvedDone`)
  },
  getPendingApprovalDetail(type,id) { //获取待审核详情
    return axios.post(`${base.baseUrl}/app/index/home/${type}/${id}`)
  },
  getApprovedDetail(type,id) { //获取已审核详情
    return axios.post(`${base.baseUrl}/app/index/home/${type}/done/${id}`)
  },
  getHandleProcess(type,id) { //获取办理流程
    return axios.post(`${base.baseUrl}/app/${type}/lcjl/${id}`)
  },
  approvalBtnHandle(type,id,data) { //审批操作
    return axios.post(`${base.baseUrl}/app/index/home/${type}/${id}/deal`,data)
  }
}

export default approval;