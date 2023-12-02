import * as React from 'react';
import TodoList from '../TodoList/TodoList';
import { Provider } from 'react-redux';
import { todoStore } from '../../Redux/Store';

export default function App() {
  return (
   <>
   <Provider store={todoStore}>

  <TodoList/>

   </Provider>
   </>
  )
}
