import { createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [] ,innerHtmlBtn:"Add"};
if (localStorage.getItem("task") != null) {
  initialState.tasks = JSON.parse(localStorage.getItem("task"));
}
let todoSlice = createSlice({
  name: "todo Slice",
  initialState,
  reducers:
   {
    add: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("task", JSON.stringify(state.tasks));
      
    },
    remove: (state, action) => {
      state.tasks.splice(action.payload, 1);
      localStorage.setItem("task", JSON.stringify(state.tasks));
    },
    update: (state, action) => {
       let { index,updatedTask } = action.payload;
       state.tasks[index]=updatedTask
       localStorage.setItem("task", JSON.stringify(state.tasks));
       state.innerHtmlBtn=initialState.innerHtmlBtn;

    }
    ,setInnerHtmlBtn:(state,action)=>{
      state.innerHtmlBtn=action.payload
    }
 }
});

export let todoReducer = todoSlice.reducer;
export let { add, remove, update,setInnerHtmlBtn } = todoSlice.actions;
