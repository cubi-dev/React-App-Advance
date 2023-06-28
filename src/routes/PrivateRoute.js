import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import TableUsers from "../components/TableUsers";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {

  // const { user } = useContext(UserContext);
  const user = useSelector(state => state.user.account);
  
  if (user && !user.auth) {
    //Check khi chưa đăng nhập
    return (
      <>
        <Alert variant="danger" dismissible className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
          YOU MUST LOGIN TO ACCESS THIS ROUTE
          </p>
        </Alert>
      </>
    );
  }
  return (
    <>
      {/* <Routes>
        <Route path={props.path} element={props.children} />
      </Routes> */}
      {props.children}
      {/* Nó sẽ trả về dưới element (tức là component) */}
    </>
  );
};

export default PrivateRoute;
