import {
    request
} from "./request"
import store from "../store"
// 获取轮播列表
export function allBanners(obj) {
    return request({
        method: "get",
        url: '/banner/allBanners',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}

// 添加轮播图
export function addBanner(obj) {
    return request({
        method: "post",
        url: '/banner/addBanner',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取轮播信息
export function findBannerById(obj) {
    return request({
        method: "get",
        url: '/banner/findBannerById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 提交编辑轮播图
export function editBannerById(obj) {
    return request({
        method: "post",
        url: '/banner/editBannerById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除轮播图
export function delBannerById(obj) {
    return request({
        method: "post",
        url: '/banner/delBannerById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量删除轮播图
export function delBannerByIds(obj) {
    return request({
        method: "post",
        url: '/banner/delBannerByIds',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取银行列表
export function findAllBanks(obj) {
    return request({
        method: "get",
        url: '/Bank/findAllBanks',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加银行
export function addBank(obj) {
    return request({
        method: "post",
        url: '/Bank/addBank',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取银行详情
export function findBankById(obj) {
    return request({
        method: "get",
        url: '/Bank/findBankById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 提交银行编辑
export function editBankById(obj) {
    return request({
        method: "post",
        url: '/Bank/editBankById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量删除银行
export function delBankByIds(obj) {
    return request({
        method: "post",
        url: '/Bank/delBankByIds',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除银行
export function delBankById(obj) {
    return request({
        method: "post",
        url: '/Bank/delBankById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取友情链接列表
export function findallFriendLinks(obj) {
    return request({
        method: "get",
        url: '/friendLink/findallFriendLinks',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}