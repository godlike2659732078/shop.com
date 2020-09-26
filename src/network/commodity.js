import {
    request
} from "./request"
import store from "../store"
// 获取商家分类列表
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
// 更新兑换商品信息
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
// 获取商家商品列表
export function findAllShopGoods(obj) {
    return request({
        method: "get",
        url: '/goods/findAllShopGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 上下架兑换商品
export function upGoods(obj) {
    return request({
        method: "post",
        url: '/goods/putaway',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除商家商品
export function delMerchantGoods(obj) {
    return request({
        method: "post",
        url: '/goods/delGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 添加优惠券
export function addop(obj) {
    return request({
        method: "post",
        url: '/shop/addShopCoupon',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取全部商家
export function findAllShops(obj) {
    return request({
        method: "get",
        url: '/shop/findAllShops',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取商品标签
export function taxonomy(obj) {
    return request({
        method: "get",
        url: '/sysGoods/taxonomy',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加商品
export function addShopGoods(obj) {
    return request({
        method: "post",
        url: '/goods/addGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取商家商品信息
export function getOneShopGoods(obj_shopGoods) {
    return request({
        method: "get",
        url: '/goods/oneGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj_shopGoods
    })
}
// 编辑商家商品
export function editShopGoods(obj) {
    return request({
        method: "post",
        url: '/goods/editGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取兑换商品分类列表
// 获取商家列表
export function getexClass(obj) {
    return request({
        method: "get",
        url: '/goodsClass/allSysGoodsClass',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 判断名字重复
export function findName(obj) {
    return request({
        method: "post",
        url: '/goods/findShopGoodsClassByName',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
export function findNames(obj) {
    return request({
        method: "get",
        url: '/goodsClass/exist',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加兑换商品分类
export function addSysGoodsClass(obj) {
    return request({
        method: "post",
        url: '/goodsClass/addSysGoodsClass',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
//获取兑换商品分类详情
export function findSysGoodsClassById(obj) {
    return request({
        method: "get",
        url: '/goodsClass/findSysGoodsClassById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 编辑兑换分类
export function editGoodsClass(obj) {
    return request({
        method: "post",
        url: '/goodsClass/edit',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除兑换分类
export function delSysGoodsClass(obj) {
    return request({
        method: "post",
        url: '/goodsClass/delSysGoodsClass',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取商品标签
export function findAllTaxonomys(obj) {
    return request({
        method: "get",
        url: '/goods/findAllTaxonomys',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 批量删除
export function delAll(obj) {
    return request({
        method: "post",
        url: '/goodsClass/delSysGoodsClass',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 添加商品标签
export function addTaxonomy(obj) {
    return request({
        method: "post",
        url: '/goods/addTaxonomy',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 编辑商品标签
export function updateTaxonomyById(obj) {
    return request({
        method: "post",
        url: '/goods/updateTaxonomyById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取商品标签详情
export function findTaxonomyById(obj) {
    return request({
        method: "get",
        url: '/goods/findTaxonomyById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 删除商品标签
export function delTaxonomyById(obj) {
    return request({
        method: "post",
        url: '/goods/delTaxonomyById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量删除商品标签
export function delTaxonomyByIds(obj) {
    return request({
        method: "post",
        url: '/goods/delTaxonomyByIds',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 审核商品列表
export function findGoodsCheckeds(obj) {
    return request({
        method: "get",
        url: '/goods/findGoodsCheckeds',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 审核商品详情
export function findCheckedById(obj) {
    return request({
        method: "get",
        url: '/goods/findCheckedById',
        params: obj
    })
}
// 商品审核
export function updatePassShopGoodsById(obj) {
    return request({
        method: "post",
        url: '/goods/updatePassShopGoodsById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
export function updateNoPassShopGoodsById(obj) {
    return request({
        method: "post",
        url: '/goods/updateNoPassShopGoodsById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取优惠券列表
export function findAllShopCoupon(obj) {
    return request({
        method: "get",
        url: '/shop/findAllShopCoupon',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 编辑优惠券
export function updateShopCoupon(obj) {
    return request({
        method: "post",
        url: '/shop/updateShopCoupon',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取优惠券详情
export function findShopCouponById(obj_id) {
    return request({
        method: "get",
        url: '/shop/findShopCouponById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj_id
    })
}
// 获取优惠券商家
// 获取商家商品列表
export function getAllShopGoods(obj_shopId) {
    return request({
        method: "get",
        url: '/goods/findAllShopGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj_shopId
    })
}
// 删除优惠券
export function delShopCouponById(obj) {
    return request({
        method: "post",
        url: '/shop/delShopCouponById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}