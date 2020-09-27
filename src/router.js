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
const live_liveList = () =>
    import('./views/merchant/live/liveList.vue')
const cmtShop_edit = () =>
    import('./views/merchant/cmtShop/editCmtShop.vue')
const live_goodsList = () =>
    import('./views/merchant/live/goodsList.vue')
const live_add = () =>
    import('./views/merchant/live/addLive.vue')
const liveGoodsList = () =>
    import('./views/merchant/live/liveGoodsList.vue')
const addLiveGoods = () =>
    import('./views/merchant/live/addGoods.vue')
const merClass = () =>
    import('./views/commodity/merClass/index')
const addmerClass = () =>
    import('./views/commodity/merClass/addmerclass.vue')
const editmerClass = () =>
    import('./views/commodity/merClass/edit.vue')
const exchange = () =>
    import('./views/commodity/exchange/index')
const exchange_add = () =>
    import('./views/commodity/exchange/add.vue')
const exchange_edit = () =>
    import('./views/commodity/exchange/edit.vue')
const commodity_merchant = () =>
    import('./views/commodity/merchant/index')
const commodity_merchant_add = () =>
    import('./views/commodity/merchant/add.vue')
const commodity_merchant_edit = () =>
    import('./views/commodity/merchant/edit.vue')
const commodity_merchant_opadd = () =>
    import('./views/commodity/merchant/opadd.vue')
const exClass = () =>
    import('./views/commodity/exClass/index')
const addexClass = () =>
    import('./views/commodity/exClass/addexclass.vue')
const editexClass = () =>
    import('./views/commodity/exClass/edit.vue')
const tag = () =>
    import('./views/commodity/tag/index')
const addTag = () =>
    import('./views/commodity/tag/addTag.vue')
const editTag = () =>
    import('./views/commodity/tag/edit.vue')
const commodity_check = () =>
    import('./views/commodity/check/index.vue')
const commodity_passcheck = () =>
    import('./views/commodity/check/form.vue')
const seckill = () =>
    import('./views/commodity/seckill/index')
const seckill_add = () =>
    import('./views/commodity/seckill/add.vue')
const seckill_edit = () =>
    import('./views/commodity/seckill/edit.vue')
const recommended = () =>
    import('./views/commodity/recommended/index')
const recommended_add = () =>
    import('./views/commodity/recommended/add.vue')
const recommended_edit = () =>
    import('./views/commodity/recommended/edit.vue')
const shopCoupon = () =>
    import('./views/commodity/shopCoupon/index')
const shopCoupon_edit = () =>
    import('./views/commodity/shopCoupon/edit')
const banner = () =>
    import('./views/platform/banner/index')
const banner_add = () =>
    import('./views/platform/banner/addBanner.vue')
const banner_edit = () =>
    import('./views/platform/banner/edit.vue')
const bank = () =>
    import('./views/platform/bank/index')
const bank_add = () =>
    import('./views/platform/bank/addBank.vue')
const bank_edit = () =>
    import('./views/platform/bank/edit.vue')
const blogroll = () =>
    import('./views/platform/blogroll/index')
const blogroll_add = () =>
    import('./views/platform/blogroll/addblogroll.vue')
const blogroll_edit = () =>
    import('./views/platform/blogroll/edit.vue')
const subject = () =>
    import('./views/platform/subject/index')
const subject_add = () =>
    import('./views/platform/subject/addSubject.vue')
const subject_edit = () =>
    import('./views/platform/subject/edit.vue')
const advertising = () =>
    import('./views/platform/advertising/index')
const advertising_add = () =>
    import('./views/platform/advertising/addAdvertising.vue')
const advertising_edit = () =>
    import('./views/platform/advertising/edit.vue')
const rule = () =>
    import('./views/platform/rule/index')
const rule_edit = () =>
    import('./views/platform/rule/edit')
import('./views/platform/advertising/edit.vue')
const school = () =>
    import('./views/platform/school/index')
const school_add = () =>
    import('./views/platform/school/addSchool.vue')
const school_edit = () =>
    import('./views/platform/school/edit')





// ________________________________________________
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
                name: 'cmtShop_add',
                meta: {

                },
                component: cmtShop_add
            },
            {
                path: '/merchant/cmtShop/form',
                name: 'cmtShop_edit',
                meta: {
                },
                component: cmtShop_edit
            },
            {
                path: '/merchant/liveShow',
                name: 'liveShow',
                meta: {
                    title: "直播间管理"
                },
                component: live_liveList
            },
            {
                path: '/merchant/liveShow/goodsList',
                name: 'live_goodsList',
                meta: {

                },
                component: live_goodsList
            },
            {
                path: '/live/liveAdd',
                name: 'liveAdd',
                meta: {

                },
                component: live_add
            },
            {
                path: '/merchant/liveGoodsList',
                name: 'liveGoodsList',
                meta: {
                    title: "直播商品库"
                },
                component: liveGoodsList
            },
            {
                path: '/merchant/liveGoodsList/add',
                name: 'addLiveGoods',
                meta: {
                    title: "提交商品并审核"
                },
                component: addLiveGoods
            },
            {
                path: '/commodity/merClass',
                name: 'merClass',
                meta: {
                    title: "商家商品分类"
                },
                component: merClass
            },
            {
                path: '/commodity/merClass/add',
                name: 'addmerClass',
                meta: {

                },
                component: addmerClass
            },
            {
                path: '/commodity/merClass/edit',
                name: 'editmerClass',
                meta: {

                },
                component: editmerClass
            },
            {
                path: '/commodity/exchange',
                name: 'exchange',
                meta: {
                    title: "兑换商品"
                },
                component: exchange
            },
            {
                path: '/commodity/exchange/add',
                name: 'exchange_add',
                meta: {
                    title: "添加兑换商品"
                },
                component: exchange_add
            },
            {
                path: '/commodity/exchange/edit',
                name: 'exchange_edit',
                component: exchange_edit
            },
            {
                path: '/commodity/merchant',
                name: 'commodity_merchant',
                meta: {
                    title: "商家商品"
                },
                component: commodity_merchant
            },
            {
                path: '/commodity/merchant/add',
                name: 'commodity_merchant_add',
                meta: {
                    title: "添加产品"
                },
                component: commodity_merchant_add
            },
            {
                path: '/commodity/merchant/edit',
                name: 'commodity_merchant_edit',
                component: commodity_merchant_edit
            },
            {
                path: '/commodity/merchant/opadd',
                name: 'commodity_merchant_opadd',
                component: commodity_merchant_opadd
            },
            {
                path: '/commodity/exClass',
                name: 'exClass',
                meta: {
                    title: "兑换商品分类"
                },
                component: exClass
            },
            {
                path: '/commodity/exClass/add',
                name: 'addexClass',
                meta: {

                },
                component: addexClass
            },
            {
                path: '/commodity/exClass/edit',
                name: 'editexClass',
                meta: {

                },
                component: editexClass
            },
            {
                path: '/commodity/tag',
                name: 'tag',
                meta: {
                    title: "商品标签"
                },
                component: tag
            },
            {
                path: '/commodity/tag/add',
                name: 'addTag',
                meta: {

                },
                component: addTag
            },
            {
                path: '/commodity/tag/edit',
                name: 'editTag',
                meta: {

                },
                component: editTag
            },
            {
                path: '/commodity/check',
                name: 'commodity_check',
                meta: {
                    title: "审核商品"
                },
                component: commodity_check
            },
            {
                path: '/commodity/check/form',
                name: 'commodity_passcheck',
                component: commodity_passcheck
            },
            {
                path: '/commodity/seckill',
                name: 'seckill',
                meta: {
                    title: "限时秒杀"
                },
                component: seckill
            },
            {
                path: '/commodity/seckill/add',
                name: 'seckill_add',
                meta: {
                    title: "添加秒杀商品"
                },
                component: seckill_add
            },
            {
                path: '/commodity/seckill/edit',
                name: 'seckill_edit',
                component: seckill_edit
            },
            {
                path: '/commodity/recommended',
                name: 'recommended',
                meta: {
                    title: "链上推荐"
                },
                component: recommended
            },
            {
                path: '/commodity/recommended/add',
                name: 'recommended_add',
                meta: {
                    title: "添加推荐商品"
                },
                component: recommended_add
            },
            {
                path: '/commodity/recommended/edit',
                name: 'recommended_edit',
                component: recommended_edit
            },
            {
                path: '/commodity/shopCoupon',
                name: 'shopCoupon',
                meta: {
                    title: "商品优惠券"
                },
                component: shopCoupon
            },
            {
                path: '/commodity/shopCoupon/edit',
                name: 'shopCoupon_edit',

                component: shopCoupon_edit
            },
            {
                path: '/platform/banner',
                name: 'banner',
                meta: {
                    title: "轮播管理"
                },
                component: banner
            },
            {
                path: '/platform/banner/add',
                name: 'addBanner',
                meta: {
                    title: "添加轮播"
                },
                component: banner_add
            },
            {
                path: '/platform/banner/edit',
                name: 'editBanner',
                meta: {

                },
                component: banner_edit
            },
            {
                path: '/platform/bank',
                name: 'bank',
                meta: {
                    title: "银行管理"
                },
                component: bank
            },
            {
                path: '/platform/bank/add',
                name: 'bank_add',
                meta: {
                    title: "添加银行"
                },
                component: bank_add
            },
            {
                path: '/platform/bank/edit',
                name: 'bank_edit',
                meta: {

                },
                component: bank_edit
            },
            {
                path: '/platform/blogroll',
                name: 'bank',
                meta: {
                    title: "友情链接"
                },
                component: blogroll
            },
            {
                path: '/platform/blogroll/add',
                name: 'blogroll_add',
                meta: {
                    title: "添加友情链接"
                },
                component: blogroll_add
            },
            {
                path: '/platform/blogroll/edit',
                name: 'blogroll_edit',
                meta: {

                },
                component: blogroll_edit
            },
            {
                path: '/platform/subject',
                name: 'subject',
                meta: {
                    title: "消息公告"
                },
                component: subject
            },
            {
                path: '/platform/subject/add',
                name: 'subject_add',
                meta: {
                    title: "添加消息公告"
                },
                component: subject_add
            },
            {
                path: '/platform/subject/edit',
                name: 'subject_edit',
                meta: {

                },
                component: subject_edit
            },
            {
                path: '/platform/advertising',
                name: 'advertising',
                meta: {
                    title: "广告管理"
                },
                component: advertising
            },
            {
                path: '/platform/advertising/add',
                name: 'advertising_add',
                meta: {
                    title: "添加广告"
                },
                component: advertising_add
            },
            {
                path: '/platform/advertising/edit',
                name: 'advertising_edit',
                meta: {

                },
                component: advertising_edit
            },
            {
                path: '/platform/rule',
                name: 'rule',
                meta: {
                    title: "平台规则"
                },
                component: rule
            },
            {
                path: '/platform/rule/edit',
                name: 'rule_edit',

                component: rule_edit
            },
            {
                path: '/platform/school',
                name: 'school',
                meta: {
                    title: "链商学院"
                },
                component: school
            },
            {
                path: '/platform/school/add',
                name: 'school_add',
                meta: {
                    title: "添加"
                },
                component: school_add
            },
            {
                path: '/platform/school/edit',
                name: 'school_edit',
                meta: {

                },
                component: school_edit
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