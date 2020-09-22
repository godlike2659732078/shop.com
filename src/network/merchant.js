import {
    request
} from "./request"
import store from "../store"
// 获取商家列表
export function getmerchantList(obj) {
    return request({
        method: "get",
        url: '/shop/findAllShops',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取商家名状态
export function getmerchantAcount(obj) {
    return request({
        method: "get",
        url: '/shop/findShopByAccount',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加商家
export function addMerchant(obj) {
    return request({
        method: "post",
        url: '/shop/addShop',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取单条商家信息
export function getmerchantOne(obj) {
    return request({
        method: "get",
        url: '/shop/findShopById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 编辑商户信息
export function updateMerchant(obj) {
    return request({
        method: "post",
        url: '/shop/updateShopById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取承销团队列表
export function getteamList(obj) {
    return request({
        method: "get",
        url: '/shop/team',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加分销团队
export function addTeam(obj) {
    return request({
        method: "post",
        url: '/shop/addTeam',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除分销团队
export function delTeam(obj) {
    return request({
        method: "post",
        url: '/shop/delTeam',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量删除分销商
export function delAllTeam(obj) {
    return request({
        method: "post",
        url: '/shop/delBatchTeam',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取团队详情列表
export function getteamDetails(obj) {
    return request({
        method: "get",
        url: '/shop/teamCus',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加团队成员
export function addTeamCus(obj) {
    return request({
        method: "post",
        url: '/shop/addTeamCus',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 设为管理员
export function setUser(obj) {
    return request({
        method: "post",
        url: '/shop/updateManager',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除单个成员
export function delUser(obj) {
    return request({
        method: "post",
        url: '/shop/delTeamCus',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 下架商家
export function noShow(obj) {
    return request({
        method: "post",
        url: '/shop/updateShopFrozenById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除商家
export function delOne(obj) {
    return request({
        method: "post",
        url: '/shop/delShopById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 商家资金列表
export function findShopAccounts(obj) {
    return request({
        method: "get",
        url: '/shop/findShopAccounts',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 更新商家资金
export function updateMoney(obj) {
    return request({
        method: "post",
        url: '/shop/updateShopAccountById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 冻结商家资金
export function updateShopFrozen(obj) {
    return request({
        method: "post",
        url: '/shop/updateShopFrozen',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 商家资金记录列表
export function findAllAccountTurnover(obj) {
    return request({
        method: "get",
        url: '/shop/findAllAccountTurnover',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取商家积分记录表
export function findAllAccountIntegral(obj) {
    return request({
        method: "get",
        url: '/shop/findAllAccountIntegral',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取商家返佣列表
export function getShoprebate(obj) {
    return request({
        method: "get",
        url: '/shop/findShopBackRMB',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取商家返佣明细
export function getShoprebateDetails(obj) {
    return request({
        method: "get",
        url: '/shop/findShopBackById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取商家返佣明细
export function getCheck(obj) {
    return request({
        method: "get",
        url: '/shop/allCheck',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 通过商家审核
export function checkPass(obj) {
    return request({
        method: "post",
        url: '/shop/checkSuccess',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 驳回商家审核
export function checkFail(obj) {
    return request({
        method: "post",
        url: '/shop/checkFail',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 易货列表获取
export function getBarter(obj) {
    return request({
        method: "get",
        url: '/barter/findAllBarter',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 易货列表获取单个详情
export function getOneBarter(obj) {
    return request({
        method: "get",
        url: '/barter/findOneBarter',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 易货列表获取审核通过
export function passOne(obj) {
    return request({
        method: "get",
        url: '/barter/verifyBarter',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取商铺类型列表
export function findAllType(obj) {
    return request({
        method: "get",
        url: '/barter/findAllType',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 删除商铺类型单条数据
export function delType(obj) {
    return request({
        method: "get",
        url: '/barter/deleteType',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加店铺类型
export function addType(obj) {
    return request({
        method: "post",
        url: '/barter/addType',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 修改店铺类型
export function changeType(obj) {
    return request({
        method: "post",
        url: '/barter/updateType',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 易货商品获取
export function findAllGoods(obj) {
    return request({
        method: "get",
        url: '/barter/findAllGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 易货商品获取单个详情
export function findOneGoods(obj) {
    return request({
        method: "get",
        url: '/barter/findOneGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 易货商品获取审核通过
export function passGoods(obj) {
    return request({
        method: "post",
        url: '/barter/verifyGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// CMT商家列表
export function findAllCmtShops(obj) {
    return request({
        method: "get",
        url: '/shop/findAllCmtShops',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 添加CMT商家/shop/updateCmtShop
export function addCmtShop(obj) {
    return request({
        method: "post",
        url: '/shop/addCmtShop',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 拉取cmt单条信息
export function findCmtShopById(obj) {
    return request({
        method: "get",
        url: '/shop/findCmtShopById',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 编辑CMT商家
export function updateCmtShop(obj) {
    return request({
        method: "post",
        url: '/shop/updateCmtShop',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除CMT商家
export function delCMTshop(obj) {
    return request({
        method: "post",
        url: '/shop/delCmtShopById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取直播间列表
export function getLives(obj) {
    return request({
        method: "get",
        url: '/applet/findDirectBroadcastingRoom',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// /获取导入商品列表
export function getLivegoods(obj) {
    return request({
        method: "get",
        url: '/applet/findDirectBroadcastingRoomGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// /导入商品
export function importLivegoods(obj) {
    return request({
        method: "get",
        url: '/applet/directBroadcastingRoomAddGood',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// /获取直播间图片media
export function getMedia(obj) {
    return request({
        method: "get",
        url: '/official/upload',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 创建直播间
export function addLive(obj) {
    return request({
        method: "post",
        url: '/applet/addDirectBroadcastingRoom',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 编辑商品价格
export function changeGoodsPrice(obj) {
    return request({
        method: "post",
        url: '/applet/updateDirectBroadcastingRoomGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 删除已审核直播商品
export function delLiveGoods(obj) {
    return request({
        method: "post",
        url: '/applet/delDirectBroadcastingRoomGoods',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 撤回正在审核商品
export function hoveLiveGoods(obj) {
    return request({
        method: "post",
        url: '/applet/appletAuditIdByGoodsId',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 添加商品并提审
export function addLiveGoods(obj) {
    return request({
        method: "post",
        url: '/applet/appletAddGood',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}