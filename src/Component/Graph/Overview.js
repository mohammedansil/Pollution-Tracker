import React, { Fragment, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

function Overview({data}) {
    useEffect(()=>{
        data.map((item)=>{
            if(item[1]<0){
                console.log(item[0])
                console.log(item[1])
            }
        })
    },[])
  const options = {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
        label:{
            title:"Date"
        },
        type: 'datetime',
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
  }
  const series = [{
    name: 'Pollution Value',
    data: data
  }]
  return (
    <Fragment>
      <ReactApexChart options={options} series={series} type="area" />
    </Fragment>
  )
}

export default Overview