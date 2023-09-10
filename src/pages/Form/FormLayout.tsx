import Breadcrumb from '../../components/Breadcrumb';
// import { useFaqCategoryQuery } from '../../api/faqCategories';
import React from 'react';
const FormLayout = () => {

  // const nesto=useFaqCategoryQuery({lang:"ch",page:1,rowsPerPage:20})
  // React.useEffect(()=>{
  //   console.log(nesto);    
  // },[])
  return (
    <>

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-1.5 block font-medium text-black dark:text-white">
                    Id
                  </label>
                  <input
                    type="text"
                    value="15"
                    placeholder="Disabled label"
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-1.5 block font-medium text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    value="Shippment"
                    placeholder="Disabled label"
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-1.5 block font-medium text-black dark:text-white">
                    Language
                  </label>
                  <input
                    type="text"
                    value="UK"
                    placeholder="Disabled label"
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-1.5 block font-medium text-black dark:text-white">
                    List Order
                  </label>
                  <input
                    type="number"
                    value="0"
                    placeholder="Disabled label"
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                  rows={6}
                  
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
