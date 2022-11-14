import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";

export default function PrivateRoute() {
  let { curentUser } = useAuth();
  console.log(curentUser);
  return (
      curentUser ? <Outlet /> : <Navigate to="/login" />
  )
}
