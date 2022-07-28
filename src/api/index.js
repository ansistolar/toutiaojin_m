// login 界面

// 用户登录认证
import { userLogin } from "@/api/login"
export const userLoginAPI = userLogin

// 发送短信验证码
import { sendSms } from "@/api/login"
export const sendSmsAPI = sendSms;