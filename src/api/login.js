import request from "@/utils/request";

// login页面相关请求

// 用户登录认证
export const userLogin = data => request({
    method: 'POST',
    url: 'authorizations',
    data,
})

// 发送短信验证码
export const sendSms = telNum => request({
    method: 'GET',
    url: 'sms/codes/' + telNum,
})