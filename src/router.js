import Vue from 'vue'
import Router from 'vue-router'
const Home = () =>
    import('./views/Home.vue')
const userList = () =>
    import('./views/userControl/list/userlist.vue')
const about = () =>
    import('./views/About.vue')
const login = () =>
    import('./views/login.vue')
const credits = () =>
    import('./views/userControl/list/credits.vue')
const record = () =>
    import('./views/userControl/list/record.vue')
const capitalList = () =>
    import('./views/userControl/capital/capitalList.vue')
const capital_record = () =>
    import('./views/userControl/capital/record.vue')
const rebate_index = () =>
    import('./views/userControl/rebate/index.vue')
const reabte_detail = () =>
    import('./views/userControl/rebate/detail.vue')
const checkList = () =>
    import('./views/userControl/check/check.vue')
const order_vip = () =>
    import('./views/userControl/order/order.vue')
const userInvite = () =>
    import('./views/userControl/userInvite/userInvite.vue')
const userInvite_detail = () =>
    import('./views/userControl/userInvite/detail.vue')
const redPacket = () =>
    import('./views/userControl/redPacket/redPacket.vue')
const merchantList = () =>
    import('./views/merchant/list/merchantList.vue')
const merchantList_add = () =>
    import('./views/merchant/list/addMerchant.vue')
const merchantList_edit = () =>
    import('./views/merchant/list/editForm.vue')
const merchantList_team = () =>
    import('./views/merchant/list/team.vue')
const team_details = () =>
    import('./views/merchant/list/teamDetails.vue')
const merchant_money = () =>
    import('./views/merchant/moneyList/merMoney.vue')
const merchant_record = () =>
    import('./views/merchant/moneyList/record.vue')
const merchant_inRecord = () =>
    import('./views/merchant/moneyList/inRecord.vue')
const merchant_rebate = () =>
    import('./views/merchant/rebate/rebate.vue')
const merchant_rebate_detail = () =>
    import('./views/merchant/rebate/detail.vue')
const merchant_check_check = () =>
    import('./views/merchant/check/check.vue')
const merchant_barter = () =>
    import('./views/merchant/barter/barter.vue')
const barter_form = () =>
    import('./views/merchant/barter/barter_form.vue')
const barter_type = () =>
    import('./views/merchant/barterType/type.vue')
const barter_goods = () =>
    import('./views/merchant/barter/barterGoods.vue')
const barter_goodsForm = () =>
    import('./views/merchant/barter/barterGoodsForm.vue')
const cmtShop = () =>
    import('./views/merchant/cmtShop/index.vue')
    const cmtShop_add = () =>
    import('./views/merchant/cmtShop/addCmtshop.vue')
    const cmtShop_edit = () =>
    import('./views/merchant/cmtShop/editCmtShop.vue')
// ________________________________________________

const department = () =>
    import('./views/department.vue')
const staff = () =>
    import('./views/staff.vue')
const leave = () =>
    import('./views/leave.vue')
const proval = () =>
    import('./views/proval.vue')
const allattend = () =>
    import('./views/allattend.vue')
const oneself = () =>
    import('./views/oneself.vue')
const mine = () =>
    import('./views/mine.vue')
const users = () =>
    import('./views/users.vue')
const seaspool = () =>
    import('./views/seaspool.vue')
const busipool = () =>
    import('./views/busipool.vue')
const empolentry = () =>
    import('./views/empolentry.vue')
const usergroups = () =>
    import('./views/usergroups.vue')
const pwd = () =>
    import('./views/pwd.vue')
Vue.use(Router)

export default new Router({

    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: 'index'
            },
            redirect: "/index"
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'login'
            },
            component: login,
        },
        {
            path: '/home',
            meta: {
                title: 'home'
            },
            component: Home,
            children: [{
                path: '/',
                meta: {
                    title: '首页'
                },
                redirect: "/index"
            },
            {
                path: '/index',
                name: 'about',
                meta: {
                    title: '首页'
                },
                component: about,
            },

            {
                path: '/user/list',
                name: 'userList',
                meta: {
                    title: '用户列表'
                },
                component: userList
            },
            {
                path: '/credits',
                name: 'credits',
                meta: {
                    title: '用户积分'
                },
                component: credits
            },
            {
                path: '/record',
                name: 'record',
                meta: {
                    title: '积分列表'
                },
                component: record
            },
            {
                path: '/user/money',
                name: 'money',
                meta: {
                    title: '用户资金'
                },
                component: capitalList
            },
            {
                path: '/capital/record',
                name: 'capital_record',

                component: capital_record
            },
            {
                path: '/user/rebate',
                name: 'rebate_index',
                meta: {
                    title: '分销返佣'
                },
                component: rebate_index
            },
            {
                path: '/rebate/detail',
                name: 'detail',

                component: reabte_detail
            },
            {
                path: '/user/check',
                name: 'check',
                meta: {
                    title: '实名认证'
                },
                component: checkList
            },
            {
                path: '/user/order',
                name: 'order_vip',
                meta: {
                    title: 'vip订单'
                },
                component: order_vip
            },
            {
                path: '/user/userInvite',
                name: 'userInvite',
                meta: {
                    title: '用户邀请'
                },
                component: userInvite
            },
            {
                path: '/user/userInvite/detail',
                name: 'userInvite_detail',

                component: userInvite_detail
            },
            {
                path: '/user/redPacket',
                name: 'redPacket',
                meta: {
                    title: '红包记录'
                },
                component: redPacket
            },
            {
                path: '/merchant/merchantList',
                name: 'merchantList',
                meta: {
                    title: '商家列表'
                },
                component: merchantList
            },
            {
                path: '/merchant/merchantList/add',
                name: 'merchantList_add',
                meta: {
                    title: '添加商家'
                },
                component: merchantList_add
            },
            {
                path: '/merchant/merchantList/form',
                name: 'merchantList_edit',

                component: merchantList_edit
            },
            {
                path: '/merchant/merchantList/team',
                name: 'merchantList_team',
                meta: "",
                component: merchantList_team
            },
            {
                path: '/merchant/merchantList/teamDetails',
                name: 'team_details',

                component: team_details
            },
            {
                path: '/merchant/merMoney',
                name: 'merchant_money',
                meta: {
                    title: '商家资金'
                },
                component: merchant_money
            },
            {
                path: '/merchant/record',
                name: 'merchant_record',
                component: merchant_record
            },
            {
                path: '/merchant/inRecord',
                name: 'merchant_inRecord',
                component: merchant_inRecord
            },
            {
                path: '/merchant/rebate',
                name: 'merchant_rebate',
                meta: {
                    title: '商家返佣'
                },
                component: merchant_rebate
            },
            {
                path: '/merchant/rebate/detail',
                name: 'merchant_rebate_detail',
                meta: {

                },
                component: merchant_rebate_detail
            },
            {
                path: '/merchant/check',
                name: 'merchant_check_check',
                meta: {
                    title: '商家审核'
                },
                component: merchant_check_check
            },
            {
                path: '/merchant/barter',
                name: 'barter',
                meta: {
                    title: '易货列表'
                },
                component: merchant_barter
            },
            {
                path: '/barter/form',
                name: 'barter_form',
                meta: {

                },
                component: barter_form
            },
            {
                path: '/merchant/barterType',
                name: 'barterType',
                meta: {
                    title: "商铺类型"
                },
                component: barter_type
            },
            {
                path: '/merchant/barterGoods',
                name: 'barter_goods',
                meta: {
                    title: "易货商品"
                },
                component: barter_goods
            },
            {
                path: '/barter/barterGoodsForm',
                name: 'barter_goodsForm',
                meta: {

                },
                component: barter_goodsForm
            },
            {
                path: '/merchant/cmtShop',
                name: 'cmtShop',
                meta: {
                    title: "易货商品"
                },
                component: cmtShop
            },
            {
                path: '/merchant/cmtShop/add',
                name: 'cmtShop',
                meta: {
                   
                },
                component: cmtShop_add
            },
            {
                path: '/merchant/cmtShop/form',
                name: 'cmtShop',
                meta: {
                  
                },
                component: cmtShop_edit
            },
            // ————————————————————————————————————————————————————————————————————
            {
                path: '/leave',
                name: 'leave',
                meta: {
                    title: '请假'
                },
                component: leave
            }, {
                path: '/proval',
                name: 'proval',
                meta: {
                    title: '审批'
                },
                component: proval
            }, {
                path: '/allattend',
                name: 'allattend',
                meta: {
                    title: '考勤记录'
                },
                component: allattend
            }, {
                path: '/oneself',
                name: 'oneself',
                meta: {
                    title: '个人考勤'
                },
                component: oneself
            },
            {
                path: '/department',
                name: 'department',
                meta: {
                    title: '员工管理'
                },
                component: department
            },
            {
                path: '/staff',
                name: 'staff',
                meta: {
                    title: '部门管理'
                },
                component: staff
            },
            {
                path: '/mine',
                name: 'mine',
                meta: {
                    title: '个人资料'
                },
                component: mine
            }, {
                path: '/users',
                name: 'users',
                meta: {
                    title: '用户信息'
                },
                component: users
            }, {
                path: '/seaspool',
                name: 'seaspool',
                meta: {
                    title: '公海池'
                },
                component: seaspool
            }, {
                path: '/busipool',
                name: 'busipool',
                meta: {
                    title: '业务池'
                },
                component: busipool
            },

            {
                path: '/empolentry',
                name: 'empolentry',
                meta: {
                    title: '员工录入'
                },
                component: empolentry
            }, {
                path: '/usergroups',
                name: 'usergroups',
                meta: {
                    title: '用户组'
                },
                component: usergroups
            }, {
                path: '/pwd',
                name: 'pwd',
                meta: {
                    title: '修改密码'
                },
                component: pwd
            },

            ],
        }

    ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}