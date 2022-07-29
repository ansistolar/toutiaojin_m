// 对axios进行二次封装
// 这样的好处是：以后要换网络请求直接在这里换即可，不用到每个vue文件一个个去改
import axios from 'axios';
import store from '../store/index'
// axios.defaults.baseURL = "http://toutiao.itheima.net/v1_0/"
// export default axios

const request = axios.create({
    baseURL: "http://toutiao.itheima.net/v1_0/"
})

// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // console.log(config);
    // 通过拦截器优化Token设置
    const user = store.state.user;
    if (user && user.token) {
        config.headers.Authorization = 'Bearer' + user.token;
    }
    console.log(config.headers.Authorization);
    // 务必 return config 否则请求永远停在这里了
    return config;
}, function(error) {
    // 如果请求出错了（还没有发出去）会进入这里
    return Promise.reject(error);
});

// 响应拦截器

export default request;