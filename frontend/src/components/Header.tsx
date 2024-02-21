import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { MenuItems } from "../constants";
import AddVideo from "./AddVideo";
import AppModal from "./AppModal";
import BuyPoint from "./BuyPoint";
import FormTab from "./FormTab";
import Profile from "./Profile";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar fluid rounded>
          <Navbar.Brand href="https://flowbite-react.com">
            <img
              src="https://www.flowbite-react.com/favicon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
          </Navbar.Brand>

          <div className="flex space-x-4 md:order-2">
            <Profile />

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            {MenuItems.map((item) => (
              <NavLink
                key={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "uppercase text-cyan-700"
                    : "cursor-pointer uppercase"
                }
                to={item.url}
              >
                {item.name}
              </NavLink>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </header>
      <AppModal modalName="auth">
        <FormTab />
      </AppModal>
      <AppModal modalName="buy-points">
        <BuyPoint />
      </AppModal>
      <AppModal modalName="add-video">
        <AddVideo />
      </AppModal>
    </>
  );
}
