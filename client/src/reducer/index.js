import { combineReducers } from 'redux'
import authState from '../components/Auth/reducer'

const rootReducer = combineReducers({ authState })

export default rootReducer
