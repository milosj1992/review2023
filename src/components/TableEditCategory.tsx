import { useSearchParams } from 'react-router-dom';

import {
  useFaqCategoryIdQuery,
} from '../services/api/faqCategories';
import TableReusableCategory from './TableReusableCategory';
import useCateogory from '../services/hooks/useCateogory';

const TableOne = () => {
  const [serchParams] = useSearchParams();
  const id = serchParams.get('id');
  const { editCategory } = useCateogory();

  const { data } = useFaqCategoryIdQuery(id);

  const getFields = ({ title }: { title: string }) => {
    editCategory({ id, title });
  };

  return (
    <div>
      TableAddCategory
      <TableReusableCategory onSubmit={getFields} data={data} />
    </div>
  );
};
export default TableOne;
