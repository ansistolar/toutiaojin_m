import request from "@/utils/request";

export const getArticleByID = articleId => request({
    method: 'GET',
    url: 'http://toutiao.itheima.net/v1_0/articles/' + articleId
})