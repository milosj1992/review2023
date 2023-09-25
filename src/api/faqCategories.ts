import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../urlForAPis';

import { logout } from '../features/auth/authSlice';

const baseQuerySingle = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuerySingle(args, api, extraOptions);
  console.log(result)
  if (result?.error?.status === 401) {
    api.dispatch(logout());
    localStorage.removeItem('userToken');
  } else {
    return result;
  }
};
export const faqCategoriesApi = createApi({
  reducerPath: 'faqCategoriesApi',
  baseQuery: baseQueryWithReauth,
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
      invalidatesTags: ['CategoryList'],
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
