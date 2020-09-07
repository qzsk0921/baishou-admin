import request from '@/util/request'

/**
 * 公告管理-分页列表
 * @param {*} data
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {String} noticeName 公告名称
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 */
export function getNoticeList(data, target) {
    return request({
        url: '/system/system-notice/list',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 公告管理-根据ID获取对象
 * @param {*} id 主键ID require
 */
export function getOneNotice(id, target) {
    return request({
        url: '/system/system-notice/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null
    })
}

/**
 * 公告管理-新增
 * @param {*} data 
 * @param {String} isShow 是否可见
 * @param {String} noticeName 公告名称
 * @param {String} noticeTxt 公告内容
 * @param {String} orderNum 排序
 */
export function addNotice(data, target) {
    return request({
        url: '/system/system-notice/add',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 公告管理-修改
 * @param {*} data 
 * @param {String} id 主键ID require
 * @param {String} isShow 是否可见
 * @param {String} noticeName 公告名称
 * @param {String} noticeTxt 公告内容
 * @param {String} orderNum 排序
 */
export function updataNotice(data, target) {
    return request({
        url: '/system/system-notice/update',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 公告管理-删除
 * @param {*} data 
 * @param {String} id 主键ID(如果多个逗号分割) require
 */
export function removeNotice(data, target) {
    return request({
        url: '/system/system-notice/delete',
        method: 'post',
        data,
        loading: target ? target : null
    })
}