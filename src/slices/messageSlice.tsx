import { createSlice } from "@reduxjs/toolkit";

export interface State {
  message: String
}
const initialState: State = {
  message: ''
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers:{
    setMessage: (state, action) => {
        return {message: action.payload}
    },
    clearMessage: () => {
        return {message: ''}
    }
  },
  
});

export const {setMessage, clearMessage} = messageSlice.actions;
export default messageSlice.reducer;
