import { useCallback } from 'react';
import {
  useFaqAddCategoryMutation,
  useFaqDeleteCategoryMutation,
  useFaqUpdateCategoryMutation,
} from '../api/faqCategories';
import { useNavigate } from 'react-router-dom';

interface CategoryData {
  id?: number | null;
  title: string;
  language: string;
  listOrder?: number;
}

const useCategory = () => {
  const navigate = useNavigate();

  const [FaqAddCategory] = useFaqAddCategoryMutation();
  const [faqDeleteCategory] = useFaqDeleteCategoryMutation();
  const [faqUpdateCategory] = useFaqUpdateCategoryMutation();

  const addCategory = useCallback(
    async (data: CategoryData) => {
      const { title, language, listOrder } = data;
      const result = await FaqAddCategory({
        title,
        language,
        listOrder,
      }).unwrap();

      if (result != null) {
        navigate('/faq-category');
      }
    },
    [FaqAddCategory, navigate],
  );
  const editCategory = useCallback(
    async (data: CategoryData) => {
      const { id, title } = data;
      const result = await faqUpdateCategory({
        id,
        title,
      }).unwrap();

      if (result != null) {
        navigate('/faq-category');
      }
    },
    [faqUpdateCategory, navigate],
  );
  const deleteCategory = useCallback(
    async (id: number) => {
      const data = await faqDeleteCategory(id).unwrap();
      if (data != null) {
        return true;
      }
    },
    [FaqAddCategory, navigate],
  );

  return { addCategory, deleteCategory, editCategory };
};
export default useCategory;
