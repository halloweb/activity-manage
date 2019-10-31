import React, { useState, useEffect } from "react";
import ChartsBase from "../../components/charts-base.js";
import Model from "../../model";
let initOption = {
  xAxis: {
    type: "category",
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false
    },
    show: false
  },
  series: [
    {
      type: "bar",
      itemStyle: {
        normal: {
          color: "#F3F3FB",
          barBorderRadius: [10, 10, 10, 10]
        }
      },
      silent: true,
      barWidth: 20,
      barGap: "-100%", // Make series be overlap
      data: []
    },
    {
      name: "用户量",
      type: "bar",
      barWidth: 20,
      label: {
        show: true,
        position: "top"
      },
      itemStyle: {
        barBorderRadius: [10, 10, 10, 10],
        color: "#34BFA3"
      },
      data: []
    }
  ]
};

function UserAmount() {
  const [option, setOption] = useState(initOption);
  const [total, setTotal] = useState(0);
  const [optChange, setOptChange] = useState(initOption);
  useEffect(() => {
    Model.getAllUserCount()
      .then(({data}) => {
        if(data.status === 200) {
          setTotal(data.data.totalUserCount)
          let opt = option
          let max = 0
          opt.xAxis.data = []
          data.data.dayList.forEach(v => {
            opt.xAxis.data.push(v.dayTag.slice(8))
            opt.series[1].data.push(v.dayCount)
            max = Math.max(max,v.dayCount)
          })
          opt.series[0].data.length = data.data.dayList.length
          opt.series[0].data.fill(max)
          setOption(opt)
          setOptChange(!optChange)
        }
      }) 
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="voucherUse">
      <div className="title"> 总用户量 </div>
      <div className="subTitle"> 共{total}人 </div>
      <div
        style={{
          flex: 1
        }}
      >
        <ChartsBase optChange={optChange} option={option} />
      </div>
    </div>
  )
}
export default UserAmount;
