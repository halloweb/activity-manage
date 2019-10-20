import flyio from 'flyio'
import $url from './url'
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
    }

}
export default Model