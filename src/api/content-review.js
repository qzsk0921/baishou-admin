import request from '@/util/request'

// 内容审核
// 长视频管理-------------------------------------------------------------
/**
 * 内容审核-长视频审核管理-分页列表
 * @param {*} data 
 * @param {String} createBegTime 上传开始时间（yyyy-MM-dd）
 * @param {String} createEndTime 上传结束时间（yyyy-MM-dd）
 * @param {String} isRelease 是否已经发布
 * @param {String} isSearchCount 是否计算总页数，默认1计算
 * @param {String} pageNum 当前页码(默认1)
 * @param {String} pageSize 每页记录数(默认10)
 * @param {String} reviewStatus 审核状态：0-未审核，1-审核通过，2-审核不通过
 * @param {String} sourceName 资源名称
 */
export function getLongVideoManagementList(data, target) {
    return request({
        url: '/video/video-long-review/list3',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

// 长视频审核-------------------------------------------------------------
/**
 * 内容审核-长视频审核-分页列表(显示所有未审核的长视频)
 * @param {*} data 
 * @param {String} createBegTime 上传开始时间（yyyy-MM-dd）
 * @param {String} createEndTime 上传结束时间（yyyy-MM-dd）
 * @param {String} isSearchCount 是否计算总页数，默认1计算
 * @param {String} pageNum 当前页码(默认1)
 * @param {String} pageSize 每页记录数(默认10)
 * @param {String} sourceName 资源名称
 */
export function getLongVideoReviewList(data, target) {
    return request({
        url: '/video/video-long-review/list4',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

// 短视频管理-------------------------------------------------------------
/**
 * 视频管理-短视频管理-分页列表
 * @param {*} data 
 * @param {String} reviewStatus 审核状态：0-未审核，1-审核通过，2-审核不通过
 * @param {String} sourceTitle 资源标题
 * @param {String} isSearchCount 是否计算总页数，默认1计算
 * @param {String} pageNum 当前页码(默认1)
 * @param {String} pageSize 每页记录数(默认10)
 * @param {String} sourceName 资源名称
 */
export function getShortVideoManagementList(data, target) {
    return request({
        url: '/video/video-short-review/list',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}
// 短视频审核-------------------------------------------------------------
// GIF动图管理-------------------------------------------------------------
// GIF动图审核-------------------------------------------------------------