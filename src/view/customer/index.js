import React,{ useState } from 'react'
import { Radio, Pagination, Tabs, Spin, message } from 'antd'
import Model from '../../model'
const { TabPane } = Tabs
const tableHead = ['头像','名称','性别','总投票次数','活动参与次数','代金券使用次数','代金劵减免总额' ]
function Customer() {
  const [dataList,setDataList] = useState([])
  const [orderBy,setOrderBy] = useState('buyVoteIncome')
  const [total,setTotal] = useState(0)
  const [pageNum,setNum] = useState(0)
  const [loading,setLoading] = useState(false)
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
        }
      })
      .finally(() => setLoading(false))
  }
  return (
    <div className="active-details">
      <div className="left-panel">
         <div className="merchant-wrap" style={{marginTop: 0}}>
           <div className="title">
             <span>用户信息</span>
             <Radio.Group defaultValue="buyVoteIncome" onChange={changeHandler} buttonStyle="solid">
              <Radio.Button value="buyVoteIncome">无消费用户</Radio.Button>
              <Radio.Button value="registerDate">消费用户</Radio.Button>
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
                     <tr key={item.userid}>
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
             <Pagination size="small" onChange={pageChange} total={total} showTotal={() => `共 ${total} 人`} />
           </div>
           </Spin>
         </div>
      </div>
    </div>
  )
}
export default Customer