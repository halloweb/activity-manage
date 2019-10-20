import React,{ useState } from 'react'
import { Radio, Pagination } from 'antd'
import ActivityInfo from './activity-info'
import './style.scss'
const tableHead = ['头像','名称','描述','参与商户','开始日期','终止日期','剩余天数']
function ActivityEdit() {
  const [dataList,setDataList] = useState([])
  const [active,setActive] = useState(null)
  const changeHandler = (val) => {

  }
  const pageChange = (num) => {

  } 
  return (
    <div className="active-details">
      <div className="left-panel">
         <div className="merchant-wrap">
           <div className="title">
             <span>活动种类详情</span>
             <Radio.Group defaultValue="最新" onChange={changeHandler} buttonStyle="solid">
              <Radio.Button value="最新">最新</Radio.Button>
              <Radio.Button value="临结">临结</Radio.Button>
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
      <ActivityInfo/>
    </div>
  )
}
export default ActivityEdit