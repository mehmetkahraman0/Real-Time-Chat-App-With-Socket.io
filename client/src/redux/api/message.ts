import {apiSlice} from "./apiSlice.ts";
import {MESSAGE_URL} from "../constants.ts";

const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    getMessage: builder.query({
        query:(id) => ({
            url:`${MESSAGE_URL}/${id}`
        })
    })
    })
})

export const {useGetMessageQuery, useLazyGetMessageQuery} = messageApiSlice