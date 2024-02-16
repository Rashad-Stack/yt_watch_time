import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, loading } = useAuth();

  console.log(isAuthenticated);

  return loading ? (
    <div>Loading</div>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
