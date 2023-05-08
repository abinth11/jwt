import React from "react";
import ReactDOM from "react-dom/client";
import LoginFrom from "./components/Login.js";
import Navbar from "./components/Header.js";
import Home from "./components/Home.js";
import SignUpForm from "./components/SignUp.js";
import GetUserData from "./components/GetUserData.js";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import { refreshTokens } from "./helprs.js";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

axios.interceptors.request.use(async(config)=>{
  const accessToken = localStorage.getItem('token')
  const currDate = new Date()
  const decodedToken = jwt_decode(accessToken)
  if(decodedToken?.exp*1000<currDate.getTime()){
    const result = await refreshTokens(accessToken)
    config.headers['authorization'] = result.accessToken
  }
  return config
},(error)=>{
  return Promise.reject(error)
})
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
