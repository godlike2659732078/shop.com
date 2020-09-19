import { get, post } from "../service/ajax";


// 查找货物已占用位置
export function getHome_user(params) {
    return get("/indexPanel/findCustomerStatisticsInfo", params);
}

// 更换货物已占用位置
// export function switchLabel(params) {
//     return post("/goods/switchLabel", params);
// }

