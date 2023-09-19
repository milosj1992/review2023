import { useForm } from "react-hook-form";
import { useFaqAddCategoryMutation } from "../api/faqCategories"
import TableReusableCategory from "./TableReusableCategory";
import ModalDeleteCategory from "./ModalDeleteCategory";

const TableAddCategory = () => {

    const [FaqAddCategory] = useFaqAddCategoryMutation();

   
    const getFields = ({ title, listOrder, language }) => {
        FaqAddCategory({ title, language, listOrder })
    }

    return (
        <div>
            TableAddCategory
            <ModalDeleteCategory/>
            <TableReusableCategory onSubmit={getFields} />
        </div>
    )
}
export default TableAddCategory