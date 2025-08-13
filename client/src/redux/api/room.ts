import {apiSlice} from "./apiSlice.ts";
import {ROOM_URL} from "../constants.ts";

const roomApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRoom : builder.mutation({
            query: (data) => ({
                url : `${ROOM_URL}/create`,
                method: "POST",
                body:data
            }),
        }),
        updateRoom : builder.mutation({
            query : ({data, id}) => ({
                url: `${ROOM_URL}/update/${id}`,
                method:"PUT",
                body:data
            })
        }),
        deleteRoom : builder.mutation({
            query: (id) => ({
                url: `${ROOM_URL}/delete/${id}`,
                method:"DELETE"
            })
        }),
        getAllRoom : builder.query({
            query:()=> ({
                url:`${ROOM_URL}/rooms`,
            })
        }),
        getRoomById : builder.query({
            query:(id)=> ({
                url:`${ROOM_URL}/${id}`,
            })
        }),
    })
})

export const {
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetAllRoomQuery,
    useGetRoomByIdQuery} = roomApiSlice