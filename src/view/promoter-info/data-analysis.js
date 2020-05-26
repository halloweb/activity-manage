import React,{ useState } from 'react'
import { Radio } from 'antd'
import Model from '../../model'
function Details() {
  return (
    <div className="active-details">
      <div className="left-panel">
         <div className="merchant-wrap" style={{marginTop: 0}}>
           <div className="title">
             <span>用户数据分析</span>
             <Radio.Group defaultValue="all"  buttonStyle="solid">
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="buyVoteIncome">签约销售</Radio.Button>
              <Radio.Button value="registerDate">独立运营</Radio.Button>
            </Radio.Group>
           </div>
         </div>
      </div>
      
    </div>
  )
}
export default Details