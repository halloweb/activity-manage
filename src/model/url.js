const baseUrl = window.location.origin
const $url = {
    login: `${baseUrl}/api/admin/login`, // 登录
    getBigActivity: `${baseUrl}/api/bigActivity/selectActivityTypes`, // 查询大类活动
    getSmallActivity: `${baseUrl}/api/smallActivity/selectByParentId`, // 查询二级分类
    selectBanners: `${baseUrl}/api/banner/selectBanners`, // 查询banner
    deleteBanner: `${baseUrl}/api/banner/deleteBanner`, // 删除banner
}
export default $url