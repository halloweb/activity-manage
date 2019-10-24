import React,{ useState } from 'react'
import { Radio, Pagination, Tabs, Icon } from 'antd'
import MerchantInfo from './merchant-info'
import MerchantAuth from './merchant-auth'
import CategoryList from './category-list'
import Model from '../../model'
import './style.scss'
const { TabPane } = Tabs
const tableHead = ['头像','名称','票数','共发放代金券','使用代金券','总抵扣额','卖票数','卖票收入']
function Details() {
  const [dataList,setDataList] = useState([])
  const [active,setActive] = useState()
  const [categoryId,setCategoryId] = useState(null)
  const [orderBy,setOrderBy] = useState('buyVoteIncome')
  const [total,setTotal] = useState(0)
  const changeHandler = (val) => {
    setOrderBy(val)
    pageChange(1,{orderBy:val})
  }
  const pageChange = (num,data) => {
    let params = Object.assign({},{activityId:categoryId,page:num,pageSize: 10,orderBy:orderBy},data)
    Model.getBusiness(params)
      .then(({data}) => {
        if(data.status === 200) {
          setTotal(data.data.total)
          setDataList(data.data.list)
        }
      })
  }
  const categoryChange = (id) => {
    setCategoryId(id)
    pageChange(1,{activityId:id})
  }
  return (
    <div className="active-details">
      <div className="left-panel">
         <CategoryList secondChange={categoryChange}/>
         <div className="merchant-wrap">
           <div className="title">
             <span>活动参与商</span>
             <Radio.Group defaultValue="buyVoteIncome" onChange={changeHandler} buttonStyle="solid">
              <Radio.Button value="buyVoteIncome">最多收入</Radio.Button>
              <Radio.Button value="registerDate">最新加入</Radio.Button>
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
                     <tr key={item.userid} onClick={() => setActive(item)}>
                       <td><img src={item.avatarurl}/></td>
                       <td>{item.shopName}</td>
                       <td>{item.buyVoteCount}</td>
                       <td>{item.totalVoucherCount}</td>
                       <td>{item.usedVoucherCount}</td>
                       <td>{item.totalUsedAmount}</td>
                       <td>{item.buyVoteCount}</td>
                       <td>{item.buyVoteIncome}</td>
                       <td><Icon type="edit" /><Icon type="close" /></td>
                     </tr>
                   ))
                 }
              </tbody>
            </table>
           </div>
           <div className="Pagination-wrap">
             <Pagination size="small" onChange={pageChange} total={total} showTotal={() => `共 ${total} 条`} />
           </div>
         </div>
      </div>
      <div className="aside-panel">
        <Tabs defaultActiveKey="1" tabBarGutter={95} >
          <TabPane tab="商家信息" key="1">
            <MerchantInfo info={active}/>
          </TabPane>
          <TabPane tab="商家认证" key="2">
            <MerchantAuth info={active}/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default Details