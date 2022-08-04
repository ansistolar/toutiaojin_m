// 对axios进行二次封装
// 这样的好处是：以后要换网络请求直接在这里换即可，不用到每个vue文件一个个去改
import axios from 'axios';
import store from '../store/index'
// axios.defaults.baseURL = "http://toutiao.itheima.net/v1_0/"
// export default axios

const request = axios.create({
    // 接口的基准路径
    baseURL: "http://toutiao.itheima.net/v1_0/",

    // 自定义后端返回的原始数据
    // 任何请求都会通过 transformResponse
    // data:后端返回的原始数据，说白了就是 JSON 格式的字符串
    transformResponse: [
        // axios 默认会在内部这样来处理后端返回的数据
        // return JSON.parse(data);
        function(data) {
            // 就是说 后端返回的数据格式是 JSON 就用 json-bigint 来解析，否则返回原数据
            try {
                return JSONBig.parse(data);
            } catch (error) {
                return data;
            }
        }
    ]
})

// 使用 json-bigint 对大数据进行处理
import JSONBig from "json-bigint"
const jsonStr = '{ "art_id": 1245953273786007552 }'
console.log(JSON.parse((jsonStr))); // 1245953273786007600
console.log(JSONBig.parse((jsonStr)));
// 需要使用的时候把 BigNumber 类型的数据转为字符串来使用
console.log(JSONBig.parse(jsonStr).art_id.toString()); // "1245953273786007552"
// 将转换出来的字符串还原为 JSON 格式的文件
console.log(JSONBig.stringify(JSONBig.parse(jsonStr))); // {"art_id":1245953273786007552}


// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // console.log(config);
    // 通过拦截器优化Token设置
    const user = store.state.user;
    if (user && user.token) {
        config.headers.Authorization = 'Bearer ' + user.token;
        // console.log('来这里了');
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