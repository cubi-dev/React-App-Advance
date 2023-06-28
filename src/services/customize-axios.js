import axios from "axios";

const instance = axios.create({
     baseURL:'https://reqres.in', 
     // timeout:'',//milisecond
     // headers: {'X-Custom-Header': 'foobar'}
});

// Add a responsive interceptor 
instance.interceptors.response.use(function (response) {
     console.log(">>>check res axios: ", response);
     return response.data ? response.data : {statusCode : response.status };
}, function (error) {
     // console.log(">>>Check error name: ", error.name);
     // console.log(">>>Check error message: ", error.message);
     // console.log(">>>Check error : ", error.response);
     let res = {}; 

     if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          res.data = error.response.data; 
          res.status = error.response.status
          res.headers = error.response.headers;
        } else if (error.request) { 
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser 
          // and an instance of http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        return res;
     // return Promise.reject(error);
})

export default instance;