import {
    request
} from "./request"
import store from "../store"
export function getHome_user() {
    return request({
        method: "get",
        url: '/indexPanel/findCustomerStatisticsInfo',
    })
}
export function getHome_order() {
    return request({
        method: "get",
        url: '/indexPanel/findCommonOrderStatisticsInfo',
    })
}
export function getHome_lineOrder() {
    return request({
        method: "get",
        url: '/indexPanel/findIntegralOrderStatisticsInfo',
    })
}
export function getShopEnsureWarn() {
    return request({
        method: "get",
        url: '/indexPanel/findShopEnsureWarn',
        headers:{
            Authorization:store.state.accessToken
        }
    })
}
export function getfeedback() {
    return request({
        method: "get",
        url: '/param/feedback',
        headers:{
            Authorization:store.state.accessToken
        },
        params:{
            pages:1,
            limit:2
        }
    })
}