import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { CityReducer, CountryReducer } from "./Reducers/DataReducer";

const reducers = combineReducers({
  Country: CountryReducer,
  City: CityReducer,
});
const middleware = [thunk];
const InitialState = {};
const store = createStore(
  reducers,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
