import { apiSlice } from "./apiSlice.ts";
import { CHANEL_URL } from "../constants.ts";


export const chanelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createChanel: builder.mutation({
            query: (formData) => ({
                url: `${CHANEL_URL}/create`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["getChanelByUserForCreateChanel"]
        }),
        updateChanel: builder.mutation({
            query: ({ data, id }) => ({
                url: `${CHANEL_URL}/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        addUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `${CHANEL_URL}/add/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        joinChanelWithInviteCode: builder.mutation({
            query: (data) => ({
                url: `${CHANEL_URL}/join`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["getChanelByUserForJoinWithInviteCode"]
        }),
        deleteChanel: builder.mutation({
            query: (id) => ({
                url: `${CHANEL_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        deleteUserInChanel: builder.mutation({
            query: ({ userId, id }) => ({
                url: `${CHANEL_URL}/delete/${id}`,
                method: "POST",
                body: { userId }
            }),
        }),
        deleteRoomInChanel: builder.mutation({
            query: ({ roomId, id }) => ({
                url: `${CHANEL_URL}/delete/room/${id}`,
                method: "POST",
                body: { roomId }
            }),
        }),
        getAllChanel: builder.query({
            query: () => ({
                url: `${CHANEL_URL}`,
            }),
        }),
        getChanel: builder.query({
            query: (id) => ({
                url: `${CHANEL_URL}/${id}`,
            }),
            providesTags: ["getChanelByCreateRoom"]
        }),
        getChanelByUser: builder.query({
            query: () => ({
                url: `${CHANEL_URL}/join/joinedchanel`,
            }),
            providesTags: ["getChanelByUserForJoinWithInviteCode", "getChanelByUserForCreateChanel"]
        }),
        createInviteCodeInChanel: builder.mutation({
            query: (data) => ({
                url: `${CHANEL_URL}/create/invitecode`,
                method: "POST",
                body: data,
            }),
        }),
    })
})

export const {
    useCreateChanelMutation,
    useUpdateChanelMutation,
    useAddUserMutation,
    useJoinChanelWithInviteCodeMutation,
    useDeleteChanelMutation,
    useDeleteUserInChanelMutation,
    useDeleteRoomInChanelMutation,
    useGetAllChanelQuery,
    useGetChanelByUserQuery,
    useGetChanelQuery,
    useCreateInviteCodeInChanelMutation } = chanelApiSlice;