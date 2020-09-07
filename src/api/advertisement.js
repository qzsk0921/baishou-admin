import request from '@/util/request'

// 广告类型----------------------------------------------------------------------------------------
/**
 * 广告类型-分页列表
 * @param {*} data
 * @param {Number} isSearchCount
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @param {String} typeName
 */
export function getAdvertisementTypeList(data) {
    return request({
        url: '/advert/advert-type/list',
        method: 'post',
        data,
        loading: 'tbody'
    })
}

/**
 * 广告类型-根据ID获取对象
 * @param {*} id require
 */
export function getOneAdvertisementType(id) {
    return request({
        url: '/advert/advert-type/getOne',
        method: 'post',
        data: { id },
        loading: '.loading-container'
    })
}

/**
 * 广告类型-新增
 * @param {*} data 
 * @param {String} orderNum //排序
 * @param {String} typeCode //类型编码
 * @param {String} typeName //类型名称
 */
export function addAdvertisementType(data) {
    return request({
        url: '/advert/advert-type/add',
        method: 'post',
        data
    })
}

/**
 * 广告类型-修改
 * @param {*} data 
 * @param {String} id //主键ID require
 * @param {String} orderNum //排序
 * @param {String} typeCode //类型编码
 * @param {String} typeName //类型名称
 */
export function updateAdvertisementType(data) {
    return request({
        url: '/advert/advert-type/update',
        method: 'post',
        data
    })
}

/**
 * 广告类型-物理删除
 * @param {*} data
 * @param {String} id //主键ID require 
 */
export function removeAdvertisementType(data, target) {
    return request({
        url: '/advert/advert-type/remove',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 广告类型-获取广告类型列表
 * @param {*} data
 */
export function getAdvertisementTypeAllList() {
    return request({
        url: '/advert/advert-type/allList',
        method: 'post',
        loading: 'tbody'
    })
}

// 广告----------------------------------------------------------------------------------------
/**
 * 广告(需要分表)-分页列表
 * @param {*} data
 */
export function getAdvertisementList(data, target) {
    return request({
        url: '/advert/advert-source/list',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 广告(需要分表)-根据ID获取对象
 * @param {String} id require 
 */
export function getOneAdvertisement(id) {
    return request({
        url: '/advert/advert-source/getOne',
        method: 'post',
        data: { id },
        loading: '.loading-container'
    })
}

/**
 * 广告(需要分表)-创建
 * @param {*} data 
 * @param {String} begTime 有效开始时间(2020-03-05 08:30:00) require
 * @param {String} clientName 广告商家名称 require
 * @param {String} endTime 有效结束时间 require(2021-03-05 08:29:59)
 * @param {file} file file require
 * @param {String} sourceCode 广告编码 require
 * @param {String} sourceName 广告名称 require
 * @param {String} typeId 广告类型ID require
 * @param {String} advertDesc 广告描述 
 * @param {String} advertLink 广告地址 
 * @param {String} fileFormat 广告文件格式 
 */
export function addAdvertisement(data) {
    return request({
        url: '/advert/advert-source/add',
        method: 'post',
        data,
        loading: 'body',
        // header: { 'Content-Type': 'multipart/form-data' },
        dataType: 'data/formdata',
        timeout: 20000
    })
}

/**
 * 广告(需要分表)-修改
 * @param {*} data
 * @param {String} begTime 有效开始时间(2020-03-05 08:30:00) require
 * @param {String} clientName 广告商家名称 require
 * @param {String} endTime 有效结束时间 (2021-03-05 08:29:59) require
 * @param {String} id 主键ID require
 * @param {String} sourceCode 广告编码 require
 * @param {String} sourceName 广告名称 require
 * @param {String} typeId 广告类型ID require
 * @param {String} advertDesc 广告描述 
 * @param {String} advertLink 广告地址 
 * @param {String} fileFormat 广告文件格式
 * @param {String} filePath 广告文件路径
 */
export function updateAdvertisement(data) {
    return request({
        url: '/advert/advert-source/update',
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
export function removeAdvertisement(data, target) {
    return request({
        url: '/advert/advert-source/remove',
        method: 'post',
        data,
        loading: target ? target : null
    })
}