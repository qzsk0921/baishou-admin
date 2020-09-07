import request from '@/util/request'

/**
 * 员工管理-分页列表
 * @param {*} data 
 * @param {Number} isSearchCount
 * @param {String} loginId
 * @param {Number} pageNum
 * @param {Number} pageSize
 */
export function getEmployeeList(data) {
    return request({
        url: '/user/user-web-account/list',
        method: 'post',
        data,
        loading: 'tbody'
    })
}

/**
 * 员工管理-创建
 * @param {*} data
 * @param {String} accountName 姓名
 * @param {String} isActive 是否有效
 * @param {String} isAppUser 是否app用户
 * @param {String} loginId 账号
 * @param {String} loginPwd 密码
 * @param {String} orderNum 排序
 */
export function addEmployee(data) {
    return request({
        url: '/user/user-web-account/add',
        method: 'post',
        data
    })
}

/**
 * 员工管理-删除
 * @param {String} id //主键ID require
 */
export function removeEmployee(data, target) {
    return request({
        url: '/user/user-web-account/delete',
        method: 'post',
        data,
        loading: target ? target : null
    })
}
/**
 * 员工管理-根据ID获取员工信息
 * @param {String} id //主键ID require 
 */
export function getOneEmployee(id) {
    return request({
        url: '/user/user-web-account/getOne',
        method: 'post',
        data: { id },
        loading: '.loading-container'
    })
}

/**
 * 员工管理-修改密码
 * @param {*} data
 * @param {String} id //主键ID require
 * @param {String} loginPwd //新密码 require
 * @param {String} loginPwd2 //确认新密码 require
 */
export function changeEmployeePwd(data) {
    return request({
        url: '/user/user-web-account/changePwd',
        method: 'post',
        data
    })
}

/**
 * 员工管理-修改密码
 * @param {*} data
 * @param {String} id //主键ID require
 * @param {String} accountName //姓名
 * @param {String} isActive //是否有效
 * @param {String} orderNum //排序
 */
export function updateEmployee(data) {
    return request({
        url: '/user/user-web-account/update',
        method: 'post',
        data
    })
}

/**
 * 员工管理-分配角色
 * @param {*} data
 * @param {*} id 用户ID
 * @param {*} roleId 角色ID
 */
export function updataEmployeeRole(data, target) {
    return request({
        url: '/user/user-web-account/changeRole',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 角色管理-列表
 */
export function getRoleListAll(target) {
    return request({
        url: '/user/user-web-role/getRolelist',
        method: 'post',
        loading: target ? target : null
    })
}