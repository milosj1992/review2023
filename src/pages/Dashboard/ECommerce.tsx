import { useAppDispatch, useAppSelector } from "../../app/store";
import { userLogin } from "../../features/auth/authActions";
import { useEffect } from "react";

const ECommerce = () => {
  interface UserData {
    username: string;
    password: string;
}
// const auth = useAppSelector((state) => state.auth)
// const { userInfo } =  useAppSelector((state) => state.auth)
// const auth =  useAppSelector((state) => state.auth)
  
 
// // const dispatch = useAppDispatch(); 
// // const data: UserData = { username: "kminchelle", password: "0lelplR" }
// useEffect(() => {
  
//      console.log(auth)
//      console.log(userInfo);  
// }, []); 
  return ( 
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
        </div>
      </div>
    </> 
  );
};

export default ECommerce;
