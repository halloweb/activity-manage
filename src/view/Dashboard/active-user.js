import React,{ useState, useEffect } from 'react'
import ChartsBase from '../../components/charts-base.js'
import { Radio } from 'antd'
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
        data: [820, 932, 901, 934, 1290, 1330, 1320],
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
   useEffect(() => {
      
   })
   const changeHandler = (v) => {

   }
   return (
       <div className="active-user">
       <div className="topBar">
           <div className="title">活跃用户量</div>
           <Radio.Group defaultValue="DAY" onChange={changeHandler} buttonStyle="solid">
            <Radio.Button value="DAY"> DAY </Radio.Button>
            <Radio.Button value="MONTH">MONTH</Radio.Button>
           </Radio.Group>
       </div>
         <div style={{flex: 1}}>
           <ChartsBase option={option}/>
         </div>
       <div className="bottom">
          <div>单日日活：760,000</div>
          <div>平均日活：30,000</div>
       </div>
       </div>
   )
}
export default  ActiveUser