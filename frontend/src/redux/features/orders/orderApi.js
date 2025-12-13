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
            
        })
        
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery} = orderApi;

export default orderApi;