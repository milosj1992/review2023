import { useSearchParams } from 'react-router-dom';

import {
  useFaqCategoryIdQuery,
  useFaqUpdateCategoryMutation,
} from '../services/api/faqCategories';
import TableReusableCategory from './TableReusableCategory';

const TableOne = () => {
  const [serchParams] = useSearchParams();
  const id = serchParams.get('id');
  const [faqUpdateCategory] = useFaqUpdateCategoryMutation();

  const { data } = useFaqCategoryIdQuery(id);

  const getFields = ({ title }: { title: string }) => {
    faqUpdateCategory({ id, title });
  };

  return (
    <div>
      TableAddCategory
      <TableReusableCategory onSubmit={getFields} data={data} />
    </div>
  );
};
export default TableOne;
