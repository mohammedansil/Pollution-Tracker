import React, {Fragment} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  zoomPlugin
);
// export const options = {
//   responsive: true,
//   plugins: {
//     title: {
//       display: true,
//       text: "Pollution Chart",
//     },
//   }
// };
const options ={
  responsive: true,
  
  // scales: {
  //   y: {
  //     min: 20,
  //     max: 80,
  //   },
  //   y2: {
  //     position: 'right',
  //     min: -5,
  //     max: 5
  //   }
  // },
  plugins: {
    title: {
      display: true,
      text: "Pollution Chart",
    },
    zoom: {
      zoom: {
        // limits: {
        //   x: {min: 'original', max: 'original', minRange: 60 * 1000},
        // },
        pan: {
          enabled: true,
          mode: 'x',
        },
        drag:{
          enabled:true,
          mode:'x'
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          drag: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
        }
      },
    },
  },
  transitions: {
    zoom: {
      animation: {
        duration: 100
      }
    }
  }
};
function Graph({ data, start, end }) {
  console.log(data);
  const Wholedata = {
    datasets: [
      {
        fill: true,
        label: "PM10 Count",
        data: data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Fragment>
      {Wholedata.datasets !== null &&
      Wholedata.datasets !== undefined &&
      Wholedata.datasets?.length > 0 ? (
        <Line options={options} data={Wholedata}/>
      ) : (
        <p>Let me fetch the data</p>
      )}
      
    </Fragment>
  );
}

export default Graph;
