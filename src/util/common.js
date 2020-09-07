// export const generateId = function () {
//     return Math.floor(Math.random() * 10000);
// };

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


export function stringifyParam(data) {
    try {
        let tempArr = [];
        for (let i in data) {
            tempArr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
        }
        let urlParamsStr = tempArr.join('&')
        return urlParamsStr;
    } catch (err) {
        return ''
    }
}

export function parseParam(url) {
    try {
        let index = url.indexOf('?');
        url = url.match(/\?([^#]+)/)[1]
        let obj = {}, arr = url.split('&')
        for (let i = 0; i < arr.length; i++) {
            let subArr = arr[i].split('=');
            let key = decodeURIComponent(subArr[0]);
            let value = decodeURIComponent(subArr[1]);
            obj[key] = value;
        }
        return obj;

    } catch (err) {
        return null;
    }
}

/**
 * deep copy的简单版本
 * lodash的cloneDeep
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}