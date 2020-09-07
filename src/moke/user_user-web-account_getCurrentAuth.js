function getCurrentAuth(role) {
    let currentAuth = null
    switch (role) {
        case 'guest':
            currentAuth = "1,2,3,4,10,11,12,13,14,15,16,17,18"
            break;
        default:
            currentAuth = "5,6,7,8,9,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39"
    }
    return {
        code: 200,
        message: "操作成功",
        object: currentAuth
    }
}

module.exports = getCurrentAuth