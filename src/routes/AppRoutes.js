import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import TableUsers from "../components/TableUsers";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
        path="/users"
        element={
          <PrivateRoute>
               <TableUsers/>
          </PrivateRoute>
        }
        />
      </Routes>
        {/* <PrivateRoute path="/users" >
          <TableUsers/>
        </PrivateRoute> */}
    </>
  );
};

export default AppRoutes;
