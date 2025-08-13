import {apiSlice} from "./apiSlice.ts";
import {MESSAGE_URL} from "../constants.ts";

const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    getMessage: builder.query({
        query:() => ({
            url:`${MESSAGE_URL}`
        })
    })
    })
})

export const {useGetMessageQuery} = messageApiSlice