import store from "@/store";
import request from "@/utils/request";

// 主页 页面相关接口

// 获取所有频道
export const getAllChannel = async() => {
    const res = await request({
            method: 'GET',
            url: 'channels',
        })
        // 将全部频道缓存到 vuex -xiaojin/data/allChannel 中
    store.state.xiaojin.data.allChannel = res.data.data.channels
    return store.state.xiaojin.data.allChannel;
}

// 获取用户频道
export const getUserChannel = () => {
    // return request({
    //         method: 'GET',
    //         url: 'user/channels',
    //         headers: {
    //             Authorization: 'Bearer' + store.state.user.token;
    //         }
    //     })
    // 手动写静态资源
    // if (store.state.user.token) {
    store.commit('getUserChannel')
        // console.log(store.state.xiaojin.data.jinChannel);
    return store.state.xiaojin.data.jinChannel
        // }
}


// 获取所有频道新闻推荐列表
export const getAllArticleList = params => {
    return request({
        method: 'GET',
        url: 'articles',
        params
    })
}