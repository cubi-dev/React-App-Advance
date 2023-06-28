import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";
// import { useContext } from "react";
// import { UserContext } from "./../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  // const { logout, user } = useContext(UserContext);
  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/login") {
      setHideHeader(true);
    }
  }, []);

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    navigate("/");
    toast.success("Logout Success");
    // logout();
    // navigate("/");
    // toast.success("Logout Success");
  };
  // useEffect(() => {
  //   if (user && user.auth === false) {
  //     navigate("/");
  //     toast.success("Logout Success");
  //   }
  // }, [user]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Practice-React Logo"
            />
            <span>Practice-React</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!hideHeader && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Manage Users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link">Welcome {user.email} </span>
                  )}
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    {user && user.auth == true ? (
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        {" "}
                        {/*Nếu có login rồi */}
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        {" "}
                        {/*Nếu chưa có login*/}
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
