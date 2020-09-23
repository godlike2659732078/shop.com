import {
    request
} from "./request"
import store from "../store"
export function getSign(obj) {
    return request({
        method: "get",
        url: '/ucenter/permission',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
