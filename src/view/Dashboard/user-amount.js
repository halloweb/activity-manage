import React, { useState, useEffect } from "react";
import ChartsBase from "../../components/charts-base.js";
import Model from "../../model";
let initOption = {
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
      data: [400, 400, 400, 400, 400, 400, 400]
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
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
};

function UserAmount() {
  const [option, setOption] = useState(initOption);
  useEffect(() => {});
  return (
    <div className="voucherUse">
      <div className="title"> 总用户量 </div>
      <div className="subTitle"> 共100人 </div>
      <div
        style={{
          flex: 1
        }}
      >
        <ChartsBase option={option} />
      </div>
    </div>
  )
}
export default UserAmount;
