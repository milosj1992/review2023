import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../urlForAPis';

export const faqCategoriesApi = createApi({
  reducerPath: 'faqCategoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ['CategoryList'],
  endpoints: (builder) => ({
    faqCategoryId: builder.query({
      query: (id) => ({
        url: `/faq_category_id?id=${id}`,
      }),
    }),
    faqCategoryList: builder.query({
      query: ({ lang, page, rowsPerPage }) => ({
        url: `/faq_kategorije?lang=${lang}&page=${page}&rowsPerPage=${rowsPerPage}`,
      }),
      providesTags: [{ type: 'CategoryList' }],
    }),
    faqUpdateCategory: builder.mutation({
      query: (payload) => {
        // console.log(payload)
        const { id, title } = payload;
        return {
          url: `/faq_category_id`,
          method: 'PATCH',
          body: { id, title },
        };
      },
    }),
    faqAddCategory: builder.mutation({
      query: (payload) => {
        const { title, language, listOrder } = payload;
        return {
          url: `/faq_category_add`,
          method: 'POST',
          body: { title, language, listOrder },
        };
      },
    }),
    faqDeleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/faq_category_id/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['CategoryList'],
    }),
  }),
});

// Export react hooks
export const {
  useFaqCategoryIdQuery,
  useFaqAddCategoryMutation,
  useFaqCategoryListQuery,
  useFaqUpdateCategoryMutation,
  useFaqDeleteCategoryMutation,
} = faqCategoriesApi;
