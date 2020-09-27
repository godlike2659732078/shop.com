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
// 添加友情链接
export function addFriendLink(obj) {
    return request({
        method: "post",
        url: '/friendLink/addFriendLink',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取友情链接详情
export function findFriendLinkById(obj) {
    return request({
        method: "get",
        url: '/friendLink/findFriendLinkById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 提交友情链接修改
export function editFriendLinkById(obj) {
    return request({
        method: "post",
        url: '/friendLink/editFriendLinkById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除友情链接
export function delFriendLinkById(obj) {
    return request({
        method: "post",
        url: '/friendLink/delFriendLinkById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量删除友情链接
export function delfriendLinkByIds(obj) {
    return request({
        method: "post",
        url: '/friendLink/delFriendLinkByIds',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取公告通知列表
export function findAllArticles(obj) {
    return request({
        method: "get",
        url: '/Article/findAllArticles',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加通知公告
export function addArticles(obj) {
    return request({
        method: "post",
        url: '/Article/addArticles',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 拉去通知公告信息
export function findArticlesById(obj) {
    return request({
        method: "get",
        url: '/Article/findArticlesById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 提交编辑通知公告
export function editArticlesById(obj) {
    return request({
        method: "post",
        url: '/Article/editArticlesById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除公告通知
export function delArticlesById(obj) {
    return request({
        method: "post",
        url: '/Article/delArticlesById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量删除公告通知
export function delArticlesByIds(obj) {
    return request({
        method: "post",
        url: '/Article/delArticlesByIds',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 拉去广告列表
export function findallAds(obj) {
    return request({
        method: "get",
        url: '/Ad/findallAds',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 批量删除广告
export function delAdByIds(obj) {
    return request({
        method: "post",
        url: '/Ad/delAdByIds',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除广告
export function delAdById(obj) {
    return request({
        method: "post",
        url: '/Ad/delAdById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 添加广告
export function addAd(obj) {
    return request({
        method: "post",
        url: '/Ad/addAd',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 提交编辑广告
export function editAdById(obj) {
    return request({
        method: "post",
        url: '/Ad/editAdById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 拉取广告信息
export function findAdById(obj) {
    return request({
        method: "get",
        url: '/Ad/findAdById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 平台规则列表
export function allRule(obj) {
    return request({
        method: "get",
        url: '/rule/allRule',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取规则信息
export function ruleOne(obj) {
    return request({
        method: "get",
        url: '/rule/ruleOne',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 提交编辑规则
export function updateRule(obj) {
    return request({
        method: "post",
        url: '/rule/updateRule',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 拉取链商学院列表
export function findAllCollegeActicles(obj) {
    return request({
        method: "get",
        url: '/college/findAllCollegeActicles',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 拉取链商学院分类
export function getCollegeClass(obj) {
    return request({
        method: "get",
        url: '/college/findAllCollegeActicleClass',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 链商学院添加
export function addCollegeActicle(obj) {
    return request({
        method: "post",
        url: '/college/addCollegeActicle',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 拉取链商学院信息
export function findCollegeActicleById(obj_byId) {
    return request({
        method: "get",
        url: '/college/findCollegeActicleById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj_byId
    })
}
// 提交链商学院编辑
export function updateCollegeActicle(obj) {
    return request({
        method: "post",
        url: '/college/updateCollegeActicle',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}