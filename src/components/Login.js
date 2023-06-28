import React, { useEffect, useState, useContext } from "react";
// import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "./../context/UserContext";
import { Link } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate(); 
  /**
   * 
  // USECONTEXT____________________________________________
  // const { loginContext } = useContext(UserContext);
   * 
   */
  // ______________________REDUX________________________________
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  // const [loadingAPI, setLoadingAPI] = useState(false);
  const isLoading = useSelector(state => state.user.isLoading);
  const [isMounted, setIsMounted] = useState(true); // Flag to track component's mount status
  const account = useSelector(state => state.user.account);



  useEffect(() => {
    if(account && account.auth === true) {
      navigate("/");
    }
  }, [account])

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required!");
      return;
    }
    dispatch(handleLoginRedux(email, password));
  /**
   * USECONTEXT
  // let res = await loginApi(email.trim(), password);
  // // console.log(">>>Check res: ", res);
  // if (res && res.token) {
  // loginContext(email, res.token);
  // navigate('/');
  // toast.success('Logged in successfully');
  // } else {
  //   // Error
  //   if (res && res.status === 400) {
  //     toast.error(res.data.error);
  //     // console.log(res.data.error);
  //   }
  // }
   */
  };
  const handleGoBack = () => {
    navigate("/");
  };

  const handlePressedEnter = (event) => {
    if (event && event.key === "Enter") {
        handleLogin();
    }
    // console.log(">>>event: ", event);
  }

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Log in</div>
      <div className="text">Email or Username <br/> 
      (eve.holt@reqres.in, cityslicka) </div>
      <input
        type="text"
        placeholder="Email or Username..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="input-password">
        <input
          type={isShowPassword == true ? "text" : "password"}
          placeholder="Password..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => handlePressedEnter(event)}
        />
        <i
          className={
            isShowPassword == true
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {/* Chi khi nào loading API thì mới hiện icon */}
        {isLoading && <i className="fas fa-circle-notch fa-spin"></i>} 
        
        &nbsp;Login
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i>
        <span onClick={() => handleGoBack()}>
        &nbsp;Go Back
          </span>
      </div>
    </div>
  );
};

export default Login;
