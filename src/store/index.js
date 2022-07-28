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
        user: getItem('TOUTIAO_USER')
    },
    getters: {},
    mutations: {
        setUser(state, data) {
            state.user = data;
            // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
            setItem('TOUTIAO_USER', state.user)
        }
    },
    actions: {},
    modules: {}
})