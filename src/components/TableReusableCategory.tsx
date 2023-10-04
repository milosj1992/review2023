import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
interface DataResults {
  results: {
    id: number;
    ime: string;
    jezik: string;
    listorder: number;
    // Add other properties as needed
  } | null; // Make sure to include null in the type if data can be null
}
interface TableRCategory {
  onSubmit: (values: {
    title: string;
    listOrder: string;
    language: string;
    id?: string;
  }) => void;
  data?: DataResults;
}
const TableReusableCategory = ({ onSubmit, data }: TableRCategory) => {
  const { id } = useParams();
  const path = useLocation();
  const fieldForEditCategory = path.pathname === '/faq-id';

  useEffect(() => {
    if (data) {
      setValue('id', data?.results?.id);
      setValue('title', data?.results?.ime);
      setValue('language', data?.results?.jezik);
      setValue('list-order', data?.results?.listorder);
    }
  }, [data]);

  const {
    register,
    setValue,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const getFields = () => {
    const title = getValues('title');
    const listOrder = getValues('list-order');
    const language = getValues('language');

    onSubmit({ title, listOrder, language, id });
  };

  return (
    <form
      onSubmit={handleSubmit(getFields)}
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              {fieldForEditCategory ? (
                <div className="mb-4.5">
                  <label className="mb-1.5 block font-medium text-black dark:text-white">
                    Id
                  </label>
                  <input
                    type="number"
                    {...register('id')}
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>
              ) : null}
              <div className="mb-4.5">
                <label className="mb-1.5 block font-medium text-black dark:text-white">
                  Language
                </label>
                <input
                  type="text"
                  {...register('language')}
                  disabled={fieldForEditCategory}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-1.5 block font-medium text-black dark:text-white">
                  List Order
                </label>
                <input
                  type="number"
                  {...register('list-order')}
                  disabled={fieldForEditCategory}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title <span className="text-meta-1">*</span>
                </label>
                <textarea
                  {...register('title', { required: true })}
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
  );
};
export default TableReusableCategory;
