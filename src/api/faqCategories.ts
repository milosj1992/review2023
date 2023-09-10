import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = "http://178.220.108.149:8000";

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
    }),
    faqUpdateCategory: builder.mutation({
      query: (payload) => {
        console.log(payload)
        const { id, ...body } = payload
        return {
          url: `/faq_category_id?id=${id}`,
          method: 'PUT',
          body,
        }
      }
    }),
    faqCategoryPost: builder.mutation({
      query: (post) => ({
        url: `/faq_kategorijepost`,
        method: 'POST',
        body: post,
      }),
    }),
  }),
});

// Export react hooks
export const {
  useFaqCategoryIdQuery,
  useFaqCategoryPostMutation,
  useFaqCategoryListQuery,
  useFaqUpdateCategoryMutation
} = faqCategoriesApi;
