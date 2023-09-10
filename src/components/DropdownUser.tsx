import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetUserDetailsQuery } from '../api/auth'
import { setCredentials } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from "../app/store";
// import { useGetFaqListCategoriesQuery } from '../api/faqCategories';


// import UserOne from '../images/user/user-01.png';

const DropdownUser = () => {
  const { userInfo } = useAppSelector((state) => state.auth)
  const faq = useAppSelector(state => state.FaqCategories);



  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })


  useEffect(() => {
    // const {data1}=useFaqListCategories; 
    // getFaqListCategoriesAll()
    // console.log(useFaqListCategories);
    if (data) { console.log(userInfo); dispatch(setCredentials(data)) }
  }, [data, dispatch])

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {isFetching
              ? null
              : userInfo !== null
                ? `Logged in as ${userInfo?.email}`
                : "You're not logged in"}
          </span>
          <span className="block text-xs">UX Designer</span>
        </span>

      </Link>


    </div>
  );
};

export default DropdownUser;
