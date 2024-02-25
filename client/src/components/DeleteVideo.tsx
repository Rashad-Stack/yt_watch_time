import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { handleError } from "../lib/handleError";
import { DELETE_VIDEO, GET_VIDEOS, MY_VIDEOS } from "../lib/query";

type Props = {
  videoId: string;
};

export default function DeleteVideo({ videoId }: Props) {
  const [deleteVideo, { loading }] = useMutation(DELETE_VIDEO);

  const handleDelete = () => {
    toast.promise(
      deleteVideo({
        variables: {
          videoId,
        },
        refetchQueries: [{ query: MY_VIDEOS }, { query: GET_VIDEOS }],
      }),
      {
        loading: "Deleting...",
        success: "Deleted",
        error: (error) => handleError(error),
      },
    );
  };
  return (
    <button
      className="absolute right-4 top-4 flex items-center gap-4 rounded-md bg-black/25 px-3 py-2 backdrop-blur-sm"
      onClick={handleDelete}
      disabled={loading}
    >
      <img src="/bin.svg" alt="delete" className="h-4 w-4 object-contain" />
    </button>
  );
}
