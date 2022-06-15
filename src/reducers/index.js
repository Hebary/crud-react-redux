import {combineReducers} from 'redux';
//Here i import all  reducers.
import productsReducer from "./productsReducer"
import alertReducer from "./alertReducer"

export default combineReducers({
    products: productsReducer,
    alert: alertReducer
});