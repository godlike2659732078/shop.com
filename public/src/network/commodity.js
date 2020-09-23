import {
    request
} from "./request"
import store from "../store"
// 获取商家列表
export function getmerClass(obj) {
    return request({
        method: "get",
        url: '/goods/findShopClassesByParentId',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取单个商品分类的详情
export function findShopClassById(obj) {
    return request({
        method: "get",
        url: '/goods/findShopClassById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加商品分类
export function addShopClass(obj) {
    return request({
        method: "post",
        url: '/goods/addShopClass',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 添加商品分类
export function editShopClass(obj) {
    return request({
        method: "post",
        url: '/goods/updateShopClassById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除商品分类
export function delShopClass(obj) {
    return request({
        method: "post",
        url: '/goods/delShopClassById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取兑换商品列表
export function allSysGoods(obj) {
    return request({
        method: "get",
        url: '/sysGoods/allSysGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}

// 上下架兑换商品
export function upShopClass(obj) {
    return request({
        method: "post",
        url: '/sysGoods/updateSysGoodsStatusById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除兑换商品
export function delGoods(obj) {
    return request({
        method: "post",
        url: '/sysGoods/delGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取兑换商品分类
export function getGoodsClass(obj) {
    return request({
        method: "get",
        url: '/sysGoods/goodsClass',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取可用积分
export function findAllIntegrals(obj) {
    return request({
        method: "get",
        url: '/integral/findAllIntegrals',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加兑换商品
export function addGoods(obj) {
    return request({
        method: "post",
        url: '/sysGoods/addSysGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取单个商品的详情
export function getOneGoods(obj_id) {
    return request({
        method: "get",
        url: '/sysGoods/oneSysGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj_id
    })
}
export function editGoods(obj) {
    return request({
        method: "post",
        url: '/sysGoods/editSysGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}