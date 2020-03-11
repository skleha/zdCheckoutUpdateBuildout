import { combineReducers } from 'redux';
import SupportReducer from './support_reducer';

const rootReducer = combineReducers({
  support: SupportReducer,

});

export default rootReducer;
