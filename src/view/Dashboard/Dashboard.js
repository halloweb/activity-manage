import React,{ useState, useEffect } from 'react'
import './style.scss'
import VoucherUse from './voucher-use'
import ActiveUser from './active-user'
import VoucherEdit from './voucher-edit'
import PicturesWall from '../../components/PicturesWall'
import UserAmount from './user-amount'
import Model from '../../model'
function Dashboard () {
     const [fileList,setFile] = useState([])
     const getBanner = () => {
        Model.getBanners()
          .then(list => setFile(list))
     }
     useEffect(() => {
       getBanner()
     },[])
     const removeBanner = (file) => {
        Model.deleteBanner(file.id)
     }
     return (
         <div className="dashboard">
            <div className="row">
              <div className="panel">
                <UserAmount/>
              </div>
              <div className="panel voucher">
              <VoucherUse/>
              </div>
              <div className="panel panel_aside">
              <VoucherEdit/> 
              </div>
            </div>
            <div className="row">
              <div className="panel panel_col2">
              <ActiveUser/>
              </div>
              <div className="panel panel_aside banner">
                <div className="title">广告Banner</div>
                <div className="scrollbar banner-list">
                 <PicturesWall 
                  fileList={fileList} 
                  action='/api/banner/addBanner'
                  onRemove={removeBanner}
                />
                </div>
              </div>
            </div>
         </div>
     )
}
export default Dashboard