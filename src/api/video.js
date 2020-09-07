import request from '@/util/request'

// 地区----------------------------------------------------------------------------------------
/**
 * 视频管理-地区-分页列表
 * @param {*} data 
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 * @param {String} regionCode 地区编码
 * @param {String} regionName 地区名称
 */
export function getGegionList(data, target) {
    return request({
        url: '/video/video-region/list',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-地区-根据ID获取对象
 * @param {*} data 
 * @param {Number} id 主键ID require
 */
export function getOneGegion(id, target) {
    return request({
        url: '/video/video-region/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null,
    })
}

/**
 * 视频管理-地区-新增
 * @param {*} data 
 * @param {String} orderNum 地区排序
 * @param {String} regionCode 地区编码
 * @param {String} regionName 地区名称
 */
export function addGegion(data, target) {
    return request({
        url: '/video/video-region/add',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-地区-修改
 * @param {*} data 
 * @param {String} id 主键ID require
 * @param {String} orderNum 地区排序
 * @param {String} regionCode 地区编码
 * @param {String} regionName 地区名称
 */
export function updateGegion(data, target) {
    return request({
        url: '/video/video-region/update',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-地区-逻辑删除
 * @param {*} data 
 * @param {String} id 主键ID(如果多个逗号分割) require
 */
export function removeGegion(data, target) {
    return request({
        url: '/video/video-region/delete',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

// 视频分类----------------------------------------------------------------------------------------
/**
 * 视频管理-视频分类-一级分页列表
 * @param {*} data 
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 * @param {String} regionCode 分类编码
 * @param {String} regionName 分类名称
 */
export function getCategoryList1(data, target) {
    return request({
        url: '/video/video-type/list/firstClass',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-视频分类-二级分页列表
 * @param {*} data 
 * @param {Number} parentId 父级分类id require
 * @param {String} regionCode 分类编码
 * @param {String} regionName 分类名称
 */
export function getCategoryList2(data, target) {
    return request({
        url: '/video/video-type/list/twoClass',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-视频分类-根据ID获取对象
 * @param {*} data 
 * @param {Number} id 主键ID require
 */
export function getOneCategory(id, target) {
    return request({
        url: '/video/video-type/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null,
    })
}

/**
 * 视频管理-视频分类-新增分类
 * @param {*} data 
 * @param {Number} orderNum 分类排序 require
 * @param {String} regionCode 分类编码 require
 * @param {String} regionName 分类名称 require
 * @param {String} parentId 父级分类id
 */
export function addCategory(data, target) {
    return request({
        url: '/video/video-type/add',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-视频分类-修改
 * @param {*} data 
 * @param {Number} id 分类排序 require
 * @param {Number} orderNum 分类排序 
 * @param {String} regionCode 分类编码 
 * @param {String} regionName 分类名称 
 * @param {String} parentId 父级分类id
 */
export function updateCategory(data, target) {
    return request({
        url: '/video/video-type/update',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-视频分类-逻辑删除
 * @param {*} data 
 * @param {Number} id 主键ID(如果多个逗号分割) require
 */
export function removeCategory(data, target) {
    return request({
        url: '/video/video-type/delete',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-视频分类-编辑子分类
 * @param {*} data [{},...]
 * @param {Number} id 主键ID(如果多个逗号分割) require
 * @param {Number} parentId require
 * @param {String} regionName require
 */
export function editSubCategory(data, target) {
    return request({
        url: '/video/video-type/editClass',
        method: 'post',
        data,
        loading: target ? target : null,
        dataType: 'data/json'
    })
}

// 上传视频----------------------------------------------------------------------------------------
/**
 * 视频管理-视频上传-分页列表(当前用户上传的视频)
 * @param {*} data 
 * @param {String} createBegTime 上传开始时间（yyyy-MM-dd）
 * @param {String} createEndTime 上传结束时间（yyyy-MM-dd）
 * @param {String} isRelease 是否已经发布
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 * @param {String} reviewStatus 审核状态：0-未审核，1-审核通过，2-审核不通过
 * @param {String} sourceName 资源名称
 */
export function getUploadVideoList(data, target) {
    return request({
        url: '/video/video-source/list1',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-长视频-根据ID获取对象
 * @param {*} data 
 * @param {String} id 主键ID
 */
export function getOneUploadVideo(id, target) {
    return request({
        url: '/video/video-source/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null,
    })
}

/**
 * 视频管理-长视频-物理删除
 * @param {*} data 
 * @param {String} id 主键ID
 */
export function removeUploadVideo(data, target) {
    return request({
        url: '/video/video-source/remove',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-获取区域
 * @param {*} data 
 */
export function getUploadVideoRegion(target) {
    return request({
        url: '/video/video-source/getRegion',
        method: 'post',
        loading: target ? target : null,
    })
}

/**
 * 视频管理-长视频-新增
 * @param {formData} data
 * @param {String} playTime 播放时长(秒) require
 * @param {String} region 上传区域 require
 * @param {String} sourceFormat 资源格式：mp4,avi require
 * @param {String} sourceMd5 视频md5 require
 * @param {String} sourceSize 资源大小(KB) require
 * @param {File} videoFile videoFile
 */
export function addUploadVideo(data, cb, target) {
    return request({
        url: '/video/video-source/add',
        method: 'post',
        data,
        loading: target ? target : null,
        dataType: 'data/formdata',
        timeout: 'infinite',
        header: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: cb || function (progressEvent) { } //处理上载的进度事件
    })
}

// 发布视频----------------------------------------------------------------------------------------
/**
 * 视频管理-发布视频-分页列表(显示所有审核通过的长视频)
 * @param {*} data 
 * @param {String} createBegTime 上传开始时间（yyyy-MM-dd）
 * @param {String} createEndTime 上传结束时间（yyyy-MM-dd）
 * @param {String} isRelease 是否已经发布
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 * @param {String} sourceName 资源名称
 */
export function getReleaseVideoList(data, target) {
    return request({
        url: '/video/video-long-release/list',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 视频管理-长视频发布-根据ID获取对象
 * @param {*} data 
 * @param {String} id 主键ID
 */
export function getOneReleaseVideo(id, target) {
    return request({
        url: '/video/video-long-release/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null,
    })
}

/**
 * 视频管理-长视频发布-新增（发布or重新发布）
 * @param {formData} data 
 * @param {String} author 作者（主演）require
 * @param {String} parentId 父级分类id require
 * @param {String} regionId 地区ID require
 * @param {String} searchKey 关键字 require
 * @param {String} sourceCode 资源编号 require
 * @param {String} sourceDesc 资源简介 require
 * @param {String} sourceId 资源id require
 * @param {String} sourceName 资源名称 require
 * @param {String} sourceTitle 资源标题 require
 * @param {String} typeId 分类id require
 * @param {String} file file
 */
export function addReleaseVideo(data, target) {
    return request({
        url: '/video/video-long-release/release',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}
