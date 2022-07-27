// 对axios进行二次封装
// 这样的好处是：以后要换网络请求直接在这里换即可，不用到每个vue文件一个个去改
import axios from 'axios';
// axios.defaults.baseURL = "http://toutiao.itheima.net/v1_0/"
// export default axios

const request = axios.create({
    baseURL: "http://toutiao.itheima.net/v1_0/"
})

// 请求拦截器

// 响应拦截器

export default request;