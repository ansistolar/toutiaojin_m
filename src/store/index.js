import Vue from 'vue'
import Vuex from 'vuex'

// 导入封装好的 本地存储操作模块
import { getItem, setItem } from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 用来存储用户数据（Token等）
        // user: null,
        // 直接从本地获取初始值
        // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
        user: getItem('TOUTIAO_USER'),
        // 这里是 自己写的静态资源 start
        xiaojin: {
            data: {
                message: '获取用户信息成功',
                data: {
                    id: '20001210',
                    name: 'xiaojin',
                    photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
                    is_media: 'true',
                    intro: '他叫小金',
                    certi: '自媒体认证说明',
                    art_count: '22',
                    follow_count: '35',
                    fans_count: '782',
                    like_count: '951'
                },
                allChannel: {

                },
                // jinChannel: {}
                jinChannel: []
            }
        }
        // 这里是 自己写的静态资源 start
    },
    getters: {},
    mutations: {
        setUser(state, data) {
            state.user = data;
            // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
            setItem('TOUTIAO_USER', state.user)
        },
        getUserChannel(state) {
            for (var i = 0; i < 8; i++) {
                state.xiaojin.data.jinChannel[i] = state.xiaojin.data.allChannel[2 * i]
            }
            console.log('jinChannel', state.xiaojin.data.jinChannel);
        },
        // addUserChannel(state, additem) {
        //     state.xiaojin.data.jinChannel.push(additem);
        // }
    },
    actions: {},
    modules: {}
})