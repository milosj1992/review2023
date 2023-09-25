import { useForm } from "react-hook-form";
import { useFaqAddCategoryMutation } from "../api/faqCategories"
import TableReusableCategory from "./TableReusableCategory";
import ModalDeleteCategory from "./ModalDeleteCategory";
import useCateogory from "../hooks/useCateogory";
const TableAddCategory = () => {

    const { addCategory } = useCateogory();

    const getFields = ({ title, listOrder, language }) => {
        addCategory({ title, language, listOrder })

    }

    return (
        <div>
            TableAddCategory
            <ModalDeleteCategory />
            <TableReusableCategory onSubmit={getFields} />
        </div>
    )
}
export default TableAddCategory