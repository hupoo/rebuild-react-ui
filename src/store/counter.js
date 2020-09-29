import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  name:'counter',
  initialState:0,
  reducers:{
    increment: state => state + 1,
    decrement: state => state - 1
  }
})

export const { increment,decrement }  = counter.actions
export default counter.reducer