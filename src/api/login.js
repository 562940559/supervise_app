/**
  * 登陆模块接口列表
  */

import axios from '@/utils/http'; // 导入http中创建的axios实例
import base from './base'; // 导入接口域名列表

const login = {
  goLogin (data) {
    return axios.post(`${base.baseUrl}/app/login`, data);
  },
  getCode (data) {
    return axios.post(`${base.baseUrl}/app/getVerificationCode`,data);
  },
  codeGoLogin(data) { //验证码登录
    return axios.post(`${base.baseUrl}/app/phoneLogin`,data);
  }
}

export default login;