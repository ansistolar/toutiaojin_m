import Vue from "vue"
import dayjs from "dayjs"

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// dayjs 默认语言为英语，我们这里配置为中文
dayjs.locale('zh-cn'); // 全局使用

// 导入 相对时间 插件
import relativeTime from "dayjs/plugin/relativeTime";
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用了
// 其实过滤器就相当于一个全局可用的方法（仅供模板中使用）
// 参数1：过滤器名称 ； 参数2：过滤器函数
// 使用方式： {{ 表达式 | 过滤器名称 }}
// 管道符'|'前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染搭配使用过滤器的模板位置
Vue.filter('relativeTime', value => dayjs().to(dayjs(value)))
    // dayjs().from(dayjs('1990')) // 2 years ago

// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'));

// 需要在 main.js 中引入此配置文件
// import "@/utils/dayjs.js"