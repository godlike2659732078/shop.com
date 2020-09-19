let menu = {};
/**
 * 用户信息审核
 * @type {{name: string, path: string, icon: string}}
 */
menu.home = {
    name: '控制台',
    path: '/home',
    icon: 'fa fa-home fa-lg',
};
/**
 * 用户管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.userControl = {
    name: '用户管理',
    icon: 'fa fa-users',
    children: {}
};
let userManage = menu.userControl.children
userManage.userList = {
    name: '用户列表',
    path: '/userList',
};
userManage.capital = {
    name: "用户资金",
    path: "/capitalList"
}
userManage.rebate = {
    name: '分销返佣',
    path: '/rebate/index',
};
/**
 * 考勤管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.attend = {
    name: '商家管理',
    icon: 'fa fa-fire',
    children: {}
};
let ContentManage = menu.attend.children
ContentManage.leave = {
    name: '请假/外出申请',
    path: '/leave',
};
ContentManage.proval = {
    name: '审批',
    path: '/proval',
};
ContentManage.allattend = {
    name: '考勤记录',
    path: '/allattend',
};
ContentManage.oneself = {
    name: '个人考勤记录',
    path: '/oneself',
};
/**
 * 部门管理
 * @type {{name: string, path: string, icon: string}}
 */
menu.department = {
    name: '商品管理',
    path: '/department',
    icon: 'fa fa-leaf',
};
/**
 * 员工管理
 * @type {{name: string, path: string, icon: string}}
 */
menu.staff = {
    name: '平台管理',
    path: '/staff',
    icon: 'fa fa-cubes',
};
/**
 * 个人资料
 * @type {{name: string, path: string, icon: string}}
 */
menu.mine = {
    name: '链下优选',
    path: '/mine',
    icon: 'fa fa-map-marker',
};
/**
 * 用户信息
 * @type {{name: string, path: string, icon: string}}
 */
menu.users = {
    name: '订单管理',
    path: '/users',
    icon: 'fa fa-shield',
};
/**
 * 公海池
 * @type {{name: string, path: string, icon: string}}
 */
menu.seaspool = {
    name: '资金管理',
    path: '/seaspool',
    icon: 'fa fa-cny',
};
/**
 * 业务池
 * @type {{name: string, path: string, icon: string}}
 */
menu.busipool = {
    name: '积分管理',
    path: '/busipool',
    icon: 'fa fa-cny',
};
/**
 * 员工录入
 * @type {{name: string, path: string, icon: string}}
 */
menu.empolentry = {
    name: '客服管理',
    path: '/empolentry',
    icon: 'fa fa-bell',
};
/**
 * 用户组
 * @type {{name: string, path: string, icon: string}}
 */
menu.usergroups = {
    name: '参数设置',
    path: '/usergroups',
    icon: 'fa fa-gear',
};
/**
 * 修改密码
 * @type {{name: string, path: string, icon: string}}
 */
menu.pwd = {
    name: '权限管理',
    path: '/pwd',
    icon: 'fa fa-briefcase',
};


export default menu;