import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store";

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { getTodos } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.todos;

export default todoSlice.reducer;
