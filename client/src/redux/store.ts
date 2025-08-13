import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice.tsx";
import {apiSlice} from "./api/apiSlice.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer:{
    [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.dispatch>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
export default store