import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  post: null,
};

export const faqCategoriesSlice = createSlice({
  initialState,
  name: 'faqCategoriesSlice',
  reducers: {
    faqCategoriesState: (state,action) => {
      state.post = action.payload;
    },
  },
});

export default faqCategoriesSlice.reducer;

export const { faqCategoriesState } = faqCategoriesSlice