import {
  GET_CITIES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
} from "../../Constants/Data";

export const CountryReducer = (state = { countryData: [] }, action) => {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST:
      return {
        loading: true,
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        loading: false,
        Data: action.payload.results,
      };
    case GET_COUNTRIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export const CityReducer = (state = { cityData: [] }, action) => {
  switch (action.type) {
    case GET_CITIES_REQUEST:
      return {
        loading: true,
      };
    case GET_CITIES_SUCCESS:
      return {
        loading: false,
        cityData: action.payload.results,
      };
    case GET_CITIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
