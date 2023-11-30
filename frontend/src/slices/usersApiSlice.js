import {USERS_URL} from "../utils/constants";
import { apiSlice} from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method: "POST",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                credentials: "include",
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
                credentials: "include",
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: 'PUT',
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useAddUserMutation, useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation, useLoginMutation, useLogoutMutation} = usersApiSlice;

