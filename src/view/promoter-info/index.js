import React,{ useState } from 'react'
import { Radio, Pagination, Tabs, Spin, message } from 'antd'
import Info from './info'
import Model from '../../model'
const { TabPane } = Tabs
const tableHead = ['头像','名称','推广数','平均消费','销售总额','推广收益']
function Details() {
  const [dataList,setDataList] = useState([])
  const [orderBy,setOrderBy] = useState('buyVoteIncome')
  const [total,setTotal] = useState(0)
  const [pageNum,setNum] = useState(0)
  const [loading,setLoading] = useState(false)
  const [active,setActive] = useState()
  const changeHandler = (e) => {
    setOrderBy(e.target.value)
    pageChange(1,{orderBy:e.target.value})
  }
  const pageChange = (num,data = {}) => {
    setLoading(true)
    num && setNum(num)
    let params = Object.assign({},{page:num || pageNum,pageSize: 10,orderBy:orderBy},data)
    Model.getBusiness(params)
      .then(({data}) => {
        if(data.status === 200) {
          setTotal(data.data.total)
          setDataList(data.data.list)
          if (active) {
            let item = data.data.list.find(v => v.userid === active.userid)
            item && setActive(item)
          }  else {
            // setActive(data.data.list[0])
          }
        }
      })
      .finally(() => setLoading(false))
  }
  return (
    <div className="active-details">
      <div className="left-panel">
         <div className="merchant-wrap" style={{marginTop: 0}}>
           <div className="title">
             <span>活动推广人员信息</span>
             <Radio.Group defaultValue="buyVoteIncome" onChange={changeHandler} buttonStyle="solid">
              <Radio.Button value="buyVoteIncome">签约销售</Radio.Button>
              <Radio.Button value="registerDate">独立运营</Radio.Button>
            </Radio.Group>
           </div>
           <Spin spinning={loading} >
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
                   dataList.length ? dataList.map(item => (
                     <tr className={`${active && item.userid === active.userid ? 'active' : null}`} key={item.userid} onClick={() => setActive(item)}>
                       <td><img src={item.avatarurl}/></td>
                       <td>{item.shopName}</td>
                       <td>{item.voteCount}</td>
                       <td>{item.totalVoucherCount}</td>
                       <td>{item.usedVoucherCount}</td>
                       <td>{item.totalUsedAmount}</td>
                       <td>{item.buyVoteCount}</td>
                       <td>{item.buyVoteIncome}</td>
                     </tr>
                   )) : (<tr>
                           <td colSpan="8">暂无数据</td>
                        </tr>)
                 }
              </tbody>
            </table>
           </div>
           <div className="Pagination-wrap">
             <Pagination size="small" onChange={pageChange} total={total} showTotal={() => `共 ${total} 条`} />
           </div>
           </Spin>
         </div>
      </div>
      <div className="aside-panel">
      <Spin spinning={loading} >
        <Tabs defaultActiveKey="1"  tabBarGutter={95} >
          <TabPane tab="人员信息" key="1">
           <Info/>
          </TabPane>
          <TabPane tab="推广列表" key="2">
            { '请选择推广人员' }
          </TabPane>
        </Tabs>
        </Spin>
      </div>
    </div>
  )
}
export default Details