// 业务相关

// 列表property属性选项,isShow字段value值修改
function myDefineProperty(data) {
    if (!data && typeof data !== 'object') {
        throw new Error('error arguments', 'myDefineProperty')
    }
    const targetObj = data.constructor === Array ? [] : {}
    Object.keys(data).forEach(key => {
        if (data[key] && typeof data[key] === 'object') {
            targetObj[key] = myDefineProperty(data[key])
        } else {
            if (key === 'isShow') {
                targetObj[key] = data[key] ? '是' : '否'
            } else {
                targetObj[key] = data[key]
            }
        }
    })
    return targetObj
}

/**
 * 非零开头的正整数
 * @param {*} arg
 * @returns {Boolean} 
 */
function validOrderNum(arg) {
    const reg = new RegExp('^[1-9][0-9]*$')
    return reg.test(arg)
}

export { myDefineProperty, validOrderNum }