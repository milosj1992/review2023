import { useCallback } from 'react';
import {
  useFaqAddCategoryMutation,
  useFaqDeleteCategoryMutation,
} from '../api/faqCategories';
import { useNavigate } from 'react-router-dom';

interface CategoryData {
  title: string;
  language: string;
  listOrder: number;
}

const useCategory = () => {
  const navigate = useNavigate();
  
  const [FaqAddCategory] = useFaqAddCategoryMutation();
  const [faqDeleteCategory] = useFaqDeleteCategoryMutation();

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
  const deleteCategory = useCallback(
    async (id: number) => {
      const data = await faqDeleteCategory(id).unwrap();
      if (data != null) {
        return true;
      }
    },
    [FaqAddCategory, navigate],
  );

  return { addCategory, deleteCategory };
};
export default useCategory;
