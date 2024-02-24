import { useMutation } from "@apollo/client";
import { Dropdown } from "flowbite-react";
import toast from "react-hot-toast";
import { handleError } from "../lib/handleError";
import { GET_SESSION, LOGOUT } from "../lib/query";

export default function Logout() {
  const [logout, { loading }] = useMutation(LOGOUT, {
    refetchQueries: [{ query: GET_SESSION }],
    update: (cache) => {
      cache.writeQuery({ query: GET_SESSION, data: { session: null } });
    },
  });

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: ({ data }) => {
        return data.logout;
      },
      error: (error) => handleError(error),
    });
  };

  return (
    <Dropdown.Item
      onClick={handleLogout}
      disabled={loading}
      className="w-full text-start"
    >
      {loading ? (
        <span className="flex items-center gap-4">
          <span className="loading loading-spinner loading-xs" /> Loading
        </span>
      ) : (
        "Logout"
      )}
    </Dropdown.Item>
  );
}
