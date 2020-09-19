import {
    request
} from "./request"
import store from "../store"
// 获取用户列表
export function getUserList(obj) {
    return request({
        method: "get",
        url: '/cus/findAllCus',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取单条信息
export function getOneUser(obj) {
    return request({
        method: "get",
        url: '/cus/findCustomer',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 编辑用户信息
export function editOneUser(obj) {
    return request({
        method: "post",
        url: '/cus/editChainCus',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量冻结
export function frozenAll(obj) {
    return request({
        method: "post",
        url: '/cus/updateCusFroze',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 批量解冻
export function unfrozenAll(obj) {
    return request({
        method: "post",
        url: '/cus/updateCusFroze',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 单点冻结
export function frozenOne(obj) {
    return request({
        method: "post",
        url: '/cus/updateCusFroze',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 单点解冻
export function unfrozenOne(obj) {
    return request({
        method: "post",
        url: '/cus/updateCusFroze',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 积分列表数据
export function getInt(obj) {
    return request({
        method: "get",
        url: '/cus/allIntegral',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 编辑积分列表数据
export function editInt(obj) {
    return request({
        method: "post",
        url: '/cus/updateCusIntegralById',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取积分记录列表
export function getRecord(obj) {
    return request({
        method: "get",
        url: '/cus/findIntegralTurnover',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取用户资金列表
export function getCapital(obj) {
    return request({
        method: "get",
        url: '/cus/allAccount',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 编辑用户资金
export function editUsercap(obj) {
    return request({
        method: "post",
        url: '/cus/editAccount',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取用户资金记录列表
export function getCapitalRecord(obj) {
    return request({
        method: "get",
        url: '/cus/findAccountTurnover',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 冻结用户资金
export function froAccount(obj) {
    return request({
        method: "post",
        url: '/cus/updateCusAccountFroze',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 解冻用户资金
export function unfroAccount(obj) {
    return request({
        method: "post",
        url: '/cus/updateCusAccountFroze',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取分销返佣列表
export function findBackRMB(obj) {
    return request({
        method: "get",
        url: '/cus/findBackRMB',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取返佣明细列表
export function findBackDetail(obj) {
    return request({
        method: "get",
        url: '/cus/findAccountTurnover',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取实名认证列表
export function getCheck(obj) {
    return request({
        method: "get",
        url: '/cus/findAllCus',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 实名认证通过
export function passReal(obj) {
    return request({
        method: "post",
        url: '/cus/realNameAuthentication',
        headers: {
            Authorization: store.state.accessToken
        },
        data: obj
    })
}
// 获取vip订单
export function getvipOrder(obj) {
    return request({
        method: "get",
        url: '/cus/vipOrder',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取分享返佣列表
export function getInviteDetail(obj) {
    return request({
        method: "get",
        url: '/cus/findUserInvite',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}
// 获取红包记录列表
export function getRedpacket(obj) {
    return request({
        method: "get",
        url: '/redPacket/findRedPacketSend',
        headers: {
            Authorization: store.state.accessToken
        },
        params: obj
    })
}

