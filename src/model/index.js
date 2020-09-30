import flyio from 'flyio'
import $url from './url'
import { message } from 'antd'
const Model = {
    login(data) {
      return flyio.post($url.login,data,{headers:{
        "content-type":"application/x-www-form-urlencoded"
    }})
    },
    getBigActivity (data = {}) {
        return flyio.get($url.getBigActivity, data)
        .then(({data}) => {
            if(data.status === 200) {
                return data.data
            }
        })     
    },
    updateActivityType (data) {
        return flyio.post($url.updateActivityType,data,{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})
    },
    deleteActivityType (id) {
        return flyio.post($url.deleteActivityType,{bigActivityId: id},{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})
    },
    addActivityType (data) {
        return flyio.post($url.addActivityType,data,{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})
    },
    getSmallActivity (id) {
        return flyio.get($url.getSmallActivity,{typeId: id})
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
        return flyio.post($url.deleteBanner,{bannerId:id},{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})
    },
    addBanner (data) {
        return flyio.post($url.addBanner,data)
    },
    updateActivity (data) {
        return flyio.post($url.updateActivity,data)
    },
    suspendActivity (data) {
       return flyio.post($url.suspendActivity,data,{headers:{
        "content-type":"application/x-www-form-urlencoded"
    }})       
    },
    addActivity(data) {
        return flyio.post($url.addActivity,data) 
    },
    deleteActivity(data) {
        return flyio.post($url.deleteActivity,data,{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})
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
        if (params.orderBy !== 'registerDate') {
            return flyio.get($url.getBusiness,params) 
        } else {
            let {activityId,orderBy,...rest} = params
            return  flyio.get($url.selectBusinessUsersNewest,rest)
        }
    },
    merchantEdit(data) {
        return flyio.post($url.merchantEdit,data,{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})
    },
    setBusinessUserState(data) {
        console.log(data)
        return flyio.post($url.setBusinessUserState,data)
    },
    certification(data) {
        return flyio.post($url.certification,data,{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})
    },
    merchantAudit(data) {
        return flyio.post($url.merchantAudit,data,{headers:{
            "content-type":"application/x-www-form-urlencoded"
        }})  
    },
    voucherUse() {
        return flyio.get($url.voucherUse)
    },
    getAllUserCount() {
        return flyio.get($url.getAllUserCount)
    },
    getUserLoginCount() {
        return flyio.get($url.getUserLoginCount)
    },
    selectTopUpWithCount() {
        return flyio.get($url.selectTopUpWithCount)
    },
    updateTopUpWithCount(data) {
        return flyio.post($url.updateTopUpWithCount,data)
    },
    insertTopUpWithCount(data) {
        return flyio.post($url.insertTopUpWithCount,data)
    },
    getUsersByActivityId(params) {
        if (params.orderBy !== 'registerDate') {
            return flyio.get($url.getUsersByActivityId,params) 
        } else {
            let {activityId,orderBy,...rest} = params
            return  flyio.get($url.selectBusinessUsersNewest,rest)
        }
    }

}
export default Model