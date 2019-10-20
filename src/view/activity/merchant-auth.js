import React,{ useState } from 'react'
import { Button } from 'antd';
function MerchantAuth() {
    const [info,setInfo] = useState({})
    return (
        <div class="merchant-info">
            <div style={{flex:1}}>
                <div className="title">公司名称</div>
                <div className="desc"></div>
                <div className="title">公司税号</div>
                <div className="desc">店铺联系方式</div>
                <div className="title">公司联系方式</div>
                <div className="desc">店铺联系方式</div>
                <div className="title">公司营业执照</div>
                <img src=""/>
                <div className="title">公司营开户许可照片</div>
                <img src=""/>
            </div>
            <div className="btngroup">
                <div >通过</div>
                <div >不通过</div>
            </div>
        </div>
    )
}
export default MerchantAuth