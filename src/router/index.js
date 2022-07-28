import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from "@/views/login/index.vue"

Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: "login"
    },
    {
        path: "/login",
        name: "login",
        component: login
    }
]

const router = new VueRouter({
    routes
})

export default router