import React from "react";
import ReactDOM from "react-dom/client";
import LoginFrom from "./components/Login.js";
import Navbar from "./components/Header.js";
import Home from "./components/Home.js";
import SignUpForm from "./components/SignUp.js";
import GetUserData from "./components/getData.js";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginFrom />,
      },
      {
        path:'/signup',
        element:<SignUpForm/>
      },
      {
        path:"/get-user-data",
        element:<GetUserData/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
