import Vue from 'vue'
import Router from 'vue-router'

import { AppMain, Navbar, Sidebar } from '@/components'

// Router Modules
import consoleRouter from './modules/console/'
import noConsoleRouter from './modules/noConsole' //无权限专用
// import logRouter from './modules/log'
import classRouter from './modules/class'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/redirect',
        components: {
            default: AppMain,
            sidebar: Sidebar,
            navbar: Navbar
        },
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/view/redirect/index')
            }
        ]
    },
    {
        path: '/',
        redirect: '/console/auth'
    },
    // {
    //     path: '/test',
    //     component: () => import('@/view/test')
    // },
    {
        path: '/login',
        component: () => import('@/view/login'),
        hidden: true
    },
    {
        path: '/profile/index',
        component: () => import('@/view/profile'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/view/error/404'),
        hidden: true
    },
]

export const asyncRoutes = [
    ...consoleRouter,
    noConsoleRouter,
    // logRouter,
    ...classRouter,
    { path: '*', redirect: '/404', hidden: true }
]

const createRoute = () => new Router({
    // mode: 'history', require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRoute()

export function resetRouter() {
    const newRouter = createRoute()
    router.matcher = newRouter.matcher
}

export default router