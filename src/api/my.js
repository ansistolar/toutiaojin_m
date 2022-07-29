import store from "@/store";
import request from "@/utils/request";
import axios from "axios";

// 我的 页面相关接口

// 获取用户基本信息
export const getUserInfo = () => {
    // return request({
    //     ethod: 'GET',
    //     url: 'user',
    //     headers: {
    //         Authorization: 'Bearer' + store.state.user.token,
    //     }
    // })
    // 手动写静态资源
    if (store.state.user.token) {
        return store.state.xiaojin
            // return {
            //     data: {
            //         message: '获取用户信息成功',
            //         data: {
            //             id: '20001210',
            //             name: 'xiaojin',
            //             photo: '这是一个链接',
            //             is_media: 'true',
            //             intro: '他叫小金',
            //             certi: '自媒体认证说明',
            //             art_count: '22',
            //             follow_count: '783',
            //             fans_count: '36',
            //             like_count: '951'
            //         }
            //     }
            // }
    }
}