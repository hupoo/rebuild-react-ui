import { combineReducers,configureStore } from '@reduxjs/toolkit'
import counter from './counter'
import list from './list'


const  rootReducer = combineReducers({
  counter,list
})

const store = configureStore({
  reducer:rootReducer
})
export default store


