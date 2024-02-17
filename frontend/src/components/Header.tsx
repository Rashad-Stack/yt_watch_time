import { Button, Navbar } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import AddVideo from "./AddVideo";
import AppModal from "./AppModal";
import BuyPoint from "./BuyPoint";
import FormTab from "./FormTab";
import Logout from "./Logout";

export default function Header() {
  const { isAuthenticated, user, loading } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar fluid rounded>
          <Navbar.Brand>
            {loading ? (
              <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
            ) : (
              isAuthenticated && (
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder flex items-center gap-2">
                    <div className="w-10 rounded-full bg-neutral text-neutral-content">
                      <span className="text-xs">
                        {user?.email?.slice(0, 2)}
                      </span>
                    </div>
                  </div>
                  <div className="font-bold max-sm:hidden">{user?.email}</div>
                </div>
              )
            )}
          </Navbar.Brand>

          <div className="flex space-x-4 md:order-2">
            {loading ? (
              <div className="skeleton h-10 w-24 !rounded-lg" />
            ) : (
              isAuthenticated && <Logout />
            )}

            {loading ? (
              <div className="skeleton h-10 w-24 !rounded-lg" />
            ) : (
              !isAuthenticated && (
                <Button
                  onClick={() => {
                    const dialog = document.getElementById(
                      "authForm",
                    ) as HTMLDialogElement;
                    dialog.showModal();
                  }}
                >
                  Get Started
                </Button>
              )
            )}

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            {loading ? (
              <div className="skeleton h-4 w-32 !rounded-lg" />
            ) : (
              <Navbar.Link active className="flex items-center gap-2">
                Watch Point:{" "}
                {loading ? (
                  <span className="loading loading-spinner h-3 w-3" />
                ) : (
                  user?.watchPoint
                )}
              </Navbar.Link>
            )}
            {loading ? (
              <div className="skeleton h-4 w-32 !rounded-lg" />
            ) : (
              isAuthenticated && (
                <Navbar.Link
                  className="cursor-pointer"
                  onClick={() => {
                    {
                      const dialog = document.getElementById(
                        "buyPoint",
                      ) as HTMLDialogElement;
                      dialog.showModal();
                    }
                  }}
                >
                  Buy Point
                </Navbar.Link>
              )
            )}
            {loading ? (
              <div className="skeleton h-4 w-32 !rounded-lg" />
            ) : (
              isAuthenticated && (
                <Navbar.Link
                  className="cursor-pointer"
                  onClick={() => {
                    {
                      const dialog = document.getElementById(
                        "addVideo",
                      ) as HTMLDialogElement;
                      dialog.showModal();
                    }
                  }}
                >
                  Add Video
                </Navbar.Link>
              )
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>
      <AppModal modalName="authForm">
        <FormTab />
      </AppModal>
      <AppModal modalName="buyPoint">
        <BuyPoint />
      </AppModal>
      <AppModal modalName="addVideo">
        <AddVideo />
      </AppModal>
    </>
  );
}
