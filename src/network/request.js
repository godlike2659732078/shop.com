import axios from 'axios'
import router from "../router"
import { Message } from "element-ui";
import store from "../store"
let url = 'http://192.168.1.40:8081'
// let url='http://120.27.21.153:8081'
// let url = 'http://admin.chainmall.pro/api'
// let upImgUrl='http://192.168.1.133/img/saveImage/image'
let upImgUrl = 'http://res.chainmall.pro/img/saveImage/image'
// ,upImgUrl:'http://test.chainmall.pro/img/saveImage/image'
let contentImg = "http://res.chainmall.pro/img/saveImage/imageForRichText"
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
export
    function request(config) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: url
        })
        instance(config).then(res => {
            resolve(res.data)
            //token响应,登录超时判断
            if (store.state.accessToken == "" || store.state.accessToken == null || store.state.accessToken.length == 0 || res.data.code == 4030) {
                let doms = document.getElementsByClassName('el-message')[0]
                if (doms == undefined) {
                    Message.error("请重新登录！")
                }

                router.push({
                    path: "/login"
                })
                return false
            }
        }).catch(err => {
            reject(err)
            let doms = document.getElementsByClassName('el-message')[0]
            if (doms == undefined) {
            Message.error("请求出错，请稍后重试！！！")
        }
            return false
        })
    })
}