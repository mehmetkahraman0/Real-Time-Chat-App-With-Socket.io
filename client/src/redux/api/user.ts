import {apiSlice} from "./apiSlice.ts";
import {USER_URL} from "../constants.ts";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRegister: builder.mutation({
            query:(data) => ({
                url : `${USER_URL}/register`,
                method: "POST",
                body:data
            }),
        }),
        userLogin: builder.mutation({
            query : (data) => ({
                url: `${USER_URL}/login`,
                method: "POST",
                body:data,
                credentials: "include"
            }),
        }),
        currentUserLogout: builder.mutation({
            query : () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
                credentials: "include"
            })
        }),
        currentUserUpdate: builder.mutation({
            query:(data) => ({
                url: `${USER_URL}/update`,
                method: "PUT",
                body:data
            })
        }),
        getAllUsers: builder.query ({
            query : () => ({
                url: `${USER_URL}/users`,
            })
        }),
        getCurrentUser: builder.query ({
            query: () => ({
                url: `${USER_URL}/users`,
            })
        }),
        getUserById: builder.query ({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
            }),
        })
    })
})

export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useCurrentUserLogoutMutation,
    useCurrentUserUpdateMutation,
    useGetAllUsersQuery,
    useGetCurrentUserQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
} = userApiSlice;