import React, { Fragment, useEffect, useState } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountriesAction,
  getLocationAction,
} from "../Redux/Actions/DataAction";
import { FaChevronDown } from "react-icons/fa";
import Graph from "../Component/Graph/Graph";
function Home() {
  const baseUrl = "https://api.openaq.org/v2";
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [countryName, setCountryName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [selectState, setSelectState] = useState(false);
  const [seaAnother, setSearAnother] = useState(false);
  const [selectCity, setSelectCity] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [averageData, setAverageData] = useState([]);
  const { Data } = useSelector((state) => state.Country);
  const { cityData } = useSelector((state) => state.City);
  useEffect(() => {
    dispatch(getCountriesAction());
  }, []);
  useEffect(() => {
    if (country.length > 0) {
      dispatch(getLocationAction(country));
    }
  }, [country]);
  function getAverageData() {
    const url = "https://api.openaq.org/v2/averages";
    fetch(
      `${url}?date_from=${startDate}&date_to=${endDate}&country=${country}&limit=1000&page=1&offset=0&sort=desc&location=${city}&group=false`
    )
      .then((res) => res.json())
      .then((averages) => {
        setAverageData(averages);
      });
  }
  return (
    <Fragment>
      <div className={style.Container}>
        <div className={style.Section}>
          <div className={style.InputSections}>
            <div className={style.Selection}>
              <label htmlFor="">Select Country</label>
              <div
                className={`${style.input} ${style.selectInput}`}
                onClick={() => {
                  selectState ? setSelectState(false) : setSelectState(true);
                  selectCity ? setSelectCity(false) : setSelectCity(false);
                }}
              >
                {countryName ? (
                  <input
                    type="text"
                    readOnly
                    value={countryName}
                    className={style.StateSelect}
                  />
                ) : (
                  <input
                    type="text"
                    readOnly
                    className={style.StateSelectCenter}
                    placeholder="Click to view Countries"
                  />
                )}

                <FaChevronDown />
              </div>
              {selectState === true && seaAnother === false ? (
                <div className={style.allStateContainer}>
                  <div
                    className={style.overlay}
                    onClick={() => {
                      setSelectState(false);
                    }}
                  ></div>
                  <div className={selectState ? style.AllState : style.stateUp}>
                    {Data &&
                      Data.map((stateItem) => {
                        return (
                          <input
                            type="text"
                            id="state"
                            name={stateItem.code}
                            readOnly
                            value={stateItem.name}
                            onClick={(e) => {
                              // setSelectCity(false)
                              setSelectState(false);
                              setCountry(e.target.name);
                              setCountryName(e.target.value);
                            }}
                          />
                        );
                      })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={style.Selection}>
              <label htmlFor="">Select City</label>
              <div
                className={`${style.input} ${style.selectInput}`}
                onClick={() => {
                  selectCity ? setSelectCity(false) : setSelectCity(true);
                  selectState ? setSelectState(false) : setSelectState(false);
                }}
              >
                {city ? (
                  <input
                    type="text"
                    readOnly
                    value={city}
                    className={style.StateSelect}
                  />
                ) : (
                  <input
                    type="text"
                    readOnly
                    className={style.StateSelectCenter}
                    placeholder="Click to view Cities"
                  />
                )}
                <FaChevronDown />
              </div>
              {country.length === 0 && selectCity === true ? (
                <div className={style.AllState}>
                  <input
                    type="text"
                    readOnly
                    value={"Please Select a country"}
                    className={style.StateSelect}
                  ></input>
                </div>
              ) : (
                ""
              )}
              {selectCity === true && seaAnother === false ? (
                <div className={style.allStateContainer}>
                  <div
                    className={style.overlay}
                    onClick={() => {
                      setSelectCity(false);
                    }}
                  ></div>

                  <div className={selectCity ? style.AllState : style.stateUp}>
                    {cityData &&
                      cityData
                        .filter((data) => data.country === country)
                        .map((city) => {
                          return (
                            <input
                              type="text"
                              id="state"
                              name={city.id}
                              readOnly
                              value={`${city.name}`}
                              onClick={(e) => {
                                setSelectCity(false);
                                setCity(e.target.value);
                                setCityCode(e.target.name);
                              }}
                            />
                          );
                        })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={style.dateSelection}>
              <label htmlFor="">From Date</label>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className={style.dateSelection}>
              <label htmlFor="">To Date</label>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
          </div>
          {country.length > 0 &&
          city.length > 0 &&
          startDate.length > 0 &&
          endDate.length > 0 &&
          seaAnother === false ? (
            <div className={style.fetchButtons}>
              <button
                onClick={() => {
                  getAverageData();
                  setCity("");
                  setSearAnother(true);
                }}
              >
                Show Data
              </button>
            </div>
          ) : (
            ""
          )}
          {country.length > 0 &&
          startDate.length > 0 &&
          endDate.length > 0 &&
          seaAnother === true ? (
            <div className={style.fetchButtons}>
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                See Another Data
              </button>
            </div>
          ) : (
            ""
          )}
          {averageData.results !== null &&
          averageData.results !== undefined &&
          averageData.results.length >= 0 ? (
            <div className={style.GraphSection}>
              <Graph
                data={averageData.results}
                start={startDate}
                end={endDate}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
