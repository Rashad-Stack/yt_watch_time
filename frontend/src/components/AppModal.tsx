import { PropsWithChildren } from "react";

type Props = {
  modalName: string;
};

export default function AppModal({
  children,
  modalName,
}: PropsWithChildren<Props>) {
  return (
    <dialog id={modalName} className="modal">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
