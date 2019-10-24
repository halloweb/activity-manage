const baseUrl = window.location.origin
const $url = {
    login: `${baseUrl}/api/admin/login`, // 登录
    getBigActivity: `${baseUrl}/api/bigActivity/selectActivityTypes`, // 查询大类活动
    getSmallActivity: `${baseUrl}/api/smallActivity/selectByParentId`, // 查询二级分类
    selectBanners: `${baseUrl}/api/banner/selectBanners`, // 查询banner
    deleteBanner: `${baseUrl}/api/banner/deleteBanner`, // 删除banner
    addBanner: `${baseUrl}/api/banner/addBanner`, // 添加banner
    updateActivity: `${baseUrl}/api/smallActivity/updateActivity`, // 修改活动详情
    suspendActivity: `${baseUrl}/api/smallActivity/suspend`, // 挂起活动
    voucherList: `${baseUrl}/api/vote/voucher/selectAll`, // 获取代金券列表
    deleteVoucher: `${baseUrl}/api/vote/voucher/delete`, // 删除代金券
    updateVoucher: `${baseUrl}/api/vote/voucher/update`, // 更新代金券
    addVoucher: `${baseUrl}/api/vote/voucher/add`, // 更新代金券
    getBusiness: `${baseUrl}/api/smallActivity/selectBusinessUsersByActivityId`, // 二级活动-商户列表
}
export default $url