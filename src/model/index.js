import flyio from 'flyio'
import $url from './url'
import { message } from 'antd'
const Model = {
    login(data) {
      return flyio.post($url.login,data,{headers:{
        "content-type":"application/x-www-form-urlencoded"
    }})
    },
    getBigActivity () {
        return flyio.get($url.getBigActivity)
        .then(({data}) => {
            if(data.status === 200) {
                return data.data
            }
        })     
    },
    getSmallActivity (id,status='1') {
        return flyio.get($url.getSmallActivity,{bigActivityId: id, status: status})
        .then(({data}) => {
            if(data.status === 200) {
                return data.data
            }
        })     
    },
    getBanners () {
        return flyio.get($url.selectBanners)
          .then(({data}) => {
              if (data.status === 200) {
                  return data.data.map(v => {
                      v.url = v.icon
                      v.uid = -v.id
                      return v
                  })
              }
          })
    },
    deleteBanner (id) {
        return flyio.post($url.deleteBanner,{bannerId:id})
    },
    addBanner (data) {
        return flyio.post($url.addBanner,data)
    },
    updateActivity (data) {
        return flyio.post($url.updateActivity,data)
    },
    suspendActivity (id) {
       flyio.post($url.updateActivity,{activityId: id})
         .then(({data}) => {
             if(data.status === 200) {
                message.success('活动挂起成功')
             } else {
                message.error('活动挂起失败') 
             }
         })
         .catch(() => message.error('活动挂起失败'))          
    },
    getVoucherList() {
        return flyio.get($url.voucherList)
    },
    deleteVoucher(id) {
        return flyio.post($url.deleteVoucher,{id:id})
    },
    updateVoucher(data) {
        return flyio.post($url.updateVoucher,data)
    },
    addVoucher(data) {
        return flyio.post($url.addVoucher,data)
    },
    getBusiness(params) {
        return flyio.get($url.getBusiness,params)
    }

}
export default Model