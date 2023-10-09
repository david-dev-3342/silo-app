import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
const Reducers = combineReducers({
  userReducer: UserReducer,
});

export default Reducers;
