/**
  * 问题回答模块接口列表
  */

 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import base from './base'; // 导入接口域名列表

 const question = {
  getQuestionStaList() { // 获取回答问题统计
    return axios.post(`${base.baseUrl}/app/answerManage/answerStatistics`)
  },
  createEverydayQuestion() { //创建每日一答
    return axios.post(`${base.baseUrl}/app/answerManage/answeraDay`)
  },
  saveQuestion(data) { // 保存答题
    return axios.post(`${base.baseUrl}/app/answerManage/saveAnswerRecords`,data)
  },
  getNextQuestion() { // 获取下一道题
    return axios.post(`${base.baseUrl}/app/answerManage/getNextQuestion`)
  },
  getQuestionLogList() { // 获取答题记录列表
    return axios.post(`${base.baseUrl}/app/answerManage/answerHistory`)
  },
  getQuestionLogDetail(data) { // 获取答题记录详情
    return axios.post(`${base.baseUrl}/app/answerManage/detailedAnswer`,data)
  },
 }

 export default question;