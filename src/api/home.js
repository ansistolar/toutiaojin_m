import store from "@/store";
import request from "@/utils/request";

// 主页 页面相关接口

// 获取所有频道
export const getAllChannel = () => {
    return request({
        method: 'GET',
        url: 'channels',
    })
}

// 获取所有频道新闻推荐列表
export const getAllArticleList = params => {
    return request({
        method: 'GET',
        url: 'articles',
        params
    })
}

// 获取用户 频道
export const getUserChannel = () => {
    // return request({
    //         method: 'GET',
    //         url: 'user/channels',
    //         headers: {
    //             Authorization: 'Bearer' + store.state.user.token;
    //         }
    //     })
    // 手动写静态资源
    if (store.state.user.token) {
        console.log('获取用户频道成功');
        return store.state.xiaojin
    }
}