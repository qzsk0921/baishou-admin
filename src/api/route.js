import request from '@/util/request'

/**
 * 获取员工路由配置(员工管理-获取当前用户权限)
 */
export function getConfigRoutes(target) {
    return request({
        url: '/user/user-web-account/getCurrentAuth',
        method: 'post',
        loading: target ? target : null
    })
}