import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice.tsx";
import {apiSlice} from "./api/apiSlice.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import selectedSlice from "./app/selectedSlice.tsx";
const store = configureStore({
    reducer:{
    [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authSlice,
        selected: selectedSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
export default store