import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import calendar from './calendar'
export default combineReducers({
page,
user,
calendar
})
