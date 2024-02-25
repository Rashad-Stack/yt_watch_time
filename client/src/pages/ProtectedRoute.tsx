import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GET_SESSION } from "../lib/query";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { data, loading } = useQuery(GET_SESSION);
  const user = data?.session;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user && user.role === "admin") {
        return navigate("/dashboard");
      } else if (!user) {
        return navigate("/");
      }
    }
  }, [user, navigate, loading]);

  return loading ? (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-8 border-dashed border-blue-600" />
    </div>
  ) : (
    children
  );
}
