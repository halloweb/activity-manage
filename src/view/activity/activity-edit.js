import React, { useState } from 'react'
import { Radio, Icon, message } from 'antd'
import ActivityInfo from './activity-info'
import CategoryList from './category-list'
import Model from '../../model'
import './style.scss'
const tableHead = ['头像', '名称', '描述', '参与商户', '开始日期', '终止日期', '剩余天数']
function ActivityEdit() {
  const [dataList, setDataList] = useState([])
  const [active, setActive] = useState({})
  const [orderBy, setorderBy] = useState('最新')
  const [updateList, setUpdateList] = useState(0)
  const [categoryId, setCategoryId] = useState(null)
  const conditionChange = (e) => {
    setorderBy(e.target.value)
    if (!dataList.length) return
    e.target.value === '最新' ? setDataList(byCreate(dataList)) : setDataList(byEnd(dataList))
  }
  const categoryChange = (item) => {
    if (!item) return
    setCategoryId(item.id)
    let list = item.children || []
    list.length ? orderBy === '最新' ? setDataList(byCreate(list)) : setDataList(byEnd(list)) : setDataList([])
    !list.length && setActive({})
  }
  const byCreate = (data) => {
    data.sort((a, b) => {
      return Number(b.createTime.replace(/-|\s|:/g, "")) - Number(a.createTime.replace(/-|\s|:/g, ""))
    })
    if (active.id) {
      let item = data.find(v => v.id === active.id)
      item ? setActive(item) : setActive({})
    }
    return data
  }
  const byEnd = (data) => {
    data.sort((a, b) => {
      return Number(a.endTime.replace(/-|\s|:/g, "")) - Number(b.endTime.replace(/-|\s|:/g, ""))
    })
    if (active.id) {
      let item = data.find(v => v.id === active.id)
      item ? setActive(item) : setActive({})
    }
    return data
  }
  const remove = (id) => {
    Model.deleteActivity({ activityId: id }).then(({ data }) => {
      if (data.status === 200) {
        message.success('删除成功')
        update()
      }  else {
        message.error(data.msg)
      }
    })
      .catch(() => message.error('删除成功'))

  }
  const update = () => {
    let Keys = updateList + 1
    setUpdateList(Keys)
  }
  return (
    <div className="active-details">
      <div className="left-panel">
        <CategoryList key={updateList} canEdit={true} showSecond={false} categoryChange={categoryChange} />
        <div className="merchant-wrap">
          <div className="title">
            <span>活动种类详情</span>
            <Radio.Group defaultValue="最新" onChange={conditionChange} buttonStyle="solid">
              <Radio.Button value="最新">最新</Radio.Button>
              <Radio.Button value="临结">临结</Radio.Button>
            </Radio.Group>
          </div>
          <div className="table-wrap">
            <table className="com-table">
              <thead>
                <tr>
                  {
                    tableHead.map((item, index) => (<th key={index}>{item}</th>))
                  }
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  dataList.length ? dataList.map(item => (
                    <tr className={`${(active && item.id === active.id) ? 'active' : null}`} key={item.id} onClick={() => setActive(item)}>
                      <td><img src={item.activityIcon} /></td>
                      <td>{item.activityName}</td>
                      <td>{item.activityDesc}</td>
                      <td>{item.businessCount}</td>
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                      <td>{item.remainingDays}</td>
                      <td><Icon onClick={() => remove(item.id)} type="close" /></td>
                    </tr>
                  )) : (<tr>
                    <td colSpan="8">暂无数据</td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ActivityInfo update={update} categoryId={categoryId} info={active} />
    </div>
  )
}
export default ActivityEdit