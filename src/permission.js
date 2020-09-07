import router from './router'
import getPageTitle from './util/get-page-title'
import { getToken } from './util/auth' //从cookie获取token
import store from './store'
import NProgress from 'nprogress' // Add nprogress.js and nprogress.css to your project.
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {

    NProgress.start()

    // 设置页码标题
    document.title = getPageTitle(to.meta.title)
    // 确定用户是否已经登录
    const token = getToken()
    // const token = store.getters.token
    if (token) {
        if (to.path === '/login') {
            // 如果已登录，重定向到首页
            next({ path: '/' })
            NProgress.done()
        } else {
            // 确定用户是否已通过getInfo获得其权限角色
            // const hasRoles = store.getters.roles && store.getters.roles.length > 0
            // if (hasRoles) {
            if (store.state.permission.routesReady) {
                next()
            } else {
                try {
                    // ------------------------------------------ (1)去api调试 line 29-33,36 <=> 34,37 --------------------------------------------------------
                    // 角色必须是对象数组！例如：['admin']或，['developer'，'editor']
                    const configRoutes = await store.dispatch('permission/getConfigRoutes')
                    // 基于角色生成可访问路由表
                    const accessRoutes = await store.dispatch('permission/generateRoutes', configRoutes)

                    router.addRoutes(accessRoutes)
                    // 设置replace: true，这样导航就不会留下历史记录
                    // next({ ...to, replace: true })
                    next({ path: accessRoutes[0].path, replace: true })
                    // next({ path, replace: true })
                } catch (error) {
                    console.log(error)
                    // 移除token和roles并转到登录页以重新登录
                    store.dispatch('user/resetUserInfo')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
    // if(!flag) {
    //     console.log('a')
    //     flag = 1
    //     const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin'])
    //     router.addRoutes(accessRoutes)
    //     next({ path: accessRoutes[0].path, replace: true })
    // } else {
    //     console.log('b')
    //     next()
    // }
})
// let flag = 0

router.afterEach(() => {
    NProgress.done()
})