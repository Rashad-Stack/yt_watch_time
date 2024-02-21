import { useQuery } from "@apollo/client";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthMenuItems } from "../constants";
import { GET_SESSION } from "../lib/query";
import Logout from "./Logout";

export default function Profile() {
  const { data, loading } = useQuery(GET_SESSION);
  const user = data?.session;

  return (
    <div>
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="skeleton h-10 w-10 !rounded-full" />
          <div className="skeleton h-5 w-48 !rounded-lg" />
        </div>
      ) : user ? (
        <Dropdown
          label="Dropdown button"
          renderTrigger={() => {
            return (
              <div className="flex cursor-pointer items-center gap-2">
                <div className="avatar placeholder flex items-center gap-2">
                  <div className="w-10 rounded-full bg-neutral text-neutral-content">
                    <span className="text-xs">{user?.email?.slice(0, 2)}</span>
                  </div>
                </div>
                <div className="font-bold max-sm:hidden">{user?.email}</div>
              </div>
            );
          }}
        >
          <Dropdown.Item className="font-bold">
            Watch Points:{" "}
            {loading ? (
              <span className="loading loading-spinner h-3 w-3" />
            ) : (
              user?.watchPoint
            )}
          </Dropdown.Item>
          {AuthMenuItems.map((item) => (
            <Dropdown.Item key={item.name}>
              <Link to={item.url}>{item.name}</Link>
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Dropdown.Item>
            <Logout />
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Link
          to="/?modal=auth"
          className="rounded-md bg-cyan-700 px-4 py-2 text-white"
        >
          Get Started
        </Link>
      )}
    </div>
  );
}
