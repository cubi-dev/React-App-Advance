import React from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import "../App.scss"

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  return (
     <>
    <div className="container">
      <Alert variant="danger" dismissible className="mt-3">
        <Alert.Heading>OH SHIET! 404 ERROR!</Alert.Heading>
        <p>The route not found</p>
      </Alert>
    </div>
      <div className="back-err">
        <i className="fa-solid fa-angles-left"></i>
        <span onClick={() => handleGoBack()}>&nbsp;Go Back</span>
      </div>
     </>
  );
};

export default NotFound;
