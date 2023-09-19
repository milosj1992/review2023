import { useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useFaqCategoryIdQuery, useFaqUpdateCategoryMutation } from "../api/faqCategories";
import TableReusableCategory from "./TableReusableCategory";
import { useState } from "react";
const TableOne = () => {
    const [serchParams] = useSearchParams();
    const id = serchParams.get("id");
    const [faqUpdateCategory] = useFaqUpdateCategoryMutation()
    
    const { data } = useFaqCategoryIdQuery(id);

    const getFields = ({ title }) => {

        faqUpdateCategory({ id, title });
    }

    return (

        <div>
            TableAddCategory
            <TableReusableCategory onSubmit={getFields} data={data} />
        </div>
    )
}
export default TableOne