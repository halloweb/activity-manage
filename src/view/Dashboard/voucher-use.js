import React,{ useState, useEffect } from 'react'
import ChartsBase from '../../components/charts-base.js'
import Model from '../../model'
const colorList = ['#00C5DC','#FFB822','#716ACA','#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB']
let initOption = {
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      right: '20%',
      top:'middle',
      icon: 'circle',
      align: 'left',
      textStyle: {
          color: '#9290B1',
      },
      data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
  },
  series: [
      {
          name:'代金劵使用比例',
          type:'pie',
          center: ['25%', '50%'],
          radius: ['50%', '80%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: true,
                  formatter: "{b}\n{d}%",
                  textStyle: {
                      fontSize: '16',
                      fontWeight: 'bold'
                  }
              }
          },
          itemStyle: {
               color: function(params) {
                      return colorList[params.dataIndex]
                  }
          },
          labelLine: {
              normal: {
                  show: true
              }
          },
          data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
          ]
      }
  ]
}
function VoucherUse () {
   const [option,setOption] = useState(initOption)
   useEffect(() => {
      
   })
   return (
       <div className="voucherUse">
         <div className="title">代金劵使用比例</div>
         <div className="subTitle">共100人</div>
         <div style={{flex: 1}}>
           <ChartsBase option={option}/>
         </div>
       </div>
   )
}
export default  VoucherUse