const baseUrl = window.location.origin
const $url = {
    login: `${baseUrl}/api/admin/login`, // 登录
    getBigActivity: `${baseUrl}/api/bigActivity/selectActivityTypes`, // 查询大类活动
    updateActivityType: `${baseUrl}/api/bigActivity/updateActivityType`, // 查询大类活动
    addActivityType: `${baseUrl}/api/bigActivity/addActivityType`, // 查询大类活动
    deleteActivityType: `${baseUrl}/api/bigActivity/deleteActivityType`, // 查询大类活动
    getSmallActivity: `${baseUrl}/api/smallActivity/selectByParentId`, // 查询二级分类
    selectBanners: `${baseUrl}/api/banner/selectBanners`, // 查询banner
    deleteBanner: `${baseUrl}/api/banner/deleteBanner`, // 删除banner
    addBanner: `${baseUrl}/api/banner/addBanner`, // 添加banner
    updateActivity: `${baseUrl}/api/smallActivity/updateActivity`, // 修改活动详情
    suspendActivity: `${baseUrl}/api/smallActivity/suspend`, // 挂起活动
    addActivity: `${baseUrl}/api/smallActivity/addActivity`, // 添加活动
    deleteActivity: `${baseUrl}/api/smallActivity/delete`, // 删除活动
    voucherList: `${baseUrl}/api/vote/voucher/selectAll`, // 获取代金券列表
    voucherUse: `${baseUrl}/api/admin/count/voucher`, // 代金券使用比例
    deleteVoucher: `${baseUrl}/api/vote/voucher/delete`, // 删除代金券
    updateVoucher: `${baseUrl}/api/vote/voucher/update`, // 更新代金券
    addVoucher: `${baseUrl}/api/vote/voucher/add`, // 更新代金券
    getBusiness: `${baseUrl}/api/smallActivity/selectBusinessUsersByActivityId`, // 二级活动-商户列表
    merchantEdit: `${baseUrl}/api/user/merchant/editInfo`, // 商户信息编辑
    setBusinessUserState: `${baseUrl}/api/admin/setBusinessUserState`, // 挂起商户
    certification: `${baseUrl}/api/user/merchant/certification`, // 商户认证信息编辑
    merchantAudit: `${baseUrl}/api/user/merchant/audit`, // 商户认证状态修改
}
export default $url