import axios from "axios";

const baseUrl = 'http://localhost:8000';
axios.interceptors.response.use(
    function (response) {
      console.log(response)
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if(response.data.statusCode===400){
        
        return Promise.reject("Status code 400")
      }
      else if(response.data.statusCode===500){
        return Promise.reject("Status code 500")
      }
      return response;
    },
    function (error) {
      // console.log(error)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
export { baseUrl };
