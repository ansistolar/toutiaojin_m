import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from "@/views/login/index.vue"

import layout from "@/views/layout/"
import home from "@/views/home"
import qa from "@/views/qa"
import videop from "@/views/videop"
import my from "@/views/my"

import search from "@/views/search"

import article from "@/views/article"

import userProfile from "@/views/user-profile"

Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: "layout"
    },
    {
        path: "/login",
        name: "login",
        component: login
    }, {
        path: "/layout",
        name: "layout",
        component: layout,
        children: [{
                path: '/',
                redirect: 'home'
            },
            {
                path: "home",
                name: "home",
                component: home
            }, {
                path: "qa",
                name: "qa",
                component: qa
            }, {
                path: "videop",
                name: "videop",
                component: videop
            }, {
                path: "my",
                name: "my",
                component: my
            }
        ]
    }, {
        path: "/search",
        name: "search",
        component: search,
    },
    {
        path: "/article/:articleId", // ：指的是这里将要传入参数
        name: "article",
        component: article,
        props: true, // 开启 Props 传参，说白了就是把路由参数映射到组件的 Props 数据中
    },
    {
        path: "/userProfile",
        name: "userProfile",
        component: userProfile,
        props: true, // 组件中 Props 可以接收路由参数
    }
]

const router = new VueRouter({
    routes
})

export default router