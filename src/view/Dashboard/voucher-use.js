import React,{ useState, useEffect } from 'react'
import ChartsBase from '../../components/charts-base.js'
import Model from '../../model'
const colorList = ['#00C5DC','#FFB822','#716ACA','#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB']
let initOption = {
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}:({d}%)"
  },
  legend: {
      orient: 'vertical',
      right: '10%',
      top:'middle',
      icon: 'circle',
      align: 'left',
      textStyle: {
          color: '#9290B1',
      },
      data:[]
  },
  series: [
    {
        name:'使用人数比例',
        type:'pie',
        hoverAnimation:false,
        legendHoverLink: false,
        center: ['25%', '50%'],
        radius: ['50%', '80%'],
        label: {
            normal: {
                show: true,
                position: 'center',
                color: 'rgba(217, 214, 225, 1)',
                fontSize: 28
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        itemStyle: {
            color:'rgba(0,0,0,0)'
        },
        data:[]
      },
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
                  show: false,
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
          data:[]
      }
  ]
}
function VoucherUse () {
   const [option,setOption] = useState(initOption)
   const [data,setData] = useState(initOption)
   const [optChange,setOptChange] = useState(false)
   useEffect(() => {
     Model.voucherUse()
       .then(({data}) => {
           if (data.status === 200) {
               setData(data.data)
               let opt = option
               let result = data.data.list.reduce((t,v) => {
                               if (v.useNumber) {
                                t[0].push(`${v.title}`)        
                                t[1].push({value: v.useNumber, name: v.title})
                               }
                               return t     
                             },[[],[]])
                opt.legend.data = result[0]
                opt.legend.formatter = function(name) {
                    let item = data.data.list.find(v => v.title === name)
                    return `${name} ${item.useRate}`
                }
                opt.series[1].data = result[1]    
                opt.series[0].data = [{value: data.data.usedVoucherUserCount,name:`${(data.data.usedVoucherUserCount/data.data.voucherUserCount*100).toFixed(2)}%`},{value: data.data.voucherUserCount - data.data.usedVoucherUserCount,name: '' }]  
                setOption(opt)
                setOptChange(!optChange)
           }
       })
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   return (
       <div className="voucherUse">
         <div className="title">代金劵使用比例</div>
         <div className="subTitle">共{data.usedVoucherUserCount}人</div>
         <div style={{flex: 1}}>
           <ChartsBase optChange={optChange} option={option}/>
         </div>
       </div>
   )
}
export default  VoucherUse