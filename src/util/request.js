import axios from 'axios'
import store from '@/store'
import { getToken } from '@/util/auth'
import { Message, Loading } from 'element-ui'
import { stringifyParam } from '@/util/common'
import router from '@/router'


let loadingSelector = [] // 加载的选择器集合
let loadingInstanceArr = [] //加载的实例集合

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,  // url = base url + request url 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中
    timeout: 10000,
})

service.interceptors.request.use(
    requestConfig => {
        // no timeout
        if (requestConfig.timeout === 'infinite') {
            requestConfig.time = 0
        }
        // 加载数据时显示动效(loading实例)
        if (requestConfig.loading) {

            if (!loadingSelector.includes(requestConfig.loading)) {

                loadingSelector.push(requestConfig.loading)

                const loadingInstance = Loading.service({
                    target: requestConfig.loading //dom字符串 要挂载的类名
                })

                loadingInstanceArr.push({ key: requestConfig.url, loadingInstance: loadingInstance, loading: requestConfig.loading })
            } else {
                // 相同区域的loading
                let loadingInstance = null

                loadingInstanceArr.some(_ => {

                    if (_.loading === requestConfig.loading) {

                        loadingInstance = _.loadingInstance

                        return true
                    }
                })

                loadingInstanceArr.push({ key: requestConfig.url, loadingInstance: loadingInstance, loading: requestConfig.loading })
            }

        }

        // do something before request is sent
        requestConfig.headers['agentCode'] = '00'
        requestConfig.headers['deviceType'] = 'pc'
        // requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded' //axios会根据body设置对应的content-type
        if (store.getters.token) {
            // requestConfig.headers['X-Token'] = getToken()
            // requestConfig.headers['token'] = getToken()

            requestConfig.headers['token'] = store.getters.token
        }

        //调用接口时接口所在页面带上所归属的的菜单ID 在header: menuId(菜单id（标记接口源头）,如不属于某个菜单，传0)
        if (store.getters.menu_id)
            requestConfig.headers['menuId'] = store.getters.menu_id
        else
            requestConfig.headers['menuId'] = 0

        // 设置请求头
        if (requestConfig.header) {
            const keys = Object.keys(requestConfig.header)
            keys.forEach(key => {
                // if(requestConfig.header[key]==='multipart/form-data') {
                //     doStringifyParam = false
                // }
                requestConfig.headers[key] = requestConfig.header[key]
            })
        }

        // 当不是表单提交时才对数据进行stringifyParam (data/formdata表示是formData)
        if (!['data/formdata', 'data/json'].includes(requestConfig.dataType)) {
            // ----------------------------------------------(4)去api line 24 -------------------------------------------------
            requestConfig.data = stringifyParam(requestConfig.data)
        }

        return requestConfig
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {

        // 清除loading
        if (loadingInstanceArr.length > 0) {

            const key = response.config.url

            const loading = response.config.loading

            loadingInstanceArr.some((_, index) => {

                if (_.key === key) {

                    loadingInstanceArr.splice(index, 1)

                    const res = loadingInstanceArr.some(_ => _.loading === loading)

                    // 最后一个请求返回时清除loading
                    if (!res) {

                        loadingSelector.splice(loadingSelector.indexOf(_.loading), 1)

                        return _.loadingInstance.close()
                    }
                }
            })
        }

        console.log(response)
        const res = response.data
        // ------------------------------------(5)去api line 38 <=> 39 -------------------------------------------
        if (res.code !== 200) {
            // 402-无权访问
            // if (res.code === 402) return router.push({ path: '/login' })
            if (res.code === 402) {
                // 重置
                store.user.commit('SET_ROUTES_READY', false)
                return router.push({ path: '/login' })
            }

            Message({
                message: res.message || 'Error',
                type: 'error',
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log(error) // for debug
        Message({
            message: error.message || 'Error',
            type: 'error',
        })
        return Promise.reject(error)
    }
)

export default service


