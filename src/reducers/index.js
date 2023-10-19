import { combineReducers } from 'redux';
import CategorysReducer from './categorys';
import FashionsReducer from './fashions';
import AuthReducer from './auth';
import OrderReducer from './order';

export default combineReducers({
    CategorysReducer,
    FashionsReducer,
    AuthReducer,
    OrderReducer
})