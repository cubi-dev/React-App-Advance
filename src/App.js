import { Container, Row } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
// import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { handleRefresh } from "./redux/actions/userAction";

function App() {
  // const dataUserRedux = useSelector(state => state.user.account)
  // const { user, loginContext } = useContext(UserContext);
  // console.log(">>> Check redux: ", dataUserRedux);


  // console.log(">>> user: ", user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // loginContext(
      //   localStorage.getItem("email"),
      //   localStorage.getItem("token")
      // );
      dispatch(handleRefresh());
    }
  }, []);

  return (
    <>
      <div>
        <Header />
        <Container>
          <AppRoutes />
        </Container>
        <Footer/>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </div>
    </>
  );
}

export default App;
