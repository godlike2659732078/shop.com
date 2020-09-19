import {
    request
} from "./request"
export function getLogin(obj) {
    return request({
        method: "post",
        url: '/user/login',
        data: obj
    })
}