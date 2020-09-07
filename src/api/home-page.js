import request from '@/util/request'

// 导航栏----------------------------------------------------------------------------------------
/**
 * 首页-导航栏-分页列表
 * @param {*} data 
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {String} navbarCode 导航栏编码
 * @param {String} navbarName 导航栏名称
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 * @param {String} styleId 导航栏样式ID
 */
export function getNavbarList(data) {
    return request({
        url: '/system/system-navbar/list',
        method: 'post',
        data,
        loading: 'tbody',
    })
}

/**
 * 首页-导航栏-获取所有导航栏
 */
export function getNavbarAll(target) {
    return request({
        url: '/system/system-navbar/getAllNavbar',
        method: 'post',
        loading: target ? target : '.class-container',
    })
}

/**
 * 首页-导航栏-新增
 * @param {*} data
 * @param {String} isShow 是否显示导航栏
 * @param {String} navbarCode 导航栏编码
 * @param {String} navbarName 导航栏名称
 * @param {String} orderNum 排序
 * @param {String} styleId 导航栏样式ID
 */
export function addNavbar(data, target) {
    return request({
        url: '/system/system-navbar/add',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 首页-导航栏-物理删除
 * @param {String} id //主键ID(如果多个逗号分割) require
 */
export function removeNavbar(data, target) {
    return request({
        url: '/system/system-navbar/remove',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 首页-导航栏-修改
 * @param {*} data
 * @param {String} id //主键ID require
 * @param {String} navbarCode //导航栏编码 require
 * @param {String} navbarName //导航栏名称 require
 * @param {String} orderNum //排序 require
 * @param {String} styleId //导航栏样式ID require
 */
export function updateNavbar(data) {
    return request({
        url: '/system/system-navbar/update',
        method: 'post',
        data
    })
}

/**
 * 首页-导航栏-根据ID获取对象
 * @param {String} id //主键ID require 
 */
export function getOneNavbar(id, target) {
    return request({
        url: '/system/system-navbar/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null
    })
}

/**
 * 首页-导航栏-获取导航下的所有条目
 * @param {*} data
 * @param {String} id //导航栏id require
 */
export function getNavbarItems(id, target) {
    return request({
        url: '/system/system-navbar/getNavbarItems',
        method: 'post',
        data: { id },
        loading: target ? target : null
    })
}

/**
 * 首页-导航栏-导航条目排序
 * @param {*} data
 * @param {String} id //导航栏id require
 */
export function setNavbarItemNum(data, target) {
    return request({
        url: '/system/system-navbar/setItemOrderNum',
        method: 'post',
        data,
        loading: target ? target : null,
        dataType: 'data/json'
    })
}

/**
 * 首页-导航栏-设置导航是否可用
 * @param {*} data
 * @param {String} id //主键ID(如果多个逗号分割) require
 * @param {String} isShow //是否可用:1-可用，0-不可用 require
 */
export function setNavbarShow(data, target) {
    return request({
        url: '/system/system-navbar/setUse',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

// 导航条目----------------------------------------------------------------------------------------
/**
 * 首页-导航条目-分页列表
 * @param {*} data 
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {String} itemCode 导航条目编码
 * @param {String} itemName 导航条目名称
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 */
export function getNaventryList(data) {
    return request({
        url: '/system/system-navbar-item/list',
        method: 'post',
        data,
        loading: 'tbody',
    })
}

/**
 * 首页-导航条目-新增
 * @param {*} data 
 * @param {String} interfaceId 条目对应的界面id require
 * @param {String} isShow 是否显示导航条目 require
 * @param {String} itemCode 导航条目编码 require
 * @param {String} itemName 导航条目名称 require
 * @param {String} navbarId 所属导航栏ID require
 * @param {String} orderNum 排序 require
 * @param {String} isDefault 是否默认
 */
export function addNaventry(data) {
    return request({
        url: '/system/system-navbar-item/add',
        method: 'post',
        data,
    })
}

/**
 * 首页-导航条目-根据ID获取对象
 * @param {String} id //主键ID require 
 */
export function getOneNaventry(id, target) {
    return request({
        url: '/system/system-navbar-item/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null
    })
}

/**
 * 首页-导航条目-修改
 * @param {*} data
 * @param {String} id //主键ID require
 * @param {String} interfaceId //条目对应的界面id require
 * @param {Number} isShow //是否显示导航条目 require
 * @param {String} itemCode //导航条目编码 require
 * @param {String} itemName //导航条目名称 require
 * @param {String} navbarId //所属导航栏ID require
 * @param {String} orderNum //排序 require
 * @param {String} isDefault //是否默认
 */
export function updateNaventry(data) {
    return request({
        url: '/system/system-navbar-item/update',
        method: 'post',
        data
    })
}

/**
 * 首页-导航条目-物理删除
 * @param {String} id //主键ID(如果多个逗号分割) require
 */
export function removeNaventry(data, target) {
    return request({
        url: '/system/system-navbar-item/remove',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 首页-导航条目-获取导航条目下的内容板块
 * @param {String} itemId //导航条目id require
 */
export function getSectionByNaventry(itemId, target) {
    return request({
        url: '/system/system-navbar-item/getSectionList',
        method: 'post',
        data: { itemId },
        loading: target ? target : null
    })
}

/**
 * 首页-导航条目-内容板块排序(独立任务栏--内容板块排序-复用)
 * @param {Object} fo 导航条目集合 fo:[{id,orderNum},...] require
 * @param {Number} id 导航条目id require
 * @param {Number} orderNum 排序号 require
 */
export function setSectionNum(data, target) {
    return request({
        url: '/system/system-navbar-item/orderSection',
        method: 'post',
        data,
        loading: target ? target : null,
        dataType: 'data/json'
    })
}


// 内容板块------------------------------------------------------------------------------------
/**
 * 内容版块-分页列表
 * @param {*} data
 * @param {String} isActive 是否有效
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {String} isStatic 是否静态
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 * @param {String} sectionName 板块名称
 * @param {String} sectionTitle 板块标题
 */
export function getSectionList(data, target) {
    return request({
        url: '/system/system-content-section/list',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 内容版块-根据ID获取对象
 * @param {String} id require 
 */
export function getOneSection(id) {
    return request({
        url: '/system/system-content-section/getOne',
        method: 'post',
        data: { id },
        loading: '.tab-container'
    })
}

/**
 * 内容版块-新增
 * @param {*} data 
 * @param {String} isActive 是否有效(可见) require
 * @param {String} isCollectionTitle 是否显示合辑标题 require
 * @param {String} isSectionTitle 是否显示板块标题 require
 * @param {String} isStatic 是否静态 require
 * @param {String} itemId 所属导航条目ID require
 * @param {String} navbarId 所属导航栏ID require
 * @param {String} orderNum 排序 require
 * @param {String} sectionName 板块名称 require
 * @param {String} sectionTitle 板块标题 require
 * @param {String} advertPosition 广告位置：1-居中插播，2-头部插播，3-尾部插播（动态情况使用） 
 * @param {String} loadCount 加载数量（动态情况使用） 
 * @param {String} loadUrl 加载地址（动态情况使用） 
 * 
 */
export function addSection(data, target) {
    return request({
        url: '/system/system-content-section/add',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 内容版块-修改
 * @param {*} data
 * @param {String} id 主键ID require
 * @param {String} isActive 是否有效(可见) 
 * @param {String} isCollectionTitle 是否显示合辑标题 
 * @param {String} isSectionTitle 是否显示板块标题 
 * @param {String} isStatic 是否静态 
 * @param {String} itemId 所属导航条目ID 
 * @param {String} navbarId 所属导航栏ID 
 * @param {String} orderNum 排序 
 * @param {String} sectionName 板块名称 
 * @param {String} sectionTitle 板块标题 
 * @param {String} advertPosition 广告位置：1-居中插播，2-头部插播，3-尾部插播（动态情况使用） 
 * @param {String} loadCount 加载数量（动态情况使用） 
 * @param {String} loadUrl 加载地址（动态情况使用） 
 */
export function updateSection(data) {
    return request({
        url: '/system/system-content-section/update',
        method: 'post',
        data,
        loading: 'body'
    })
}

/**
 *内容版块-逻辑删除
 * @param {*} data
 * @param {String} id 主键ID(如果多个逗号分割)
 */
export function removeSection(data, target) {
    return request({
        url: '/system/system-content-section/delete',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 *内容版块-查询所属版块的合辑列表
 * @param {*} data
 * @param {String} sectionId 内容板块id require
 */
export function getCollectionListOfSection(sectionId, target) {
    return request({
        url: '/system/system-content-section/getCollectionList',
        method: 'post',
        data: { sectionId },
        loading: target ? target : null,
    })
}

/**
 *内容版块-合辑排序
 * @param {*} data
 * @param {Object} fo fo:[{id,orderNum},...] require
 * @param {String} id 内容板块id require
 * @param {String} orderNum 排序号 require
 */
export function setCollectionNum(data, target) {
    return request({
        url: '/system/system-content-section/orderSection',
        method: 'post',
        data,
        loading: target ? target : null,
        dataType: 'data/json'
    })
}

/**
 *内容版块广告-获取广告列表
 * @param {*} data
 * @param {String} sectionId 内容板块id require
 */
export function getSectionAdvertList(sectionId, target) {
    return request({
        url: '/system/system-section-advert/getSectionAdvert',
        method: 'post',
        data: { sectionId },
        loading: target ? target : null,
    })
}

/**
 *内容版块广告-编辑
 * @param {*} data
 * @param {String} sectionId 内容板块id require
 * @param {String} advertId 广告id(如果多个逗号分割)
 */
export function addAdvertisementToSection(data, target) {
    return request({
        url: '/system/system-section-advert/edit',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 *内容版块广告-排序
 * @param {*} data
 * @param {Object} fo fo:[{id,orderNum},...] require
 * @param {String} id 内容板块id require
 * @param {String} orderNum 排序号 require
 */
export function setSectionAdvertisementNum(data, target) {
    return request({
        url: '/system/system-section-advert/updateToOrder',
        method: 'post',
        data,
        loading: target ? target : null,
        dataType: 'data/json'
    })
}

// 合辑----------------------------------------------------------------------------------------
/**
 * 合辑-分页列表
 * @param {*} data 
 * @param {String} collectionCode 合辑编码
 * @param {String} collectionName 合辑名称
 * @param {String} collectionTitle 合辑标题
 * @param {Number} isSearchCount 是否计算总页数，默认1计算
 * @param {Number} pageNum 当前页码(默认1)
 * @param {Number} pageSize 每页记录数(默认10)
 */
export function getCollectionList(data) {
    return request({
        url: '/system/system-collection/list',
        method: 'post',
        data,
        loading: 'tbody',
    })
}

/**
 * 合辑-新增
 * @param {*} data 
 * @param {String} collectionCode 合辑编码 require
 * @param {String} collectionDesc 合辑简介 require
 * @param {String} collectionName 合辑名称 require
 * @param {String} collectionTitle 合辑标题 require
 * @param {String} interfaceId 界面id(合辑外层) require
 * @param {String} isShowNum 预览数量(合辑外层预览界面是否显示排序) require
 * @param {String} itemId 所属导航条目ID require
 * @param {String} loadCount 加载数量（进入详情页的每页获取的记录数）require
 * @param {String} navbarId 所属导航栏ID require
 * @param {String} previewCount 预览数量(合辑外层显示的记录数，换一换重新从加载数量获取n条数据) require
 * @param {String} sectionId 所属静态版块ID require
 * @param {String} sortId 界面分类id(合辑外层) require
 * @param {String} iconFile iconFile
 * @param {String} iconName 金刚区名称
 * @param {String} image image
 */
export function addCollection(data) {
    return request({
        url: '/system/system-collection/add',
        method: 'post',
        data,
        dataType: 'data/formdata',
        loading: 'body'
    })
}

/**
 * 合辑-根据ID获取对象
 * @param {String} id //主键ID require 
 */
export function getOneCollection(id, target) {
    return request({
        url: '/system/system-collection/getOne',
        method: 'post',
        data: { id },
        loading: target ? target : null
    })
}

/**
 * 合辑-修改
 * @param {*} data
 * @param {String} id //主键ID require
 * @param {String} collectionCode 合辑编码 
 * @param {String} collectionDesc 合辑简介 
 * @param {String} collectionName 合辑名称 
 * @param {String} collectionTitle 合辑标题 
 * @param {String} interfaceId 界面id(合辑外层) 
 * @param {String} isShowNum 预览数量(合辑外层预览界面是否显示排序) 
 * @param {String} itemId 所属导航条目ID 
 * @param {String} loadCount 加载数量（进入详情页的每页获取的记录数）
 * @param {String} navbarId 所属导航栏ID 
 * @param {String} previewCount 预览数量(合辑外层显示的记录数，换一换重新从加载数量获取n条数据) 
 * @param {String} sectionId 所属静态版块ID 
 * @param {String} sortId 界面分类id(合辑外层) 
 * @param {String} iconFile iconFile
 * @param {String} iconName 金刚区名称
 * @param {String} image image
 */
export function updateCollection(data) {
    return request({
        url: '/system/system-collection/update',
        method: 'post',
        data,
        dataType: 'data/formdata',
        loading: 'body'
    })
}

/**
 * 合辑-物理删除
 * @param {String} id //主键ID(如果多个逗号分割) require
 */
export function removeCollection(data, target) {
    return request({
        url: '/system/system-collection/remove',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 合辑详情-列表查询(跳转至表示查看更多的跳转)
 * @param {*} data
 * @param {String} collectionId //合辑ID require
 */
export function getCollectionDetailList(collectionId, target) {
    return request({
        url: '/system/system-collection-detail/detailList',
        method: 'post',
        data: { collectionId },
        loading: target ? target : null
    })
}

/**
 * 合辑详情-新增
 * @param {*} data
 * @param {String} collectionId //合辑ID require
 * @param {String} linkType //跳转方式：1-导航条目，2-界面 require
 * @param {String} interfaceId //界面ID
 * @param {String} itemId //导航条目ID
 * @param {String} navbarId //导航栏ID
 * @param {String} sortId //界面分类ID
 * @param {String} taskBarId //任务栏ID
 */
export function addCollectionDetail(data, target) {
    return request({
        url: '/system/system-collection-detail/add',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 合辑详情-修改
 * @param {*} data
 * @param {String} collectionId //合辑ID require
 * @param {String} id //主键ID require
 * @param {String} linkType //跳转方式：1-导航条目，2-界面 require
 * @param {String} interfaceId //界面ID
 * @param {String} itemId //导航条目ID
 * @param {String} navbarId //导航栏ID
 * @param {String} sortId //界面分类ID
 * @param {String} taskBarId //任务栏ID
 */
export function updateCollectionDetail(data, target) {
    return request({
        url: '/system/system-collection-detail/update',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 合辑banner-列表
 * @param {String} collectionId //合辑ID require
 */
export function getBannerList(collectionId, target) {
    return request({
        url: '/system/system-collection-banner/bannerlist',
        method: 'post',
        data: { collectionId },
        loading: target ? target : null
    })
}

/**
 * 合辑banner-批量新增/修改
 * @param {String} data
 * @param {String} collectionId 合辑ID
 * @param {String} targetIds 目标ID的集合(逗号隔开)
 * @param {String} targetType 目标连接类型：1-广告，2-视频，3....
 */
export function addBannerToCollection(data, target) {
    return request({
        url: '/system/system-collection-banner/addBatch',
        method: 'post',
        data,
        loading: target ? target : null
    })
}

/**
 * 合辑播放器广告-列表
 * @param {String} collectionId //合辑ID require
 * @return {integer(int64)} advertId 广告ID 
 * @return {integer(int64)} collectionId 合辑ID 
 * @return {string(date-time)} createTime 创建时间 
 * @return {integer(int64)} id 主键ID 
 * @return {integer(int32)} orderNum 排序 
 * @return {string} other 其他 
 * @return {integer(int32)} playLength 播放长度（秒）
 * @return {integer(int32)} playType 广告播放类型：1-播放头广告，2-插播广告，3.悬浮广告 
 */
export function getPlayerAdvertisementList(collectionId, target) {
    return request({
        url: '/system/system-collection-advert/advertList',
        method: 'post',
        data: { collectionId },
        loading: target ? target : null
    })
}

/**
 * 合辑播放器广告-新增/修改
 * @param {String} data fo: [{},...]
 * @param {String} collectionId 合辑ID
 * @param {String} orderNum 排序
 * @param {String} advertId 广告ID
 * @param {String} playLength 播放长度（秒)
 * @param {String} playType 广告播放类型：1-播放头广告，2-插播广告，3.悬浮广告
 */
export function addPlayerAdvertisementToCollection(data, target) {
    return request({
        url: '/system/system-collection-advert/addBatch',
        method: 'post',
        data,
        loading: target ? target : null,
        dataType: 'data/json'
    })
}

/**
 * 合辑(文件)视频-列表
 * @param {String} collectionId //合辑ID require
 */
export function getVideoListCollection(collectionId, target) {
    return request({
        url: '/system/system-collection-source/sourceFoList',
        method: 'post',
        data: { collectionId },
        loading: target ? target : null
    })
}

/**
 * 合辑(文件)视频-编辑视频列表
 * @param {String} data 
 * @param {String} collectionId 合辑ID require
 * @param {String} sourceId 视频ID(多个用逗号隔开)
 */
export function addVideoToCollection(data, target) {
    return request({
        url: '/system/system-collection-source/edit',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

/**
 * 合辑播放界面-根据合辑id获取信息
 * @param {String} collectionId //合辑ID require
 */
export function getPlayfaceCollection(collectionId, target) {
    return request({
        url: '/system/system-collection-playface/getOne',
        method: 'post',
        data: { collectionId },
        loading: target ? target : null
    })
}

/**
 * 合辑播放界面-编辑
 * @param {String} data 
 * @param {String} collectionId 合辑ID require
 * @param {String} interfaceId 界面id
 * @param {String} sortId 界面分类id
 * @param {String} advertId 广告id(多个广告用逗号隔开)
 */
export function addPlayfaceToCollection(data, target) {
    return request({
        url: '/system/system-collection-playface/edit',
        method: 'post',
        data,
        loading: target ? target : null,
    })
}

