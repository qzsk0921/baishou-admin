import { constantRoutes, asyncRoutes } from '@/router'
import { getConfigRoutes } from '@/api/route'

// function hasPermission(roles, route) {
//     if (route.meta && route.meta.roles) {
//         return roles.some(role => route.meta.roles.includes(role))
//     } else {
//         return true
//     }
// }

// export function filterAsyncRoutes(roles, routes) {
//     console.log(routes)
//     const res = []
//     routes.forEach(route => {
//         const temp = { ...route }
//         if (hasPermission(roles, temp)) {
//             if (temp.children) {
//                 temp.children = filterAsyncRoutes(roles, temp.children)
//             }
//             res.push(temp)
//         }
//     })
//     return res
// }

const routerArr = []
const whiteList = ['操作分类']

function parseConfigRoutes(configRoutes) {
    configRoutes.forEach(conf => {
        routerArr.push(conf.name)
        if (conf.child) {
            parseConfigRoutes(conf.child)
        }
    })

    return routerArr
}

function hasPermission(route, configRoutesArr) {
    // if (route.meta && route.meta.title) {
    //     return configRoutesArr.includes(route.meta.title) || whiteList.includes(route.meta.title)
    // } else {
    //     return true
    // }
    if (route.meta && route.meta.id) {
        return configRoutesArr.includes(route.meta.id) || whiteList.includes(route.meta.title)
    } else {
        return true
    }
}

export function filterAsyncRoutes(configRoutesArr, routes) {
    const res = []
    routes.forEach(route => {
        if (hasPermission(route, configRoutesArr)) {
            const temp = { ...route }
            if (temp.children) {
                temp.children = filterAsyncRoutes(configRoutesArr, temp.children)
            }
            res.push(route)
        }
    })
    return res
}

const state = {
    routes: [],
    addRoutes: [],
    routesReady: false,
    currentMenuId: null, // 配合后端:调用接口时接口所在页面带上所归属的的菜单ID 在header: menuId
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    SET_ROUTES_READY(state, boolean) {
        state.routesReady = boolean
    },
    SET_MENU_ID(state, menuId) {
        state.currentMenuId = menuId
    }
}

const actions = {
    // generateRoutes({ commit }, roles) {
    //     return new Promise(resolve => {
    //         let accessedRoutes
    //         if (roles.includes('admin')) {
    //             accessedRoutes = asyncRoutes || []
    //         } else {
    //             accessedRoutes = filterAsyncRoutes(roles, asyncRoutes)
    //         }
    //         commit('SET_ROUTES', accessedRoutes)
    //         resolve(accessedRoutes)
    //     })
    // }
    // ----------------------------(2)去api-------------------------------------------------------
    getConfigRoutes() {
        return new Promise((resolve, reject) => {
            getConfigRoutes('body').then(res => {
                resolve(res.object)
            }).catch(err => {
                reject(err)
            })
        })
    },
    generateRoutes({ commit }, configRoutes) {
        return new Promise(resolve => {

            let configRoutesArr = [-1] // 没有权限的角色员工为空数组

            if (configRoutes) {
                // configRoutesArr = parseConfigRoutes(configRoutes) //生成路由名称数组
                configRoutesArr = configRoutes.split(',').map(Number)
            }
            // let accessedRoutes = filterAsyncRoutes(roles, asyncRoutes)
            let accessedRoutes = filterAsyncRoutes(configRoutesArr, asyncRoutes)
            commit('SET_ROUTES', accessedRoutes)
            commit('SET_ROUTES_READY', true)
            resolve(accessedRoutes)
        })
    },
    setCurrentMenuId({ commit }, menuId) {
        commit('SET_MENU_ID', menuId)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}