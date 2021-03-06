import React,{ useState } from 'react'
import { Radio, Pagination, Tabs, Spin, message } from 'antd'
import Info from './info'
import Auth from './auth'
import CategoryList from '../category-list'
import Model from '../../../model'
import '../style.scss'
const { TabPane } = Tabs
const tableHead = ['头像','名称','描述']
function Details() {
  const [dataList,setDataList] = useState([])
  const [active,setActive] = useState()
  const [categoryId,setCategoryId] = useState(null)
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
    let params = Object.assign({},{activityId:categoryId,page:num || pageNum,pageSize: 10,orderBy:orderBy},data)
    Model.getUsers(params)
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
  const categoryChange = (id) => {
    if (id) {
      setCategoryId(id)
      pageChange(1,{activityId:id})
    } else {
      message.warning('该类型下目前没有活动')
    }
  }
  return (
    <div className="active-details">
      <div className="left-panel">
         <CategoryList type="1" secondChange={categoryChange}/>
         <div className="merchant-wrap">
           <div className="title">
             <span>活动参与方</span>
             <Radio.Group defaultValue="buyVoteIncome" onChange={changeHandler} buttonStyle="solid">
              <Radio.Button value="buyVoteIncome">最多收入</Radio.Button>
              <Radio.Button value="registerDate">最新加入</Radio.Button>
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
                       <td>{item.username}</td>
                       <td>{item.description}</td>
                     </tr>
                   )) : (<tr>
                           <td colSpan="8">暂无数据</td>
                        </tr>)
                 }
              </tbody>
            </table>
           </div>
           <div className="Pagination-wrap">
             <Pagination size="small" current={pageNum} onChange={pageChange} total={total} showTotal={() => `共 ${total} 条`} />
           </div>
           </Spin>
         </div>
      </div>
      <div className="aside-panel">
      <Spin spinning={loading} >
        <Tabs defaultActiveKey="1"  tabBarGutter={95} >
          <TabPane tab="信息" key="1">
            {active ? <Info pageChange={pageChange}  info={active}/> : '请选择活动参与者' }
          </TabPane>
          <TabPane tab="认证" key="2">
            {active ? <Auth pageChange={pageChange}  info={active}/> : '请选择活动参与者' }
          </TabPane>
        </Tabs>
      </Spin>
      </div>
    </div>
  )
}
export default Details