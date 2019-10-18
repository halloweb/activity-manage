import React,{ useEffect, useState, useRef } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import './chart.scss'
function ChartsBase (props) {
    const ChartEl = useRef(null)
    const [myChart,setChart] = useState(null)
    useEffect(() => {
        let chart = echarts.init(ChartEl.current)
        setChart(chart)
        props.option && chart.setOption(props.option)
        window.addEventListener('resize', () => {
            chart.resize()
        })
    },[props.option])
    useEffect(() => {
        myChart && myChart.setOption(props.option)
    },[myChart, props.option])
    return (
        <div className="chart-base" ref={ChartEl}></div>
    )
}
export default ChartsBase