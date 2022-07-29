import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from "@/views/login/index.vue"
import layout from "@/views/layout/"
import home from "@/views/home"
import qa from "@/views/qa"
import videop from "@/views/videop"
import my from "@/views/my"

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
                path: '',
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
    }
]

const router = new VueRouter({
    routes
})

export default router