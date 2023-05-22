import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import Login from "src/pages/LoginPage";

export default function AuthGuard({ children }) {
  const { isAuth, user } = useSelector((state) => state.auth);
  const currentRole = user?.role;
  const { pathname } = useLocation();
  const [redirect, setRedirect] = useState(false);

  if (!isAuth) {
    if (pathname !== redirect) {
      setRedirect(pathname);
    }
    // return <Login />;
    return <Navigate to="/" replace />;
  }

  if (redirect && pathname !== redirect) {
    setRedirect(null);
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
}
