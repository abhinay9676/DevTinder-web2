import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [], // ✅ Fix: Ensure it's an array instead of null
  reducers: {
    addRequest: (state, action) => {
      return action.payload; // ✅ Make sure action.payload is an array
    },
    removeUserRequest: (state, action) => {
        console.log("Removing User ID:", action.payload); 
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addRequest, removeUserRequest } = requestSlice.actions;

export default requestSlice.reducer;
