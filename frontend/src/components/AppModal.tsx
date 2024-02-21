import { PropsWithChildren, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  modalName: string;
};

export default function AppModal({
  children,
  modalName,
}: PropsWithChildren<Props>) {
  const [searchParams] = useSearchParams();
  const modal = searchParams.get("modal");
  const navigate = useNavigate();

  useEffect(() => {
    const dialog = document.getElementById(modalName) as HTMLDialogElement;
    if (modal === modalName) {
      return dialog.showModal();
    }
    dialog.close();
  }, [modal, modalName]);

  return (
    <dialog id={modalName} className="modal">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              onClick={() => navigate(-1)}
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
