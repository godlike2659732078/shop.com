import {
    request
} from "./request"
export function getLeave(obj, sj) {
    return request({
        method: "get",
        url: '/api/qj/qj',
        params: {
            uid: obj,
            sj: sj
        }
    })
}
export function subLeave(obj) {
    return request({
        method: "post",
        url: '/api/qj/add',
        data: obj
    })
}
export function editLeave(id) {
    return request({
        method: "get",
        url: '/api/qj/add',
        params: {
            id: id
        }
    })
}
export function changeLeave(q) {
    return request({
        method: "post",
        url: '/api/qj/add',
        data: q
    })
}