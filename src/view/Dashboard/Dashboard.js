import React,{ useState, useEffect } from 'react'
import './style.scss'
import VoucherUse from './voucher-use'
import ActiveUser from './active-user'
import VoucherEdit from './voucher-edit'
import PicturesWall from '../../components/PicturesWall'
import UserAmount from './user-amount'
import Model from '../../model'
import {Modal, Input, message} from 'antd'
function Dashboard () {
     const [fileList,setFile] = useState([])
     const [visible,setVisible] = useState(false)
     const [bannerUrl,setBannerUrl] = useState()
     const [linkUrl,setLinkUrl] = useState()
     const getBanner = () => {
        Model.getBanners()
          .then(list => setFile(list))
     }
     useEffect(() => {
       getBanner()
     },[])
     const removeBanner = (file) => {
      file.id && Model.deleteBanner(file.id)
     }
     const pictureChange = ({file,fileList}) => {
       setFile([...fileList])
       if(file.status === 'done' && file.response.status === 200) {
          setVisible(true)
          setBannerUrl(file.response.data)
       }
     }
     const submitLink = () => {
          if(linkUrl) {
            Model.addBanner({icon:bannerUrl,linkUrl:linkUrl})
            .then(({data}) => {
              data.status === 200 && getBanner()
              setVisible(false)
            } )
          } else {
            message.error('轮播图点击链接不能为空')
          }
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
                  data={{type: '1'}}
                  onRemove={removeBanner}
                  onChange={pictureChange}
                />
                </div>
              </div>
            </div>
            <Modal
              title="请填写轮播图点击链接"
              visible={visible}
              onOk={submitLink}
              onCancel={() => setVisible(false)}
            >
              <Input onChange={(e) => setLinkUrl(e.target.value)} placeholder="请填写轮播图点击跳转链接" />
            </Modal>
         </div>
     )
}
export default Dashboard