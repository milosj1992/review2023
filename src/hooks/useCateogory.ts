import { useCallback } from 'react';
import {
  useFaqAddCategoryMutation,
  useFaqDeleteCategoryMutation
} from '../api/faqCategories';
import { useNavigate } from 'react-router-dom';

const useCategory = () => {
  const navigate = useNavigate();
  const [FaqAddCategory] = useFaqAddCategoryMutation();
  const [faqDeleteCategory] = useFaqDeleteCategoryMutation();
  
  const addCategory = useCallback(
    async ({ title, language, listOrder }) => {
      const data = await FaqAddCategory({
        title,
        language,
        listOrder,
      }).unwrap();
      if (data != null) {
        //if update success
        navigate('/faq-category');
      }
    },
    [FaqAddCategory, navigate],
  );
  const deleteCategory = useCallback(
    async (id) => {
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
