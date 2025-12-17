import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseurl from '../../../utils/baseURL'


const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseurl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: (builder.mutation) ({

            query: (newOrder) => ({
            url: "/",
            method: "POST",
            body: newOrder,
            credentials: 'include',
        })
        }),
        getOrderByEmail: (builder.query) ({
                query: (email) => ({
                    url: `/email/${email}`
                }),
                providesTags: ['Orders']
            
        }),
        getAllOrders: builder.query({
            query: () => "/", // This expects GET /api/orders
            providesTags: ['Orders']
        })
        
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery,  useGetAllOrdersQuery} = orderApi;

export default orderApi;