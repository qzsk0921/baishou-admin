import { getGlobalAuth } from '@/api/role'

const state = {
    globalAuth: null //全局权限表 {Array}
}

const mutations = {
    SET_GLOBAL_AUTH(state, globalAuth) {
        state.globalAuth = globalAuth
    }
}

const actions = {
    getGlobalAuth({ commit }) {
        return new Promise((resolve, reject) => {
            getGlobalAuth().then(res => {
                const globalAuth = res.object
                commit('SET_GLOBAL_AUTH', globalAuth)
                resolve(globalAuth)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}