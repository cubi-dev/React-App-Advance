import { toast } from "react-toastify";
import { loginApi } from "../../services/UserService";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REFRESH = "USER_REFRESH";

// Hàm login sử dụng reudux
// Với 2 tham số email & password
export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
       dispatch({ type: FETCH_USER_LOGIN }); //Sự kiện fetch người dùng
       console.log("đã fetch user login");
    let res = await loginApi(email.trim(), password);
    // console.log(">>>Check res: ", res);
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', email.trim());

      dispatch({
        type: FETCH_USER_SUCCESS, //Thành công login
        data: { email: email.trim(), token: res.token }, //Kèm theo data
      });
      console.log("đã fetch user success");
      toast.success("Logged in successfully");
    } else {
      // Error
      if (res && res.status === 400) {
        toast.error(res.data.error);
        // console.log(res.data.error);

        dispatch({
          type: FETCH_USER_ERROR, //Không login thành công
        });

      }
    }
  };
};

export const handleLogoutRedux = () => {
     return (dispatch, getState) =>{
          dispatch({
               type: USER_LOGOUT
          })
     }
}

export const handleRefresh= () => {
     return (dispatch, getState) =>{
          dispatch({
               type: USER_REFRESH
          })
     }
}