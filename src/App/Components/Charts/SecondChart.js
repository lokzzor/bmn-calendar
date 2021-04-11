import React from 'react'
import './Chart.css';
import ReactEcharts from "echarts-for-react";
import {useDispatch, useSelector} from 'react-redux';
import {secondchartfunc} from '../../../Actions/simpleget'

const Secondchart = () => {
  const dispatch = useDispatch();
  const chart = useSelector(state => state.other.secondchart);
  React.useEffect(() => { dispatch(secondchartfunc()); 
  }, [dispatch])

  const option = {
    // backgroundColor: "rgb(43, 51, 59)",
    //                backgroundColor: "#0074e0"
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/><strong>{b}</strong>: {c} ",
    },
    color:['#fff700','#ff0000','#73e831','#b503ef','#ef8603','#691616'],
    legend: {
      icon: "circle",
      orient: 'vertical',
      left: 'right',
      data: chart.map( ({name}) => ({name}) ),
      textStyle: {
        color: "white",
        fontFamily: "Ubuntu",
        fontSize: 16.7,
        padding: [3, 3, 3, 3],
        fontStyle: "normal",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Created Rooms in the Building",
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
          show: false,
        },
        data: chart.map( ({name, value}) => ({ name, value }) ),
      },
    ],
  };

  return (
    <>
      <div className="room-event">
      <h2 className="chart-title">Building - Room</h2>
      <ReactEcharts
        lazyUpdate={true}
        option={option}
        className="sizecharts pie-chart "
      />
      </div>
    </>
  )
}
export default Secondchart;