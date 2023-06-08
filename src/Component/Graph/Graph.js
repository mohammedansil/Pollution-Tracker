import React, { Fragment, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
function Graph({ data, start, end }) {
  const options = {
    chart: {
      title: "Pollution Tracking",
      subtitle: `Pollution Tracking From: ${start.split("-")[0]} - ${
        end.split("-")[0]
      }`,
    },
    explorer: {
      actions: ["dragToZoom", "rightClickToReset"],
      axis: "horizontal",
      keepInBounds: true,
      maxZoomIn: 8.0,
    },
  };
  const [dataArray, setDataArray] = useState([["Year", "Pollution"]]);
  function addValues() {
    data !== null &&
      data !== undefined &&
      data.length > 0 &&
      data.forEach((item) => {
        setDataArray((dataArray) => [...dataArray, [item.day, item.average]]);
      });
  }
  useEffect(() => {
    addValues();
  }, [data]);
  return (
    <Fragment>
      {dataArray !== null && dataArray !== undefined && dataArray.length > 1 ? (
        <Chart
          chartType="Line"
          height="400px"
          data={dataArray}
          options={options}
        />
      ) : data !== null && data !== undefined && data.length === 0 ? (
        <p>Sorry! Data not Available, Please select another Dates</p>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default Graph;
