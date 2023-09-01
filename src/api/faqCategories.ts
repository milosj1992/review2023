import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = "http://93.86.190.139:8000";

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
    faqCategoryLang: builder.query({
      query: (queryParams) => ({
        url: `/faq_kategorije`,
        method: 'GET',
        params: queryParams,
      }),
    }),
    faqCategory: builder.query({
      query: ({lang,page,rowsPerPage}) => ({
        url: `/faq_kategorije?lang=${lang}&page=${page}&rowsPerPage=${rowsPerPage}`,
      }),
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
  useFaqCategoryLangQuery,
  useFaqCategoryPostMutation,
  useFaqCategoryQuery
} = faqCategoriesApi;
