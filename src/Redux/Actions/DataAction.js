import {
  GET_CITIES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
} from "../../Constants/Data";
const baseUrl = "https://api.openaq.org/v2/";
export const getCountriesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_COUNTRIES_REQUEST,
    });
    await fetch(`${baseUrl}countries?limit=10000`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_COUNTRIES_SUCCESS,
          payload: data,
        });
      });
  } catch (error) {
    dispatch({
      type: GET_COUNTRIES_FAIL,
      payload: error.message,
    });
  }
};
export const getLocationAction = (country) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CITIES_REQUEST,
    });
    await fetch(`${baseUrl}locations?country=${country}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_CITIES_SUCCESS,
          payload: data,
        });
      });
  } catch (error) {
    dispatch({
      type: GET_CITIES_FAIL,
      payload: error.message,
    });
  }
};
