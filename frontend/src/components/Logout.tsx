import { useMutation } from "@apollo/client";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { handleError } from "../lib/handleError";
import { LOGOUT } from "../lib/query";

export default function Logout() {
  const { clearUser } = useAuth();
  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => clearUser(),
  });

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: ({ data }) => {
        return data.logout;
      },
      error: (error) => handleError(error, clearUser),
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
