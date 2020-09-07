import { getToken, setToken, removeToken } from "@/util/auth"
import { login, logout, getInfo } from '@/api/user'
// import router, { resetRouter } from '@/router'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    // token: null,
    roles: [],
    nickname: '管理员',
    islogin: false
}
const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_NICK_NAME: (state, nickname) => {
        state.nickname = nickname
    },
}
const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            // -------------------------------------------(6)去api line 28 <=> 29---------------------------------------------------
            login({ loginId: username.trim(), loginPwd: password, agentCode: '00' }).then(res => {
                // login({ username: username.trim(), password: password, agentCode: '00' }).then(res => {
                // -------------------------------------------(7)去api line 31-33 <=> 35-37---------------------------------------------------
                const { object } = res
                commit('SET_TOKEN', object.token)
                setToken(object.token)

                // const { data } = res
                // commit('SET_TOKEN', data.token)
                // setToken(data.token)

                // commit('SET_NICK_NAME', object.accountName)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                // const { roleCode } = response.user.roleSet[0]
                // commit('SET_ROLES', roleCode)
                // resolve(roleCode)
                const { data } = response
                if (!data) {
                    reject('验证失败，请重新登录')
                }
                const { roles, nickname } = data
                commit('SET_ROLES', roles)
                commit('SET_NICK_NAME', nickname)

                resolve(data)

            }).catch(error => {
                reject(error)
            })
            const data = {
                roles: ['admin']
            }
            const { roles } = data
            commit('SET_ROLES', roles)
            resolve(data)
        })
    },
    resetUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('permission/SET_ROUTES_READY', false, { root: true })
            removeToken()

            resolve()
        })
    },
    logout({ dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('resetUserInfo')
            resetRouter()

            resolve()
            // logout().then(() => {
            //     dispatch('resetUserInfo')
            //     resetRouter()
            //     // reset visited views and cached views
            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}