import React, { useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoginByToken } from "src/redux/slices/authSlice";

import GuestGuard from "src/auth/GuestGuard";
import AuthGuard from "src/auth/AuthGuard";
// import RouteByRole from "src/auth/RouteByRole";

import MainLayout from "src/layout/Main";
import AuthLayout from "src/layout/Auth";

import { LoginPage, DashboardApp } from "./elements";

export default function Router() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(isLoginByToken());
    }
  }, [dispatch]);

  return useRoutes([
    isAuth
      ? {
          path: "/",
          element: <MainLayout />,
          children: [{ element: <DashboardApp />, index: true }],
        }
      : {
          path: "/",
          element: <AuthLayout />,
          children: [
            { element: <LoginPage />, index: true },
            { path: "register", element: <h4>Register</h4> },
          ],
        },

    // Down Page
    {
      element: <h4>Header Compact</h4>,
      children: [
        { path: "404", element: <h6>Page Not Found 404</h6> },
        { path: "403", element: <h6>Error 403</h6> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);

  // return useRoutes([
  //   // App
  //   {
  //     path: "/",
  //     element: (
  //       <GuestGuard>
  //         <AuthLayout />
  //       </GuestGuard>
  //     ),
  //     children: [
  //       { element: <LoginPage />, index: true },
  //       { path: "register", element: <h4>Register</h4> },
  //     ],
  //   },
  //   // {
  //   //   path: "/",
  //   //   element: <MainLayout />,
  //   //   children: [{ path: "about", element: <h4>About</h4> }],
  //   // },

  //   // Dashboard
  //   {
  //     path: "/app",
  //     element: (
  //       <AuthGuard>
  //         <MainLayout />
  //       </AuthGuard>
  //     ),
  //     children: [{ element: <DashboardApp />, index: true }],
  //   },

  // // Down Page
  // {
  //   element: <h4>Header Compact</h4>,
  //   children: [
  //     { path: "404", element: <h6>Page Not Found 404</h6> },
  //     { path: "403", element: <h6>Error 403</h6> },
  //   ],
  // },
  // { path: "*", element: <Navigate to="/404" replace /> },
  // ]);
}
