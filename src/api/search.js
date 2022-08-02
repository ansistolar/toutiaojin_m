import store from "@/store"
import request from "@/utils/request"

// 搜索 页面相关接口

// 搜索建议
export const getSearchRecommend = q => request({
    method: "GET",
    url: 'suggestion',
    params: {
        q
    }
})

// 获取搜索结果
export const getSearchResult = params => request({
    method: 'GET',
    url: '/search',
    params
})