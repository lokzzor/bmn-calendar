import React from 'react'
import './Chart.css';
import ReactEcharts from "echarts-for-react";
import {useDispatch, useSelector} from 'react-redux';
import {firstchartfunc} from '../../../Actions/simpleget'

const Firstchart = () => {
  const dispatch = useDispatch();
  const chart = useSelector(state => state.other.firstchart);
  React.useEffect(() => { dispatch(firstchartfunc()); 
  }, [dispatch])
 
  const options = {
      // backgroundColor: "rgb(43, 51, 59)",
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/><strong>{b}</strong>: {c} ",
      },
      color:['#73e831','#ff0000','#fff700','#b503ef','#ef8603','#691616'],
      legend: {
        icon: "circle",
        orient: 'vertical',
        left: 'right',
        
        itemGap: 13.5,
        data: chart.map( ({name}) => ({name}) ),
        textStyle: {
          color: "white",
          fontFamily: "Ubuntu",
          fontSize: 17,
          padding: [3, 3, 3, 3],
          fontStyle: "normal",
          fontWeight: "bold",
        },
      },
      series: [
        {
          name: "Series Name",
          type: "pie",
          animationDuration: 3000,
          animationEasing: "quarticInOut",
          radius: ["23%", "95%"],
          fontSize: 14,
          avoidLabelOverlap: false,
          startAngle: 90,
          hoverOffset: 5,
          center: ["50%", "50%"],
          roseType: "area",
          selectedMode: "multiple",
          label: {
            paddingTop:'120px',
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          data: chart.map( ({name, value}) => ({ name, value }) ),
        },
      ],
  };

  return (
    <>
      <div className="chart-state">
        <h2 className="chart-title">Room - Event</h2>
          <ReactEcharts
          option={options}
          lazyUpdate={true}
          className="sizecharts pie-chart "
        />
      </div>
    </>
  )
}
export default Firstchart;