import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebaseConfig";

export default function PrivateRoute() {

  const location = useLocation();

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return "";
  }

  return (
    user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
  )
}
