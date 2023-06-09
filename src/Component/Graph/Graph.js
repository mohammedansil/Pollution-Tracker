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
export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Pollution Chart",
    },
  }
};
function Graph({ data, start, end }) {
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
      Wholedata.datasets.length > 0 ? (
        <Line options={options} data={Wholedata}/>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default Graph;
