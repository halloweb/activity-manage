import React,{ useState, useEffect } from 'react'
import ChartsBase from '../../components/charts-base.js'
import { Radio } from 'antd'
import Model from '../../model/index.js'
let initOption = {
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap : false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        nameTextStyle: {
            color: '#818E94'
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [],
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
            color: '#33C534',
            width: 4
        }
    }]
}
function ActiveUser () {
    const [option,setOption] = useState(initOption)
    const [data,setData] = useState([])
    const [average,setAverage] = useState(0)
    const [selected,setSelect] = useState('dayList')
    const [optChange,setOptChange] = useState(false)
   useEffect(() => {
     Model.getUserLoginCount()
       .then(({data}) => {
           if(data.status === 200) {
               setData(data.data)
               changeData({d:data.data})
           }
       }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   const changeData = ({d,s}) => {
    let datas = d || data
    let opt = option
    opt.series[0].data = datas[s||selected].map(v => v.dayCount === undefined ? v.monthCount : v.dayCount )
    let total = opt.series[0].data.reduce((t,v) => {
       t += v
       return t 
    }, 0)
    setAverage(Math.floor(total/opt.series[0].data.length))
    setOption(opt)
    setOptChange(!optChange)
   }
   const changeHandler = (v) => {
      setSelect(v.target.value)
      changeData({s:v.target.value})
   }
   return (
       <div className="active-user">
       <div className="topBar">
           <div className="title">活跃用户量</div>
           <Radio.Group defaultValue="dayList" onChange={changeHandler} buttonStyle="solid">
            <Radio.Button value="dayList"> DAY </Radio.Button>
            <Radio.Button value="monthList">MONTH</Radio.Button>
           </Radio.Group>
       </div>
         <div style={{flex: 1}}>
           <ChartsBase optChange={optChange} option={option}/>
         </div>
       <div className="bottom">
          {/* <div>单{selected}{selected}活：760,000</div> */}
          <div>平均{selected === 'monthList'? '月': '日' }活：{average}</div>
       </div>
       </div>
   )
}
export default  ActiveUser