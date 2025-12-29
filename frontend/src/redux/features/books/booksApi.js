import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseurl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseurl()}/api/books`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        
        fetchAllBooks: builder.query({
            query: (searchTerm) => {
                return searchTerm ? `/?search=${searchTerm}` : "/";
            },
            providesTags: ["Books"]
        }),

        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),

        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),

        UpdateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Books"]
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"]
        }),

        // --- NEW: Post Review Mutation ---
        postReview: builder.mutation({
            query: ({ id, ...reviewData }) => ({
                url: `/${id}/reviews`,
                method: "POST",
                body: reviewData,
            }),
            // Specific invalidation: Only refetch the book that was reviewed
            invalidatesTags: (result, error, { id }) => [{ type: "Books", id }],
        })
    })
})

export const { 
    useFetchAllBooksQuery, 
    useFetchBookByIdQuery, 
    useAddBookMutation, 
    useUpdateBookMutation, 
    useDeleteBookMutation,
    usePostReviewMutation // <--- Export the new hook
} = booksApi;

export default booksApi;