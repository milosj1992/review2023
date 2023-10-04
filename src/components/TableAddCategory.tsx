import TableReusableCategory from './TableReusableCategory';
import ModalDeleteCategory from './ModalDeleteCategory';
import useCateogory from '../services/hooks/useCateogory';
import { TableCateogry } from '../services/models/Category';
const TableAddCategory = () => {
  const { addCategory } = useCateogory();

  const getFields = ({ title, listOrder, language }: TableCateogry) => {
    const numericListOrder = parseInt(listOrder as string, 10);
    addCategory({ title, language, listOrder: numericListOrder });
  };

  return (
    <div>
      <ModalDeleteCategory />
      <TableReusableCategory onSubmit={getFields} />
    </div>
  );
};
export default TableAddCategory;
