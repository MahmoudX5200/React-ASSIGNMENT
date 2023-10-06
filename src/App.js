import logo from "./logo.svg";
import "./App.css";
import {
  RouterProvider,
  createHashRouter,
  Navigate,
  useLocation,
} from "react-router-dom";

import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";
import { Suspense, lazy, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRouter from "./ProtectedRouter";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import CheckOut from "./Component/CheckOut/CheckOut";
import Category from "./Component/Category/Category";
import { Provider } from "react-redux";
import { store } from "./Stores/store";
import { Offline } from "react-detect-offline";
import WishList from "./Component/WishList/WishList";
import Brands from "./Component/brands/Brands";

function App() {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let token = localStorage.getItem("userToken");

      let data = jwtDecode(token);
      console.log(data);
      saveUserData(data);
    }
  }, []);
  function saveUserData(data) {
    setUserData(data);
  }

  function ProtectedRouter2(props) {
    if (localStorage.getItem("userToken") != null) {
      return <Navigate to="home" />;
    } else {
      return props.children;
    }
  }

  function Logout() {
    saveUserData(null);
    localStorage.removeItem("userToken");
    return <Navigate to="/login" />;
  }

  let Profile = lazy(() => import("./Component/Profile/Profile"));
  let Product = lazy(() => import("./Component/Product/Product"));
  let Routes = createHashRouter([
    {
      path: "",
      element: <Layout Logout={Logout} userData={userData} />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRouter>
              <Home userData={userData} />
            </ProtectedRouter>
          ),
        },
        {
          path: "category",
          element: (
            <ProtectedRouter>
              <Category />
            </ProtectedRouter>
          ),
        },
        {
          path: "WishList",
          element: (
            <ProtectedRouter>
              <WishList />
            </ProtectedRouter>
          ),
        },

        {
          path: "cart",
          element: (
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          ),
        },
        {
          path: "CheckOut/:id",
          element: (
            <ProtectedRouter>
              <CheckOut />
            </ProtectedRouter>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRouter>
              <Suspense
                fallback={
                  <div className="loading position-fixed top-0 end-0 bottom-0 start-0 bg-white">
                    <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
                  </div>
                }
              >
                <Product />
              </Suspense>
            </ProtectedRouter>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouter>
              <Suspense
                fallback={
                  <div className="loading position-fixed top-0 end-0 bottom-0 start-0 bg-white">
                    <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
                  </div>
                }
              >
                <Brands />
              </Suspense>
            </ProtectedRouter>
          ),
        },

        {
          path: "profile",
          element: (
            <Suspense
              fallback={
                <div className="loading position-fixed top-0 end-0 bottom-0 start-0 bg-white">
                  <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
                </div>
              }
            >
              {" "}
              <Profile />{" "}
            </Suspense>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRouter>
              <ProductDetails />
            </ProtectedRouter>
          ),
        },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        {
          index: true,
          element: (
            <ProtectedRouter2>
              <Register />{" "}
            </ProtectedRouter2>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <Offline>
          <div className="network position-fixed bottom-0 end-0 p-5 bg-info">
            You're offline right now. Check your connection.
          </div>
        </Offline>

        <CartContextProvider>
          <RouterProvider router={Routes} />
        </CartContextProvider>
      </Provider>
    </>
  );
}

export default App;
