import {
    request
} from "./request"
export function getHistory(obj) {
    return request({
        method: "post",
        url: '/api/kq/kq',
        data: obj
    })
}
export function getMyhis(obj) {
    return request({
        method: "post",
        url: '/api/kq/gr_kq',
        data: obj
    })
}