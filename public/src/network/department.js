import {  request } from "./request"

//部门列表
export function getDepart(uid) {
    return request({
        method: "get",
        url: '/api/bm/index',
        params: {
            uid: uid
        }
    })
}
//添加部门职位
export function addDepart(uid,m_name,m_type,m_fid) {
    return request({
        method: "post",
        url: '/api/bm/add',
        data: {
            uid: uid,
            m_name:m_name,
            m_type:m_type,
            m_fid:m_fid,
           
        }
    })
}

//修改部门职位
export function ModifyDepart(uid,m_name,m_type,m_fid,id) {
    return request({
        method: "post",
        url: '/api/bm/add',
        data: {
            uid: uid,
            m_name:m_name,
            m_type:m_type,
            m_fid:m_fid,
            id:id
        }
    })
}