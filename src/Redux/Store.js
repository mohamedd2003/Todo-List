import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./TodoSlice";

 export let todoStore=configureStore(
    {
        reducer:{
            todo:todoReducer
        }
    }
)