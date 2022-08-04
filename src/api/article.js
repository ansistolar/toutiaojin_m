import request from "@/utils/request";
import store from "@/store/index"

// 获取文章详情数据
export const getArticleByID = articleId => request({
    method: 'GET',
    url: 'articles/' + articleId
})

// 取消关注
export const delFollow = artId => request({
    method: "DELETE",
    url: "user/followings/" + artId,
})

// 添加关注
export const addFollow = target => request({
    method: "POST",
    url: "user/followings",
    data: {
        target
    }
})

// 文章收藏
export const addCollect = ArtId => {
        // request({
        //     method: "POST",
        //     url: "article/collections",
        //     data: {
        //         target: ArtId
        //     }
        // })
        // 手写静态资源

        setTimeout(() => {
            store.commit('addCollect', ArtId)
        }, 10000);
    }
    // 取消文章收藏
export const delCollect = ArtId => {
    // return request({
    //     method: "DELETE",
    //     url: "article/collections/",
    //     data: {
    //         target: ArtId
    //     }
    // })
    // 手写静态资源
    setTimeout(() => {
        console.log('这里一致性');
        store.commit('delCollect', ArtId)
    }, 10000);
}