import player from './player'
import auth from './auth'
import {reducer as formReducer} from 'redux-form'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  player,
  auth,
  form: formReducer
});

export default rootReducer;

