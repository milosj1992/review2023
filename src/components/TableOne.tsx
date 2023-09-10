import { useSearchParams } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { useFaqCategoryIdQuery, useFaqUpdateCategoryMutation } from "../api/faqCategories";
import { useEffect, useState } from "react";
const TableOne = () => {
    const [serchParams] = useSearchParams();
    const id = serchParams.get("id");

    const [faqUpdateCategory] = useFaqUpdateCategoryMutation()
    const test = useFaqUpdateCategoryMutation()
    const [queryId, setQueryID] = useState(null);
    const { data } = useFaqCategoryIdQuery(id);
    useEffect(() => {

        setQueryID(data?.results.id)
    }, [data]);
    const doSome = () => {
        faqUpdateCategory({ id, body: getValues("title") });
    }

    useEffect(() => {
        if (data) {
            setValue("id", data?.results?.id)
            setValue("title", data?.results?.ime)
            setValue("language", data?.results?.jezik)
            setValue("list-order", data?.results?.listorder)
        }
    }, [data]);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(doSome)} style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '5px' }}>
            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <div className="p-6.5">

                            <div className="mb-4.5">
                                <label className="mb-1.5 block font-medium text-black dark:text-white">
                                    Id
                                </label>
                                <input
                                    type="number" {...register("id")}
                                    disabled
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-1.5 block font-medium text-black dark:text-white">
                                    Language
                                </label>
                                <input
                                    type="text" {...register("language")}
                                    disabled
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-1.5 block font-medium text-black dark:text-white">
                                    List Order
                                </label>
                                <input
                                    type="number" {...register("list-order")}
                                    disabled
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Title <span className="text-meta-1">*</span>
                                </label>
                                <textarea
                                    {...register("title", { required: true })}
                                    rows={6}
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                                />
                                {errors.title && <p>Title is required.</p>}
                            </div>

                            <input type="submit" />
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}
export default TableOne