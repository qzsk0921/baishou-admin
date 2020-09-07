import request from '@/util/request'

/**
 * 角色管理-分页列表
 * @param {Number} isSearchCount //是否计算总页数，默认1计算
 * @param {Number} pageNum //当前页码(默认1)
 * @param {Number} pageSize //每页记录数(默认10)
 * @param {String} roleCode //编码
 * @param {String} roleName //名称
 * @param {String} m_roleCode //编码(模糊)
 * @param {String} m_roleName //名称(模糊)
 * @param {String} queryContent //(模糊)
 * 
 */
export function getRoleList(data) {
    return request({
        url: '/user/user-web-role/list',
        method: 'post',
        data,
        loading: 'tbody'
    })
}
/**
 * 角色管理-创建
 * @param {String} roleCode //编码 require
 * @param {String} roleName //名称 require
 * @param {String} orderNum //排序号
 * 
 */
export function addRole(data) {
    return request({
        url: '/user/user-web-role/add',
        method: 'post',
        data
    })
}
/**
 * 角色管理-修改
 * @param {String} id //主键ID require
 * @param {String} roleCode //编码 require
 * @param {String} roleName //名称 require
 * @param {String} orderNum //排序号
 */
export function updateRole(data) {
    return request({
        url: '/user/user-web-role/update',
        method: 'post',
        data
    })
}
/**
 * 角色管理-删除
 * @param {String} id //主键ID require
 */
export function removeRole(data, target) {
    return request({
        url: '/user/user-web-role/remove',
        method: 'post',
        data,
        loading: target ? target : null
    })
}
/**
 * 根据ID获取角色
 * @param {String} id //主键ID require
 */
export function getOneRole(id) {
    return request({
        url: '/user/user-web-role/getOne',
        method: 'post',
        data: { id },
        loading: '.loading-container'
    })
}
/**
 * 角色管理-根据ID获取角色权限码
 * @param {String} id //角色ID require
 */
export function getRoleCode(id) {
    return request({
        url: '/user/user-web-role/getAuthCode',
        method: 'post',
        data: { id },
        loading: '.loading-container'
    })
}

/**
 * 角色管理-分配权限-保存
 * @param {String} authCode //权限码
 * @param {String} id //主键ID
 */
export function updateAuth(data) {
    return request({
        url: '/user/user-web-role/updateAuth',
        method: 'post',
        data
    })
}

/**
 * 权限管理-获取全局权限表（tree）
 */
export function getGlobalAuth() {
    return request({
        url: '/user/user-sys-config/getGlobalAuthMenu',
        method: 'post',
        loading: '.loading-container'
    })
}

/**
 * 角色管理-列表(查询用)
 */
export function getRoleListAll() {
    return request({
        url: '/user/user-web-role/getRolelist',
        method: 'post',
    })
}
