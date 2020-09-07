import request from '@/util/request'

/**
 * 权限管理-获取全局权限表（分页列表）
 * @param {Number} isSearchCount //是否计算总页数，默认1计算
 * @param {String} name //权限名称
 * @param {Number} pageNum //当前页码（默认1）
 * @param {Number} pageSize //每页记录数（默认10）
 * @param {*} data 
 * @param {String} loading //可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
 */
export function getAuthList(data) {
    return request({
        url: '/user/user-sys-config/meunList',
        method: 'post',
        data,
        loading: 'tbody'
    })
}

/**
 * 权限管理-根据父权限id获取子权限
 * @param {String} pid //父权限id
 */
export function getSubAuth(pid) {
    return request({
        url: '/user/user-sys-config/getSubAuth',
        method: 'post',
        data: { pid },
        loading: '.loading-container'
    })
}

/**
 * 权限管理-获取全局权限表(所有)
 */
export function getMeunList() {
    return request({
        url: '/user/user-sys-config/getMeunList',
        method: 'post',
    })
}