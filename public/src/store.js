import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        parm: 0,
        uuid: sessionStorage.getItem('uuid') || [],
        accessToken: sessionStorage.getItem('accessToken') || [],
        nickname: sessionStorage.getItem('nickname') || [],
    },
    mutations: {
        innerUuid(state, uuid) {
            state.uuid = uuid
            sessionStorage.setItem('uuid', uuid)
        },
        innerAccessToken(state, accessToken) {
            state.accessToken = "Bearer "+accessToken
            sessionStorage.setItem('accessToken', "Bearer "+accessToken)
        },
        innerNickname(state, nickname) {
            state.nickname = nickname
            sessionStorage.setItem('nickname', nickname)
        }
    },
    actions: {

    }
})