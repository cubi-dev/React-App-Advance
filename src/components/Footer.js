import React from "react";
import logoApp from "../assets/images/logo192.png";
const Footer = () => {
  return (
    <>
      <div className="pt-5 mt-5 border-top">
        <div className="container">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
            <div className="col mb-3">
              <a
                href="/"
                className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
              >
                <img
                  src={logoApp}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Practice-React Logo"
                />
              </a>
              <p className="text-body-secondary">© 2023</p>
              <h5>
                <b>Practice React</b> by <b>Cubi</b>
              </h5>
            </div>

            <div className="col mb-3"></div>

            <div className="col mb-3 font-monospace"></div>
            <div className="col mb-3">
              <h5>Using</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    Axios
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    UseContext
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    Redux
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    Bootstrap
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    ...........                   
                  </a>
                </li>
              </ul>
            </div>
            <div className="col mb-3">
              <h5>About</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="https://github.com/cubi-dev" className="nav-link p-0 text-muted">
                   Cubi
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-muted">
                    Note
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
