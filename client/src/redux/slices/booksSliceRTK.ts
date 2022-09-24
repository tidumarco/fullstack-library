import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { Book } from 'types'

export const booksApi = createApi({
	reducerPath: 'booksApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'localhost:4000/api/v1'}),
	endpoints: (builder) => ({
		getBookByTitle: builder.query<Book, string>({
			query: (title) => `books/${title}`,
		}),
	}),
})

export const {useGetBookByTitleQuery} = booksApi