import React,{ useState } from 'react'
import { Radio, Pagination, Tabs } from 'antd'
import MerchantInfo from './merchant-info'
import MerchantAuth from './merchant-auth'
import CategoryList from './category-list'
import './style.scss'
const { TabPane } = Tabs
const tableHead = ['头像','名称','票数','共发放代金券','使用代金券','总抵扣额','卖票数','卖票收入']
function Details() {
  const [dataList,setDataList] = useState([])
  const [active,setActive] = useState(null)
  const changeHandler = (val) => {

  }
  const pageChange = (num) => {

  }
  const categoryChange = (id) => {

  }
  return (
    <div className="active-details">
      <div className="left-panel">
         <CategoryList secondChange={categoryChange}/>
         <div className="merchant-wrap">
           <div className="title">
             <span>活动参与商</span>
             <Radio.Group defaultValue="最多收入" onChange={changeHandler} buttonStyle="solid">
              <Radio.Button value="最多收入">最多收入</Radio.Button>
              <Radio.Button value="最新加入">最新加入</Radio.Button>
            </Radio.Group>
           </div>
           <div className="table-wrap">
            <table className="com-table">
              <thead>
                <tr>
                  {
                    tableHead.map((item,index) => (<th key={index}>{item}</th>))
                  }
                </tr>
              </thead>
              <tbody>
                 {
                   dataList.map(item => (
                     <tr key={item.id}>

                     </tr>
                   ))
                 }
              </tbody>
            </table>
           </div>
           <div className="Pagination-wrap">
             <Pagination size="small" onChange={pageChange} total={50} showTotal={() => `共 100`} />
           </div>
         </div>
      </div>
      <div className="aside-panel">
        <Tabs defaultActiveKey="1" tabBarGutter={95} >
          <TabPane tab="商家信息" key="1">
            <MerchantInfo/>
          </TabPane>
          <TabPane tab="商家认证" key="2">
            <MerchantAuth/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default Details