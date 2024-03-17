import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import messageReducer from './messageSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
