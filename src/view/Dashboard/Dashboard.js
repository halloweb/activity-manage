import React from 'react'
import './style.scss'
import VoucherUse from './voucher-use'
import ActiveUser from './active-user'
import VoucherEdit from './voucher-edit'
import PicturesWall from './PicturesWall'
import UserAmount from './user-amount'
function Dashboard () {
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
                 <PicturesWall/>
                </div>
              </div>
            </div>
         </div>
     )
}
export default Dashboard