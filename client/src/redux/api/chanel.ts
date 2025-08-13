import {apiSlice} from "./apiSlice.ts";
import {CHANEL_URL} from "../constants.ts";


export const chanelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createChanel : builder.mutation  ({
            query : (data) => ({
                url:`${CHANEL_URL}/create`,
                method:"POST",
                body:data,
            }),
        }),
        updateChanel : builder.mutation({
            query : ({data, id}) => ({
                url:`${CHANEL_URL}/${id}`,
                method:"PUT",
                body:data,
            }),
        }),
        deleteChanel : builder.mutation({
            query : (id) => ({
                url:`${CHANEL_URL}/${id}`,
                method:"DELETE",
            }),
        }),
        getAllChanel : builder.query({
            query : () => ({
                url:`${CHANEL_URL}`,
            }),
        }),
        getChanel : builder.query({
            query : (id) => ({
                url:`${CHANEL_URL}/${id}`,
            }),
        }),
        getChanelByUser : builder.query({
            query:() => ({
                url:`${CHANEL_URL}/joinedChanel`,
            })
        })
    })
})

export const {
    useCreateChanelMutation,
    useUpdateChanelMutation,
    useDeleteChanelMutation,
    useGetAllChanelQuery,
    useGetChanelByUserQuery,
    useGetChanelQuery} = chanelApiSlice;