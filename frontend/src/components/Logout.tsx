import { useMutation } from "@apollo/client";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { LOGOUT } from "../lib/query";

export default function Logout() {
  const [logout, { loading }] = useMutation(LOGOUT);
  const { clearUser } = useAuth();

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: ({ data }) => {
        clearUser();
        return data.logout;
      },
      error: (error) => error.message,
    });
  };

  return (
    <Button onClick={handleLogout} disabled={loading}>
      {loading ? (
        <span className="flex items-center gap-4">
          <span className="loading loading-spinner loading-xs" /> Loading
        </span>
      ) : (
        "Logout"
      )}
    </Button>
  );
}
