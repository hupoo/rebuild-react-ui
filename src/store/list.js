import { createSlice } from '@reduxjs/toolkit'

const list = createSlice({
  name:'list',
  initialState:[],
  reducers:{
    addTodo: (state,action) => {
      let { id, text } = action.payload;
      state.push({id,text,completed: false})
    },
    toggleTodo: (state,action) => {
      const todo  = state.find(todo => todo.id === action.payload.id);
      if(todo){
        todo.completed = !todo.completed;
      }
    }
  }
})
export const { addTodo,toggleTodo}  = list.actions
export default list.reducer