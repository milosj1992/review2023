import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../urlForAPis';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';

const baseQuerySingle = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.userToken as string;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  },
});

const baseQueryWithReauth =async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuerySingle(args, api, extraOptions);
  if ((result?.data as { statusCode?: number })?.statusCode === 401) {
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


export const {
  useFaqCategoryIdQuery,
  useFaqAddCategoryMutation,
  useFaqCategoryListQuery,
  useFaqUpdateCategoryMutation,
  useFaqDeleteCategoryMutation,
} = faqCategoriesApi;
