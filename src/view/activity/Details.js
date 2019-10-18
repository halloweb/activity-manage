import React from 'react'
import { Radio } from 'antd'
import './style.scss'
const tableHead = ['头像','名称','票数','共发放代金券','使用代金券','总抵扣额','卖票数','卖票收入']
function Details() {
  const changeHandler = (val) => {

  }
  return (
    <div className="active-details">
      <div className="left-panel">
         <div className="merchant-wrap">
           <div className="title">
             <span>活动参与商</span>
             <Radio.Group defaultValue="最多收入" onChange={changeHandler} buttonStyle="solid">
              <Radio.Button value="最多收入">最多收入</Radio.Button>
              <Radio.Button value="最新加入">最新加入</Radio.Button>
            </Radio.Group>
           </div>
           <table>
             <thead>
               {
                tableHead.map((item,index) => (<th key={index}>{item}</th>))
               }
             </thead>
             <tbody>
               
             </tbody>
           </table>
         </div>
      </div>
      <div className="aside-panel">

      </div>
    </div>
  )
}
export default Details