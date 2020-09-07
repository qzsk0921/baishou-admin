import request from '@/util/request'

// 界面分类----------------------------------------------------------------------------------------
/**
 * 界面分类-分页列表
 * @param {*} data
 * @param {Number} code 编码
 * @param {Number} isActive 是否有效
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {String} name 界面分类名称
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 */
export function getInterfaceTypeList(data) {
    return request({
        url: '/system/system-interface-sort/list',
        method: 'post',
        data,
        loading: 'tbody'
    })
}

/**
 * 界面分类-根据ID获取对象
 * @param {*} id require
 */
export function getOneInterfaceType(id, target) {
    return request({
        url: '/system/system-interface-sort/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : '.tab-container'
    })
}

/**
 * 界面分类-新增
 * @param {*} data 
 * @param {String} code //编码 require
 * @param {String} isActive //是否有效 require
 * @param {String} name //界面分类名称 require
 * @param {String} orderNum //排序 require
 * @param {String} introduction //简介
 */
export function addInterfaceType(data, target) {
    return request({
        url: '/system/system-interface-sort/add',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 界面分类-修改
 * @param {*} data 
 * @param {String} id //主键ID require
 * @param {String} code //编码 
 * @param {String} isActive //是否有效 
 * @param {String} name //界面分类名称 
 * @param {String} orderNum //排序 
 * @param {String} introduction //简介
 */
export function updateInterfaceType(data) {
    return request({
        url: '/system/system-interface-sort/update',
        method: 'post',
        data
    })
}

/**
 * 界面分类-逻辑删除
 * @param {*} data
 * @param {String} id //主键ID require 
 */
export function removeInterfaceType(data, target) {
    return request({
        url: '/system/system-interface-sort/delete',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 界面-获取所有界面分类
 */
export function getInterfaceTypeAll(target) {
    return request({
        url: '/system/system-interface/getInterfaceSortAll',
        method: 'post',
        loading: target ? target : '.interface-type-edit-container'
    })
}


/**
 * 界面分类-根据分类id获取界面列表
 */
export function getInterfaceListBySortId(sortId, target) {
    return request({
        url: '/system/system-interface-sort/interfaceListBySortId',
        method: 'post',
        data: { sortId },
        loading: target ? target : null
    })
}


// 界面----------------------------------------------------------------------------------------
/**
 * 界面-分页列表
 * @param {*} data
 * @param {String} code 编码
 * @param {String} interfaceId 界面分类id
 * @param {String} isActive 是否有效
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {String} name 界面分类名称
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 */
export function getInterfaceList(data, target) {
    return request({
        url: '/system/system-interface/list',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 界面-根据ID获取对象
 * @param {String} id require 
 */
export function getOneInterface(id, target) {
    return request({
        url: '/system/system-interface/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null
    })
}

/**
 * 界面-新增
 * @param {*} data 
 * @param {String} code 编码 require
 * @param {String} interfaceId 界面分类id require
 * @param {String} isActive 是否有效 require
 * @param {String} name 界面名称 require
 * @param {String} orderNum 排序 require
 * @param {file} image 广告编码 
 */
export function addInterface(data) {
    return request({
        url: '/system/system-interface/add',
        method: 'post',
        data,
        loading: '.interface-type-edit-container',
        dataType: 'data/formdata',
        timeout: 20000
    })
}

/**
 * 广告(需要分表)-修改
 * @param {*} data
 * @param {String} id 主键ID require
 * @param {String} code 编码
 * @param {String} interfaceId 界面分类id
 * @param {String} isActive 是否有效
 * @param {String} name 界面名称
 * @param {String} orderNum 排序
 * @param {file} image 广告编码
 */
export function updateInterface(data) {
    return request({
        url: '/system/system-interface/update',
        method: 'post',
        data,
        loading: 'body',
        dataType: 'data/formdata',
        timeout: 20000
    })
}

/**
 * 广告(需要分表)-删除
 * @param {*} data
 * @param {String} id 主键ID(如果多个逗号分割)
 */
export function removeInterface(data, target) {
    return request({
        url: '/system/system-interface/delete',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}