// login 界面

// 用户登录认证
import {
    userLogin
} from "@/api/login"
export const userLoginAPI = userLogin

// 发送短信验证码
import {
    sendSms
} from "@/api/login"
export const sendSmsAPI = sendSms;

// 我的 页面相关接口

// 获取用户基本信息
import {
    getUserInfo
} from "@/api/my"
export const getUserInfoAPI = getUserInfo;

// 获取用户个人资料 & 编辑用户资料
import { getUserProfile, editUserProfile } from "@/api/my"
export const getUserProfileAPI = getUserProfile;
export const editUserProfileAPI = editUserProfile;

// home 页面相关接口

// 获取所有频道
import {
    getAllChannel
} from "@/api/home"
export const getAllChannelAPI = getAllChannel;

// 获取用户频道
import {
    getUserChannel
} from "@/api/home"
export const getUserChannelAPI = getUserChannel;

// 获取所有频道新闻推荐列表
import {
    getAllArticleList
} from "@/api/home"
export const getAllArticleListAPI = getAllArticleList;

// search 页面相关接口

// 获取搜索建议
import {
    getSearchRecommend
} from "@/api/search"
export const getSearchRecommendAPI = getSearchRecommend

// 获取搜索结果
import { getSearchResult } from "@/api/search"
export const getSearchResultAPI = getSearchResult;

// 文章详情页相关接口

// 获取文章详情
import { getArticleByID } from "./article";
export const getArticleByIDAPI = getArticleByID;

// 取消关注
import { delFollow } from "@/api/article"
export const delFollowAPI = delFollow;

// 添加关注
import { addFollow } from "@/api/article"
export const addFollowAPI = addFollow;

// 收藏 & 取消收藏文章
import { addCollect, delCollect } from "@/api/article"
export const addCollectAPI = addCollect;
export const delCollectAPI = delCollect;

// 获取文章评论
import { getComment } from "@/api/article"
export const getCommentAPI = getComment;

// 对评论点赞 & 取消对评论点赞
import { commentLike, delCommentLike } from "@/api/article"
export const commentLikeAPI = commentLike;
export const delCommentLikeAPI = delCommentLike;

// 对文章或评论进行 评论
import { addComment } from "@/api/article"
export const addCommentAPI = addComment;